const readline = require("readline");
console.log("Welcome to Uche's Climbing Stairs Challenge!");

// Calculate Factorial
function factorial(number) {
    let product = 1;
    for (let i = number; i > 0; i--) {
        product *= i;
    }
    return product;
}

/* 
This solution is structured in such a way that acknowledges that the staircase can be climbed in two ways:
- A combination of 1 step and 2 steps.
- Taking one step all through or two steps all through.
*/

function getNumberOfWays(steps) {
    /* 
    This part shows the solution where there is a combination of both one and two steps. The idea is
    to create an analogy where we first get the possible combinations of 1 and 2 steps. The 'ones' array
    collects the possible number of 1-step climbs provided there must be a 2-step climb. E.g If there are
    7 steps, the possible combinations are 
    -one 2-step climb and 5 1-step climbs
    -two 2-step climbs and 3 1-step climbs
    -three 2-step climbs and 1 1-step climb
     */
    let n = steps; 
    let ones = [];
    let twos = [];
    let noOfWays = 0;
    let result;

    /* This for loop calculates the possible numbers of 1-step climbs if there must be a 2-step
     climb and pushes them to the 'ones' array */
    for (let i = n - 2; i > 0; i -= 2) {
        ones.push(i);
    }

    /* This forEach method calculates the corresponding number of 2-step climbs for each
     number of 1-step climb and pushes them to the 'twos' array */
    ones.forEach((item) => {
        let twoSteps = (steps - item)/2;
        twos.push(twoSteps);
    })

    /* Here I used a for loop to calculate(using permutation) the number of arrangements
     for each combination of 1-step and 2-step climbs. e.g In how many ways can we arrange 6 steps
     if 4 of them are identical and the other 2 are identical as well. (Thank God I was listening in my math classes) */
    for (let i = 0; i < ones.length; i++) {
        let totalClimbs = ones[i] + twos[i];
        noOfWays += factorial(totalClimbs)/(factorial(ones[i]) * factorial(twos[i])); /* Here we sum all the possible ways */
    }
    
    // Adding the option of taking one step all through and two steps all through (only possible for an even number).
    result = steps % 2 === 1 ? noOfWays + 1 /* for where the no of steps is an odd number */ : noOfWays + 2 /* for where the no of steps is an even number */;
    return result;
    
}

// Test using NodeJS
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

rl.question("Enter the number of steps:  ", (answer) => {
    console.log(getNumberOfWays(answer));
    rl.close();
})
