import { getNumbersOfLineSeperatedBy, lineByLineCallback, loadFile } from "../utils";

function parseInput(_input: string): [number, number[]][] {
    let result: [number, number[]][]= [];
    lineByLineCallback(_input, (line) => {
        let [res, inputRaw] = line.split(":");
        let input = getNumbersOfLineSeperatedBy(inputRaw.trim(), " ");
        result.push([Number(res), input]);
    });
    return result;
}

function part1(_input: string){
    let data = parseInput(_input);

    let result = 0;
    for(let set of data){
        if(canBeFixed(set[0], set[1])){
            result += set[0];
        }
    }

    console.log(result);
}

function canBeFixed(result: number, input: number[]): boolean {
    let results: number[] = [input.shift()!];
    for(let num of input){
        results = results.map((prev) => [(prev ?? 1) * num, (prev ?? 0) + num]).flat();
    }
    return results.includes(result);
}
function canBeFixed2(result: number, input: number[]): boolean {
    let results: number[] = [input.shift()!];
    for(let num of input){
        results = results.map((prev) => [(prev ?? 1) * num, (prev ?? 0) + num, Number(String(prev ?? "") + String(num))]).flat();
    }
    return results.includes(result);
}

function part2(_input: string){
    let data = parseInput(_input);

    let result = 0;
    for(let set of data){
        if(canBeFixed2(set[0], set[1])){
            result += set[0];
        }
    }

    console.log(result);
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
part2(loadFile(__dirname, "input.txt"));