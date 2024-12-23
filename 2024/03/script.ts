import { lineByLineCallback, loadFile } from "../utils";

function parseInput(_input: string): [number, number][] {
    let result: [number, number][] = [];
    let reg: RegExp = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    let matches = _input.matchAll(reg);
    for(let match of matches){
        // console.log(match.length);
        if(match.length !== 3) continue;
        result.push([Number(match[1]), Number(match[2])])
    }
    return result;
}

function parseInput2(_input: string): [number, number][] {
    let result: [number, number][] = [];
    let reg: RegExp = /(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/gm;
    let matches = _input.matchAll(reg);
    let active: boolean = true;
    for(let match of matches){
        // console.log(match, match.length);
        if(match[0].startsWith("d")){
            if(match[0] === "do()"){
                active = true;
            } else if(match[0] === "don't()"){
                active = false;
            }
            continue;
        }
        if(!active) continue;
        result.push([Number(match[2]), Number(match[3])])
    }
    return result;
}

function part1(_input: string){
    let data = parseInput(_input);
    let result = 0;
    for(let mult of data){
        result += mult[0] * mult[1];
    }
    console.log(result);
}
function part2(_input: string){
    let data = parseInput2(_input);
    // console.log(data);
    let result = 0;
    for(let mult of data){
        result += mult[0] * mult[1];
    }
    console.log(result);
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test2.txt"));
part2(loadFile(__dirname, "input.txt"));