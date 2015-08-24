var sh = require("shelljs");

var data = {
    code: 0,
    output: ''
};

sh.exec("/bin/ls -1 | head -1", {async:false}, function(code, output) {
    data.code = code;
    data.output = output;
});

console.log("Exit code: " + data.code);
console.log("Program output: " + data.output);