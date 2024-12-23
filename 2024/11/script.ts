import { getNumbersOfLineSeperatedBy, lineByLineCallback, loadFile } from "../utils";

function parseInput(_input: string): Map<number, number> {
    let result: Map<number, number> = new Map();
    lineByLineCallback(_input, (line) => {
        getNumbersOfLineSeperatedBy(line, " ").forEach((v) => result.set(v, 1));
    });
    return result;
}

function blink(arr: Map<number, number>): Map<number, number> {
    let newMap: Map<number, number> = new Map();
    for(let entry of arr.entries()){
        let num = entry[0];
        let numS = num.toString();
        if(num === 0){
            addOrSetMap(newMap, 1, entry[1]);
        } else if(numS.length % 2 === 0) {
            let n1 = Number(numS.slice(0, numS.length / 2));
            let n2 = Number(numS.slice(numS.length / 2));
            addOrSetMap(newMap, n1, entry[1]);
            addOrSetMap(newMap, n2, entry[1]);
        } else {
            addOrSetMap(newMap, num * 2024, entry[1]);
        }
    }
    return newMap;
}

function addOrSetMap(map: Map<number, number>, key: number, value: number){
    if(!map.has(key)) return map.set(key, value);
    map.set(key, value + map.get(key)!);
}

function part1(_input: string){
    let data = parseInput(_input);
    const blinks = 25;
    for(let i: number = 0; i < blinks; i++){
        data = blink(data);
    }
    let result = 0;
    for(let value of data.values()){result += value};
    console.log(result);
}
function part2(_input: string){
    let data = parseInput(_input);
    const blinks = 75;
    for(let i: number = 0; i < blinks; i++){
        data = blink(data);
    }
    let result = 0;
    for(let value of data.values()){result += value};
    console.log(result);
}

part1(loadFile(__dirname, "test.txt"));
part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
console.time("part2")
part2(loadFile(__dirname, "input.txt"));
console.timeEnd("part2")