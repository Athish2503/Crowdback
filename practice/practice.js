setTimeout(function()  {
    console.log("Hello, World!");
}, 5000);

function x(y){
    console.log("x");
    y();
}

x(function y(){
    console.log("y");
})