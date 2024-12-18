//local mod.calc
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculator() {
    rl.question('Enter the first number (or 0 to exit): ', (input1) => {
        const num1 = parseFloat(input1);
        if (num1 === 0) {
            console.log('Exiting the calculator.');
            rl.close();
            return;
        }

        rl.question('Enter the second number: ', (input2) => {
            const num2 = parseFloat(input2);
            console.log(`You entered: ${num1} and ${num2}`);

            const sum = num1 + num2;
            const difference = num1 - num2;
            const product = num1 * num2;
            const quotient = num2 !== 0 ? num1 / num2 : 'undefined (division by zero)';

            console.log(`Sum: ${sum}`);
            console.log(`Difference: ${difference}`);
            console.log(`Product: ${product}`);
            console.log(`Quotient: ${quotient}`);

            calculator();
        });
    });
}

calculator();
