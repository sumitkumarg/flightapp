var last = "";                          // Last operation
var next = "";                          // Next operation
var result = 0;                         // Result of last operation
var history = [];                       // TODO - operation history array [operation, num]
var reset = false;                      // Reset input field on next num press
var lastInput = "";                     // Last num input


function type(n) {
    // TODO Add number limit

    // Don't allow useless 0s
    if (n == "0" && $("#temp").text == "0") 
        return;

    // Only one comma
    if (n == "." && $("#temp").text().indexOf(n) >= 0)
        return;

    // Clear input after selecting an operation
    if (($("#temp").text() == "0" || reset) && n != ".") {
        lastInput = $("#temp").text();
        $("#temp").text("");
        reset = false;
        last = next;
        next = "";
    }

    // Add n to the input field
    $("#temp").text( $("#temp").text() + n);
}

// Queues the next op, solves if needed
function nextOperation(op) {
    switch (op) {
        case "percent":
            $("#temp").text(percent($("#temp").text()));
            next = "";
            return;
        case "sqroot":
            $("#temp").text(sqroot($("#temp").text()));
            next = "";
            return;
        case "square":
            $("#temp").text(square($("#temp").text()));
            next = "";
            return;
        case "inverse":
            $("#temp").text(inverse($("#temp").text()));
            next = "";
            return;
              }    
    
    // Solve the current op before queuing a new one
    if (!next && last) 
        solve();

    next = op;
    reset = true;
}

function sum(a, b) {
    return Number(a) + Number(b);
}

function subs(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

function percent() {
    return;
}

function sqroot(a) {
    return Math.sqrt(Number(a));
}

function square(a) {
    return Math.pow(Number(a), 2);
}

function inverse(a) {
    return 1 / Number(a);
}

// I bet this has some weird ass bug
function plusminus() {
    $("#temp").text(-$("#temp").text());
}

function solve() {
    var a;
    var b = lastInput;
    var operation;
    
    a = $("#temp").text();
    
    switch (last) {
        case "sum":
            operation = sum;
            break;
        case "subs":
            operation = subs;
            break;
        case "multiply":
            operation = multiply;   
            break;
        case "divide":
            operation = divide;
            break;
        case "percent":
            percent(a);
            next = "";
            return;
        case "sqroot":
            sqroot();
            next = "";
            return;
        case "square":
            square(a);
            next = "";
            return;
        case "inverse":
            inverse(a);
            next = "";
            return;
              }
    
    result = operation(a,b);
    lastInput = $("#temp").text();
    $("#temp").text(result);
    
    //last = [next, $("#temp").text()];
    next = "";
    reset = true;
}

// Clear input 
function clearScr() {
    $("#temp").text("0");
}

// Reset everything! Except some things!
function resetInput() {
    $("#temp").text("0");
    next = "";
    last = "";
    lastInput = "";
}

function backspace() {
    var foo = $("#temp").text();
    foo = foo.split("");
    foo.pop();
    foo = foo.join("");
    foo = foo == "" ? "0" : foo;

    $("#temp").text(foo);
}

// Is this bad practice
$(".btn-num").click( function() {
    type($(this).text());
    next = "";
});

// This definitely is bad lol
$(".btn-op").click( function() {
    let op = this.id; //$(this).attr("id");
    if(op == "solve") { solve(); return; }
    nextOperation(op);
});