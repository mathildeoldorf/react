// static get on the instance of the class
class Test {
    static get myThing(){
        return "lollipop";
    }
}

// getter and setters

const test = new Test();

console.log(Test.myThing);