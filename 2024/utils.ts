import * as fs from "fs";
import path from "path";

export interface Vector2 {
    x: number;
    y: number;
}

export function loadFile(..._paths: string[]) {
    return fs.readFileSync(path.join(..._paths), { encoding: "utf-8" });
}

export function lineByLineCallback(_input: string, callback: (_line: string, _lineIndex: number) => void, callbackEmpty: () => void = () => { }) {
    let split = _input.split("\n");
    for (let i = 0; i < split.length; i++) {
        let line = split[i];
        if (line.trim().length > 0)
            callback(line.trim(), i);
        else callbackEmpty();
    }
}

export function getNumbersOfLineSeperatedBy(line: string, seperator: string): number[] {
    return line.split(seperator).map(n => Number(n));
}

export function lineByChar(_input: string, charCallback: (char: string, y: number, x: number) => void, lineEndCallback?: () => void): Vector2 {
    let split = _input.split("\r\n");
    let y = 0;
    let maxX = 0;
    for (let line of split) {
        let x = 0;
        line.split("").forEach(char => charCallback(char, y, x++));
        lineEndCallback?.();
        y++;
        if (maxX < x) maxX = x;
    }
    return { x: maxX, y };
}

export enum DIRECTION {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export const allDirections = [DIRECTION.DOWN, DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.UP];

export function doSomethingInAllDirections<T>(arr: Array<Array<T>>, pos: Vector2, thingToDo: (element: T, pos: Vector2, dir: DIRECTION) => void) {
    doThingAtPos({ y: pos.y + 1, x: pos.x }, DIRECTION.DOWN);
    doThingAtPos({ y: pos.y - 1, x: pos.x }, DIRECTION.UP);
    doThingAtPos({ y: pos.y, x: pos.x + 1 }, DIRECTION.RIGHT);
    doThingAtPos({ y: pos.y, x: pos.x - 1 }, DIRECTION.LEFT);

    function doThingAtPos(pos: Vector2, dir: DIRECTION) {
        if (isPosInsideArr(pos, arr))
            thingToDo(arr[pos.y][pos.x], pos, dir);
    }
}

function isPosInsideArr<T>(position: Vector2, array: Array<Array<T>>): boolean {
    if (position.x < 0 || position.y < 0 || position.y >= array.length || position.x >= array[position.y].length) return false;
    return true;
}

function isPosInsideDim(position: Vector2, dimension: Vector2): boolean {
    if (position.x < 0 || position.y < 0 || position.x >= dimension.x || position.y >= dimension.y) return false;
    return true;
}

export function goThroughArray<T>(arr: Array<Array<T>>, callback: (_element: T, _pos: Vector2) => void ){
    for(let y = 0; y < arr.length; y++){
        for(let x = 0; x < arr[y].length; x++){
            callback(arr[y][x], {x, y});
        }
    }
}