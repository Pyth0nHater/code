const robot = require("robotjs");

// Координаты, по которым будет производиться клик
const x = 100;
const y = 300;

for(let i= 0; i<10; i++){
for(let i= 0; i<370; i+=7){
    robot.moveMouse(500 + i, y);
    robot.mouseClick();
}
for(let i= 370; i>1; i-=7){
    robot.moveMouse(500 + i, y);
    robot.mouseClick();
}
}