const math = require("./lib/math");
const fs = require("fs");

const doMath = (num1, num2) => {
  const csvData = [
    ["Operations", "num1", "num2", "Result"],
    ["Addition", num1, num2, math.add(num1, num2)],
    ["Subtraction", num1, num2, math.sub(num1, num2)],
    ["Multiplication", num1, num2, math.mult(num1, num2)],
    ["Division", num1, num2, math.div(num1, num2)],
  ];

  const csvString = csvData.map((row) => row.join(", ")).join("\n") + "\n\n";
  fs.appendFileSync("Maths Operation Result.xlsx", csvString, "utf-8");
};

console.log(process.argv);
const arguments = process.argv.slice(2);

if (arguments.length < 2) {
  console.log("Invalid argument!");
} else {
  const num1 = Number(arguments[0]);
  const num2 = Number(arguments[1]);

  console.log(num1, num2);

  if (!(num1 && num2)) {
    console.log("undefined values passed!");
    return;
  }

  doMath(num1, num2);
}
