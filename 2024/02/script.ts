import { lineByLineCallback, loadFile } from "../utils";

const inputText = loadFile(__dirname, "input.txt");
const testText = loadFile(__dirname, "test.txt");

function parseInput(_input: string): number[][] {
    let result: number[][] = [];
    lineByLineCallback(_input, (line) => {
        let lineSplit = line.split(" ");
        result.push(lineSplit.map(v => Number(v)));
    });
    return result;
}

function part1(_input: string) {
    let info = parseInput(_input)
    let totalSafe = 0;
    for (let level of info) {
        if (isLevelSafe(level)) {
            totalSafe++;
        }
    }
    console.log(totalSafe);
}

function part2(_input: string) {
    let info = parseInput(_input)
    let totalSafe = 0;
    for (let level of info) {
        if(isLevelSafe(level)){
            totalSafe++;
            continue;
        }
        let saveThroughDampener = false;
        for (let k: number = 0; k < level.length; k++) {
            let levelCopy = [...level];
            levelCopy.splice(k, 1);
            if (isLevelSafe(levelCopy)) {
                saveThroughDampener = true;
                break;
            }
        }
        // console.log({saveThroughDampener, level, length: level.length})
        if (saveThroughDampener) {
            totalSafe++;
        }

    }
    console.log(totalSafe);
}

function isLevelSafe(level: number[], print: boolean = false): boolean {
    if(print)
        console.log("isLevelSafe", level);
    let dir = 0;
    for (let i: number = 1; i < level.length; i++) {
        let currentDif = level[i - 1] - level[i];
        let currentDir = Math.sign(currentDif);
        currentDif = Math.abs(currentDif);
        if (dir == 0) dir = currentDir;
        if ((dir != 0 && dir != currentDir) || (currentDif < 1 || currentDif > 3)) {
            return false;
        }
    }
    return true;
}


part1(loadFile(__dirname, "test.txt"));
part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
part2(loadFile(__dirname, "input.txt"));