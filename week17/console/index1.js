var ttys = require('ttys');

var stdin = ttys.stdin;
var stdout = ttys.stdout;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

function getChar() {
    return new Promise((resolve) => {d
        stdin.on('data', function(key) {
            resolve(key);
        })
    })
}
function up (n = 1) {
    stdout.write('\033['+n+'A');
}
function down (n = 1) {
    stdout.write('\033['+n+'B');
}
function right (n = 1) {
    stdout.write('\033['+n+'C');
}
function left (n = 1) {
    stdout.write('\033['+n+'D');
}
void async function() {
    stdout.write('aa \n');
    let answer = await options(['vue', 'react']);
    stdout.write('aa' + answer + '\n');
    // while(true) {
    //     let char = await getChar();
    //     if (char === '\0003') {
    //         process.exit();
    //         break;
    //     }
    //     console.log(char.split('').map(c => c.charCodeAt(0)));
    // }
}();
async function options(choices) {
    let j = 0;
    // for (const choice of choices) {
    //     stdout.write(choice + '\n');
    // }
    for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        if (i === j) {
            stdout.write('[x]' + choice + '\n');
        } else {
            stdout.write('[]' + choice + '\n');
        }
    }
    up(choices.length);
    right();
    while(true) {
        let char = await getChar();
        if (char === 'w' && j > 0) {
            stdout.write(' ');
            left();
            j--;
            up();
            stdout.write('x');
            left();
        }
        if (char === 's' && j < choices.length - 1) {
            stdout.write(' ');
            left();
            j++;
            down();
            stdout.write('x');
            left();
        }
        if (char === '\r') {
            down(choices.length - j);
            left();
            return choices[j];
        }
    }
}