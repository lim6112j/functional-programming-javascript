"use strict";
// The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.
Object.defineProperty(exports, "__esModule", { value: true });
// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.
// Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).
// In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.
// Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.
// For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the optimal path RIGHT-> RIGHT -> DOWN -> DOWN.
// -2	-3	3 1 1
// -5	-10	1 1 1
// 10	30 -5 1 1
//  1  1  1 1 1
//  1  1  1 1 1
// current position 0,2 , next 0,1 or 1, 2 => 1,2
// current position 1,2 , next 1,1 or 2,2 => 2,2
// current position 2,2 , next 2, 1 => 2, 0 
// Note:
// m x n => m x right, n x down combination 
// The knight's health has no upper bound.
// Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.
var util_1 = require("../../utils/util");
function calculateMinimumHP(dungeon) {
    var R = dungeon[0].length;
    var C = dungeon.length;
    var x = 0, y = C;
    var health = []; // [[x,y,h,c]]
    var isFinished = false;
    var tryNum = 0;
    health[tryNum].push(1, 2);
    console.log(health);
    while (!isFinished) {
        if (x < R && y < C) {
        }
        else if (x === R && y < C) {
        }
        else if (x < R && y === C) {
        }
        else {
            isFinished = true;
        }
    }
    return 1;
}
;
util_1.header("Dungen-game Started");
console.time('dungeon');
util_1.assert(calculateMinimumHP([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]) === -2, "0,0 value 10");
console.timeEnd('dungeon');
