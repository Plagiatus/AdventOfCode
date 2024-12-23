import { getNumbersOfLineSeperatedBy, lineByLineCallback, loadFile } from "../utils";

function parseInput(_input: string): [Map<number, number[]>, number[][]] {
    let rules: Map<number, number[]> = new Map();
    let output: number[][] = [];
    let parsingRules: boolean = true;
    lineByLineCallback(_input, (line) => {
        if (parsingRules) {
            let rule = getNumbersOfLineSeperatedBy(line, "|")
            if (!rules.has(rule[0])) rules.set(rule[0], [rule[1]]);
            else rules.get(rule[0])!.push(rule[1]);
        } else {
            let pages = getNumbersOfLineSeperatedBy(line, ",");
            output.push(pages);
        }

    }, () => { parsingRules = false; });

    return [rules, output];
}

function part1(_input: string, fix: boolean = false) {
    let [rules, outputs] = parseInput(_input);
    let result = 0;

    for (let output of outputs) {
        let ruleViolation = false;
        for (let p: number = output.length - 1; p >= 0 && !ruleViolation; p--) {
            let rule = rules.get(output[p]);
            if (!rule) continue;
            for (let p2: number = p - 1; p2 >= 0 && !ruleViolation; p2--) {
                let page = output[p2];
                if (rule.includes(page)) {
                    ruleViolation = true;
                }
            }
        }
        if (!fix) {
            if (!ruleViolation) {
                result += output[Math.floor(output.length / 2)];
            }
        } else {
            if (ruleViolation) {
                let fixed = fixPages(output, rules);
                result += fixed[Math.floor(fixed.length / 2)];
            }
        }
    }
    console.log(result);
}
function fixPages(input: number[], rules: Map<number, number[]>): number[] {
    let output: number[] = [];
    for (let page of input) {
        let positionToPut: number = output.length;
        let rule = rules.get(page);
        if (rule)
            for (let i: number = 0; i < output.length; i++) {
                let pageToCompare = output[i];
                if (rule.includes(pageToCompare)) {
                    positionToPut = i;
                    break;
                }
            }
        output.splice(positionToPut, 0, page);
    }

    // console.log("fixed", output);
    return output;
}

// part1(loadFile(__dirname, "test.txt"));
// part1(loadFile(__dirname, "input.txt"));

part1(loadFile(__dirname, "test.txt"), true);
part1(loadFile(__dirname, "input.txt"), true);