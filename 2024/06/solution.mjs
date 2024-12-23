import * as fs from "fs";
import path from "path";

export function loadFile(..._paths) {
    return fs.readFileSync(path.join(..._paths), { encoding: "utf-8" }).split("\r\n");
}

let gridSize = 0;
let guard;
const obstacles = new Map();
const pathRecord = [];

for (const line of loadFile(`${import.meta.dirname}/input.txt`)) {
  const l = line.toString();

  for (let j = 0; j < l.length; j++) {
    const vec = { x: j, y: gridSize };

    if (l[j] === '^') {
      guard = { ...vec, dir: '^' };
    }

    if (l[j] === '#') {
      if (obstacles.has(vec.x)) obstacles.get(vec.x).push(vec.y);
      else obstacles.set(vec.x, [vec.y]);
    }
  }

  gridSize++;
}

function isOutOfBounds(vec) {
  return vec.x < 0 || vec.x >= gridSize || vec.y < 0 || vec.y >= gridSize;
}

function containsObstacle(vec) {
  return obstacles.has(vec.x) && obstacles.get(vec.x).includes(vec.y);
}

function getNext() {
  if (guard.dir === '^') return { x: guard.x, y: guard.y - 1 };
  if (guard.dir === '>') return { x: guard.x + 1, y: guard.y };
  if (guard.dir === 'v') return { x: guard.x, y: guard.y + 1 };
  if (guard.dir === '<') return { x: guard.x - 1, y: guard.y };
}

function turn() {
  turns++;
  if (guard.dir === '^') guard.dir = '>';
  else if (guard.dir === '>') guard.dir = 'v';
  else if (guard.dir === 'v') guard.dir = '<';
  else if (guard.dir === '<') guard.dir = '^';
}

function recordPath() {
  if (pathRecord.some((p) => p.x === guard.x && p.y === guard.y)) return;
  pathRecord.push({ x: guard.x, y: guard.y });
}

let turns = 0;
function move() {
  recordPath();

  const next = getNext();

  if (isOutOfBounds(next)) {
    return;
  }

  if (containsObstacle(next)) {
    turn();
  } else {
    guard.x = next.x;
    guard.y = next.y;
  }

  move();
}

move();
visualizeGrid();

console.log('Distinct positions:', pathRecord.length, "after turns", turns);

function visualizeGrid(){
  let output = "";
  console.log("length", pathRecord.length);
  for(let y = 0; y < gridSize; y++){
    for(let x = 0; x < gridSize; x++){
      if(containsObstacle({x, y})) output += "#";
      else if(pathRecord.some((p) => p.x === x && p.y === y)) output += "X";
      else output += ".";
    }
    output += "\n";
  }
  console.log(output);
}