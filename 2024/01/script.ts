import { lineByLineCallback, loadFile } from "../utils";

const inputText = loadFile(__dirname, "input.txt");
const testText = loadFile(__dirname, "test.txt");

function part1(_input: string) {
    let [left, right] = parseInput(_input);

    left.sort(); right.sort();

    let size = left.length;
    let totalDistance = 0;
    for (let i: number = 0; i < size; i++) {
        let first = left.shift() ?? 0;
        let second = right.shift() ?? 0;
        totalDistance += Math.abs(first - second);
    }

    console.log(totalDistance);
}

function parseInput(_input: string): [number[], number[]] {
    let result: [number[], number[]] = [[], []];
    lineByLineCallback(_input, (line) => {
        let lineSplit = line.split("   ");
        result[0].push(Number(lineSplit[0]));
        result[1].push(Number(lineSplit[1]));
    })

    return result;
}

function part2(_input: string) {
    let [left, right] = parseInput(_input);
    let map = new Map<number, number>()
    for (let el of right) {
        if (!map.has(el)) {
            map.set(el, 1)
        } else {
            map.set(el, map.get(el)! + 1);
        }
    }

    let total = 0;
    for (let el of left) {
        total += (map.get(el) ?? 0) * el;
    }
    console.log(total);
}

part2(testText);
part2(inputText);