import { getNumbersOfLineSeperatedBy, lineByChar, lineByLineCallback, loadFile, Vector2 } from "../utils";

function parseInput(_input: string): [Map<string, Vector2[]>, Vector2] {
    let result: Map<string, Vector2[]> = new Map<string, Vector2[]>();
    let dimensions = lineByChar(_input, (char, y, x) => {
        if (char === ".") return;
        if (!result.has(char)) result.set(char, []);
        result.get(char)?.push({ x, y });
    })
    return [result, dimensions];
}

function part1(_input: string) {
    let [data, dim] = parseInput(_input);
    let antinodes: Vector2[] = [];
    for (let beacons of data.entries()) {
        let positions = beacons[1];
        // console.log(beacons[0]);
        for (let i = 0; i < positions.length; i++)
            for (let k = 0; k < positions.length; k++) {
                if (i === k) continue;
                let b1 = positions[i];
                let b2 = positions[k];

                let aPos: Vector2 = {
                    x: (b1.x - b2.x) + b1.x,
                    y: (b1.y - b2.y) + b1.y,
                }
                let bPos: Vector2 = {
                    x: (b2.x - b1.x) + b2.x,
                    y: (b2.y - b1.y) + b2.y,
                }

                // console.log(b1, b2, aPos, bPos);

                insertPosition(antinodes, aPos, dim);
                insertPosition(antinodes, bPos, dim);
            }
    }
    visualize(data, antinodes, dim);
    console.log(antinodes.length);
}

function insertPosition(array: Vector2[], position: Vector2, dimension: Vector2) {
    if (array.some(v => v.x === position.x && v.y === position.y)) return;
    if (!isPosInsideDim(position, dimension)) return;
    array.push(position);
}

function isPosInsideDim(position: Vector2, dimension: Vector2): boolean {
    if (position.x < 0 || position.y < 0 || position.x >= dimension.x || position.y >= dimension.y) return false;
    return true;
}

function part2(_input: string) {
    let [data, dim] = parseInput(_input);
    let antinodes: Vector2[] = [];
    for (let beacons of data.entries()) {
        let positions = beacons[1];
        // console.log(beacons[0]);
        for (let i = 0; i < positions.length; i++)
            for (let k = 0; k < positions.length; k++) {
                if (i === k) continue;
                let b1 = positions[i];
                let b2 = positions[k];

                for (let z = 0; z < 10000; z++) {
                    let aPos: Vector2 = {
                        x: (b1.x - b2.x) * z + b1.x,
                        y: (b1.y - b2.y) * z + b1.y,
                    }
                    let bPos: Vector2 = {
                        x: (b2.x - b1.x) * z + b2.x,
                        y: (b2.y - b1.y) * z + b2.y,
                    }

                    // console.log(b1, b2, aPos, bPos);

                    insertPosition(antinodes, aPos, dim);
                    insertPosition(antinodes, bPos, dim);

                    if (!isPosInsideDim(bPos, dim) && !isPosInsideDim(bPos, dim))
                        break;
                }
            }
    }
    visualize(data, antinodes, dim);
    console.log(antinodes.length);
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));
// part2(loadFile(__dirname, "test.txt"));
part2(loadFile(__dirname, "input.txt"));

function visualize(antennas: Map<string, Vector2[]>, antinodes: Vector2[], dimension: Vector2) {
    let output: string[][] = [];
    for (let y = 0; y < dimension.y; y++) {
        let row: string[] = [];
        for (let x = 0; x < dimension.x; x++) {
            row.push(".")
        }
        output.push(row);
    }

    for(let antenna of antennas.entries()){
        for(let pos of antenna[1]){
            output[pos.y][pos.x] = antenna[0];
        }
    }
    // for(let antinode of antinodes){
    //     if(output[antinode.y][antinode.x] === ".") output[antinode.y][antinode.x] = "#";
    // }

    console.log(output.reduce((prev, curr)=>{
        return prev + curr.join("") + "\n";
    }, ""));
}