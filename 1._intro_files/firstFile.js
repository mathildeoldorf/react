
greetingTwo('hello');

const greetings = (greeting) => {
    console.log(greeting);
};

// hoisting - put in memory at the top of the file
// greetings('hello');

function greetingTwo(){
    console.log('hoisting works');
}