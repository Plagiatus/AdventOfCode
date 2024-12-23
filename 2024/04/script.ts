import { lineByLineCallback, loadFile } from "../utils";

function parseInput(_input: string): string[][] {
    let result: string[][] = [];
    lineByLineCallback(_input, (line) => {
        result.push(line.split(""));
    });
    return result;
}

function part1(_input: string) {
    let data = parseInput(_input);

    let total = 0;
    for (let x: number = 0; x < data.length; x++) {
        for (let y: number = 0; y < data.length; y++) {
            total += Number(createInputInDirection(data, x, y, 1, 0));
            total += Number(createInputInDirection(data, x, y, 0, 1));
            total += Number(createInputInDirection(data, x, y, 1, 1));
            total += Number(createInputInDirection(data, x, y, 1, -1));
        }
    }

    console.log(total);
}

function createInputInDirection(data: string[][], xStart: number, yStart: number, xDir: number, yDir: number, steps: number = 4): boolean {
    let input: string[] = [];

    for (let i: number = 0; i < steps; i++) {
        input.push(data[xStart + i * xDir]?.[yStart + i * yDir])
    }

    return isInputXMAS(...input);
}

function isInputXMAS(..._input: string[]): boolean {
    let search = "XMAS";
    let searchReverse = "SAMX";
    let input = _input.join("");
    if (input === search || input === searchReverse) {
        return true;
    }
    return false;
}


function part2(_input: string) {
    let data = parseInput(_input);

    let total = 0;
    for (let x: number = 0; x < data.length; x++) {
        for (let y: number = 0; y < data.length; y++) {
            total += Number(checkXMasExistance(data, x, y));
        }
    }

    console.log(total);
}

function checkXMasExistance(data: string[][], x: number, y: number): boolean {
    if(data[x]?.[y] !== "A") return false;
    if(
        isInputMAS(data[x-1]?.[y-1], data[x]?.[y], data[x+1]?.[y+1]) && 
        isInputMAS(data[x-1]?.[y+1], data[x]?.[y], data[x+1]?.[y-1]))
        return true;
    return false;
}

function isInputMAS(..._input: string[]): boolean {
    let search = "MAS";
    let searchReverse = "SAM";
    let input = _input.join("");
    if (input === search || input === searchReverse) {
        return true;
    }
    return false;
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
part2(loadFile(__dirname, "input.txt"));