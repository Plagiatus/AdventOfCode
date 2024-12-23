import { doSomethingInAllDirections, getNumbersOfLineSeperatedBy, lineByLineCallback, loadFile, Vector2 } from "../utils";

function parseInput(_input: string): number[][] {
    let result: number[][] = [];
    lineByLineCallback(_input, (line) => {
        result.push(getNumbersOfLineSeperatedBy(line, ""));
    });
    return result;
}

function walk(map: number[][], pos: Vector2): [Vector2[], number] {
    let current = map[pos.y][pos.x];
    // console.log({pos, current})
    if(current === 9)  {
        return [[pos], 1];
    }

    let all: Vector2[] = [];
    let totalPaths = 0;
    doSomethingInAllDirections(map, pos, (element, pos) => {
        if(element === current + 1){
            let [unique, total] = walk(map, pos);
            insertPositionUnique(all, ...unique);
            totalPaths += total;
        }
    })

    return [all, totalPaths];
}


function insertPositionUnique(array: Vector2[], ...positions: Vector2[]) {
    for(let position of positions) {
        if (array.some(v => v.x === position.x && v.y === position.y)) continue;
        array.push(position);
    }
}

function part1(_input: string) {
    let map = parseInput(_input);
    let total = 0;
    let totalHeads = 0;
    for (let y: number = 0; y < map.length; y++) {
        for (let x: number = 0; x < map[y].length; x++) {
            if(map[y][x] === 0) {
                let [heads] = walk(map, {x, y});
                total += heads.length;
                totalHeads++;
                // console.log(heads, {y, x});
            }
        }
    }
    console.log({totalHeads, total});
}

function part2(_input: string) {
    let map = parseInput(_input);
    let total = 0;
    let totalHeads = 0;
    for (let y: number = 0; y < map.length; y++) {
        for (let x: number = 0; x < map[y].length; x++) {
            if(map[y][x] === 0) {
                let [heads, totalHead] = walk(map, {x, y});
                total += totalHead;
                totalHeads++;
                // console.log(heads, {y, x});
            }
        }
    }
    console.log({totalHeads, total});
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
part2(loadFile(__dirname, "input.txt"));