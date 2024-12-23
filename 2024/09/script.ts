import { getNumbersOfLineSeperatedBy, lineByLineCallback, loadFile } from "../utils";

function parseInput(_input: string): number[] {
    let result: number[] = [];
    lineByLineCallback(_input, (line) => {
        result = getNumbersOfLineSeperatedBy(line, "");
    });
    return result;
}

function denseToFull(dense: number[]): (number | undefined)[] {
    let result: (number | undefined)[] = [];

    let fileIndex = 0;
    let fileActive = true;
    for (let num of dense) {
        for (let i: number = 0; i < num; i++) {
            result.push(fileActive ? fileIndex : undefined)
        }
        fileActive = !fileActive;
        if (fileActive) fileIndex++;
    }

    return result;
}

function putIntoFirstUndefined(arr: (number | undefined)[], value: number, startSearchAt: number = 0): number {
    for (let i: number = startSearchAt; i < arr.length; i++) {
        if (arr[i] === undefined) {
            arr[i] = value;
            return i;
        }
    }
    return -1;
}

function putIntoFirstUndefinedBlock(arr: (number | undefined)[], value: number, length: number, searchUntil: number = arr.length): number {
    for (let i: number = 0; i < searchUntil; i++) {
        if (arr[i] === undefined) {
            let allUndefined = true;
            for(let l= 0; l < length; l++){
                if(arr[i + l] !== undefined){
                    allUndefined = false;
                    break;
                }
            }
            if(!allUndefined) continue;
            for(let l= 0; l < length; l++){
                arr[i + l] = value;
            }
            return i + length;
        }
    }
    return -1;
}

function checksum(arr: (number|undefined)[]): number {
    let total = 0;
    for (let i: number = 0; i < arr.length; i++) {
        total += i * (arr[i] ?? 0);
    }
    return total;
}

function part1(_input: string) {
    let data = parseInput(_input);
    let full = denseToFull(data);
    let startPos = 0;
    while (startPos >= 0) {
        let element = full.pop()!;
        if (element === undefined) continue;
        startPos = putIntoFirstUndefined(full, element, startPos);
        if (startPos < 0) full.push(element);
    }
    console.log(checksum(full));
}

function getBlockLength(arr: (undefined|number)[], value: number): [number, number]{
    let length = 0;
    let startsAt = -1;
    for(let i = arr.length - 1; i >= 0; i--){
        if(arr[i] !== value) {
            if(length > 0) break;
            continue;
        }
        length++;
        startsAt = i;
    }

    return [length, startsAt];
}

function part2(_input: string) {let data = parseInput(_input);
    let full = denseToFull(data);
    let index = full.pop()!;
    full.push(index);
    while (index >= 0) {
        let [length, startsAt] = getBlockLength(full, index)
        let result = putIntoFirstUndefinedBlock(full, index, length, startsAt);
        if(result >= 0) {
            // console.log({result, length, startsAt})
            for(let i: number = 0; i < length; i++){
                // console.log(startsAt + i, full[startsAt + i]);
                full[startsAt + i] = undefined;
            }
        }
        index--;
    }
    console.log(checksum(full));
    // console.log(full.reduce((p, c)=> p + (c ?? ".") , ""));
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
part2(loadFile(__dirname, "input.txt"));