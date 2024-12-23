import { allDirections, DIRECTION, doSomethingInAllDirections, getNumbersOfLineSeperatedBy, goThroughArray, lineByChar, lineByLineCallback, loadFile, Vector2 } from "../utils";

interface Spot {
    type: string,
    counted?: boolean,
    bordersToIgnore: Set<DIRECTION>,
}

function parseInput(_input: string): Spot[][] {
    let result: Spot[][] = [];
    lineByLineCallback(_input, (line) => {
        let split = line.split("");
        result.push(split.map(v => { return { type: v, bordersToIgnore: new Set() } }))
    });
    return result;
}

function findRegion(map: Spot[][], pos: Vector2): [number, number] {
    let currSpot = map[pos.y][pos.x];
    // console.log({pos});
    currSpot.counted = true;
    let neighbors = 0;
    let totalArea = 1;
    let totalPerimeter = 0;
    doSomethingInAllDirections(map, pos, (el, pos) => {
        if (el.type !== currSpot.type) return;
        neighbors++;
        if (el.counted) return;
        let [area, perimeter] = findRegion(map, pos);
        // console.log({type: el.type, pos, area, perimeter});
        totalArea += area;
        totalPerimeter += perimeter;
    });
    let relevantSides = 4 - neighbors;
    // console.log({relevantSides, neighbors})
    totalPerimeter += relevantSides;
    return [totalArea, totalPerimeter];
}

function part1(_input: string) {
    let data = parseInput(_input);
    let total = 0;
    goThroughArray(data, (el, pos) => {
        if (el.counted) return;
        let [regionArea, regionPerimeter] = findRegion(data, pos);
        total += regionArea * regionPerimeter;
        // console.log({type: el.type, regionArea, regionPerimeter});
    })
    console.log({ total });
}

function findRegion2(map: Spot[][], pos: Vector2): [number, number] {
    let currSpot = map[pos.y][pos.x];
    // console.log({pos});
    currSpot.counted = true;
    let totalArea = 1;
    let totalPerimeter = 0;
    let directions: DIRECTION[] = [];
    doSomethingInAllDirections(map, pos, (el, pos, dir) => {
        if (el.type !== currSpot.type) return;
        directions.push(dir);
    });
    let borderDirections: DIRECTION[] = [];
    for(let dir of allDirections){
        if(!directions.includes(dir)){
            borderDirections.push(dir);
        }
    }
    doSomethingInAllDirections(map, pos, (el, pos, dir)=>{
        if (el.type !== currSpot.type || el.counted) return;
        for(let dir of borderDirections){
            el.bordersToIgnore.add(dir);
        }
    })
    doSomethingInAllDirections(map, pos, (el, pos, dir) => {
        if (el.type !== currSpot.type) return;
        if (el.counted) return;
        let [area, perimeter] = findRegion2(map, pos);
        // console.log({type: el.type, pos, area, perimeter});
        totalArea += area;
        totalPerimeter += perimeter;
    });

    let relevantSides = borderDirections.filter((v) => !currSpot.bordersToIgnore.has(v)).length;
    // console.log({relevantSides, borderDirections, bti: currSpot.bordersToIgnore})
    totalPerimeter += relevantSides;
    return [totalArea, totalPerimeter];
}

function part2(_input: string) {
    let data = parseInput(_input);
    let total = 0;
    goThroughArray(data, (el, pos) => {
        if (el.counted) return;
        let [regionArea, regionPerimeter] = findRegion2(data, pos);
        total += regionArea * regionPerimeter;
        console.log({type: el.type, regionArea, regionPerimeter});
    })
    console.log({ total });
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));
part2(loadFile(__dirname, "test.txt"));
// part2(loadFile(__dirname, "input.txt"));