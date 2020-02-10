// import in NODE
// const and let is a declaration of a variable - without it becomes global
    // const = not reassigning it / changing it over time
    // let = can change


console.log("message: ", Student);

// let students = [];

for(let i = 0; i < 10; i++){
    const student = new Student(faker.name.firstName() + ' ' + faker.name.lastName());
    console.log(student);

    // console.log(faker.name.prefix(), faker.name.firstName(), faker.name.lastName(), faker.name.suffix(), faker.name.jobTitle());
}

