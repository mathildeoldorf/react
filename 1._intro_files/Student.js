// CAPITAL for class AND for class files

// object
class Student{

   

    // constructor - give it values the moment you initialize
    constructor(name){
        // creating a field inside the object
        this.name = name;
        this.courses = []; // This is good for having it to change dynamically
    }

     // fields
    //  courses = [];

    //method - belongs to a class - a setter - where you set the value
    addClass(studentClass){
        this.courses.push(studentClass);
    }
}

// create a new object
// const student = new Student("Lars");
// student.addClass("React+NodeJS");
// student.addClass("Svelte+NodeJS+Mongo");

// console.log(student.name);
// console.log(student.courses);



// export

module.exports = Student;
