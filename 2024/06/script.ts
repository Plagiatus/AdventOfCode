import { getNumbersOfLineSeperatedBy, lineByLineCallback, loadFile } from "../utils";

interface Position {
    obstructed: boolean;
    visited?: boolean;
    directions?: string[];
}

interface Vector2 {
    x: number, y: number;
}

function parseInput(_input: string): [Position[][], Vector2] {
    let result: Position[][] = [];
    let startPos: Vector2;
    lineByLineCallback(_input, (line, lineIndex) => {
        let row: Position[] = [];
        let split = line.split("");
        for (let i = 0; i < split.length; i++) {
            let spot = split[i];
            if (spot === ".") {
                row.push({ obstructed: false });
            } else if (spot === "#") {
                row.push({ obstructed: true });
            } else if (spot === "^") {
                row.push({ obstructed: false });
                startPos = { y: lineIndex, x: i }
            }
        }
        result.push(row);
    });
    return [result, startPos!];
}

function part1(_input: string) {
    let [grid, pos] = parseInput(_input);
    let {uniqueVisited} = move(grid, pos);
    // visualizeGrid(grid, pos, dir);
    console.log({ uniqueVisited });
}

function move(grid: Position[][], pos: Vector2) {
    let dir: Vector2 = { x: 0, y: -1 };
    let uniqueVisited: number = 1;
    grid[pos.y][pos.x].visited = true;
    let maxTurns = 8000;
    let turns = 0;
    let createsLoop: boolean = false;
    while (turns < maxTurns) {
        let nextPos: Vector2 = { x: pos.x + dir.x, y: pos.y + dir.y };
        if (isOutsideOfArea(grid, nextPos)) break; //left area
        if (grid[nextPos.y][nextPos.x].obstructed) {
            //rotate
            let tmp = dir.y;
            dir.y = dir.x;
            dir.x = -tmp;
            turns++;
        } else {
            // move
            pos = nextPos;
            if (!grid[pos.y][pos.x].visited) uniqueVisited++;
            grid[pos.y][pos.x].visited = true;
            if (!grid[pos.y][pos.x].directions) grid[pos.y][pos.x].directions = [];
            if (grid[pos.y][pos.x].directions?.find(d => `${dir.x}${dir.y}` === d)) {
                //looping path
                createsLoop = true;
                break;
            }
            grid[pos.y][pos.x].directions?.push(`${dir.x}${dir.y}`);
        }
    }
    return { uniqueVisited, createsLoop }
}

function part2(_input: string) {
    let [grid, pos] = parseInput(_input);
    let createLoops = 0;

    for (let y: number = 0; y < grid.length; y++) {
        for (let x: number = 0; x < grid.length; x++) {
            let clonedGrid = structuredClone(grid);
            if(clonedGrid[y][x].obstructed) continue;
            clonedGrid[y][x].obstructed = true;
            let {uniqueVisited, createsLoop} = move(clonedGrid, structuredClone(pos));
            if(createsLoop) createLoops++;
        }
    }
    // visualizeGrid(grid, pos, dir);
    console.log({ createLoops });
}

function isOutsideOfArea(grid: any[][], pos: Vector2): boolean {
    // console.log(pos);
    if (pos.x < 0 || pos.y < 0 || pos.y >= grid.length || pos.x >= grid[pos.y].length) return true;
    return false;
}

function visualizeGrid(grid: Position[][], pos: Vector2, dir: Vector2) {
    console.log(grid.reduce((prev, curr, y) => {
        return prev + curr.reduce((prev, curr, x) => {
            let char = (curr.obstructed ? "#" : (curr.visited ? "X" : "."));
            if (pos.x == x && pos.y == y) {
                if (dir.x == 1) char = ">";
                else if (dir.x == -1) char = "<";
                else if (dir.y == 1) char = "v";
                else if (dir.y == -1) char = "^";
                char = "\x1b[41m" + char + "\x1b[0m";
            }
            return prev + char;
        }, "") + "\n";
    }, ""))
}

// part1(loadFile(__dirname, "test.txt"));
// console.time("part1")
// part1(loadFile(__dirname, "input.txt"));
// console.timeEnd("part1")
part2(loadFile(__dirname, "test.txt"));
console.time("part2")
part2(loadFile(__dirname, "input.txt"));
console.timeEnd("part2")