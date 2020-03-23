fetch("http://localhost:9090/persons").then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
    data.map((person, i )=> {
        const divPerson = document.createElement("div");
        divPerson.classList.add("person" + i);
        
        let pName = document.createElement("p");
        
        pName.textContent = person.name;

        let pGender = document.createElement("p");
       
        pGender.textContent = person.gender;

        const button = document.createElement("button");
        button.textContent = "delete";

        divPerson.append(pName, pGender, button);
        document.querySelector('.person-wrapper').append(divPerson);

        button.addEventListener("click", () => {
            deletePerson(divPerson.className);
        })
    });

})


function deletePerson(divPerson){
    console.log('deleted' + divPerson);
    document.querySelector("."+divPerson).remove()
}