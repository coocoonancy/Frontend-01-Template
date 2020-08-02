var tty = require('tty');
var ttys = require('ttys');
var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdout.write('Hello World\n');
stdout.write('\033[1A');
stdout.write('winter\n');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function ask() {
    return new Promise((resolve, reject) => {
        rl.question('What do you think of Node.js? ', (answer) => {
            // TODO: Log the answer in a database
            console.log(`Thank you for your valuable feedback: ${answer}`);
          
            rl.close();
          });
    })
};

void async function() {
    await ask();
}();