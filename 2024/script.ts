/*
import { getNumbersOfLineSeperatedBy, lineByLineCallback, loadFile } from "../utils";

function parseInput(_input: string): number[][] {
    let result: number[][] = [];
    lineByLineCallback(_input, (line) => {
        getNumbersOfLineSeperatedBy(line, " ");
    });
    return result;
}

function part1(_input: string){
    let data = parseInput(_input);
}
function part2(_input: string){
    let data = parseInput(_input);
}

part1(loadFile(__dirname, "test.txt"));
part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
part2(loadFile(__dirname, "input.txt"));