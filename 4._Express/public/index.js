$.get("persons").then(res =>{
    res.map(person => {
        const containerPerson=`
            <div class="personCard" id="person-${person.id}">
                <p>ID: ${person.id ? person.id : "No ID"}</p>
                <label for="name">Name</label>
                <input type="text" disabled name="name" value="${person.name ? person.name: "No name"}">
                <input type="text" disabled name="gender" value="${person.gender ? person.gender: "No gender"}">
                <button class="delete" onClick=deletePerson(${person.id})>X</button>
                <button class="update" onClick=updatePerson(${person.id})>Update</button>
                <button class="save">Save</button>
            </div>
        `;
        $(".person-wrapper").append(containerPerson); 
    });  
});



function deletePerson(id){
    $.ajax({
    url: `persons/${id}`,
    method: 'DELETE' 
    })
    .done((res) => {
        console.log(res);
        $(`#person-${id}`).remove();
    });
}




function updatePerson(id){
    const btnUpdate = $(`#person-${id}`).find('.update');
    const btnSave = $(`#person-${id}`).find('.save');

    btnUpdate.hide();
    btnSave.show();

    toggleDisable(id);

    btnSave.click( () => {
        toggleDisable(id);
        savePerson(id, btnSave, btnUpdate);
    });
}



function savePerson(id, btnSave, btnUpdate){
    btnUpdate.show();
    btnSave.hide();

    let inputName = $(`#person-${id}`).find('input[name=name]').val();
    let inputGender = $(`#person-${id}`).find('input[name=gender]').val();
    
    data = {
        "name": inputName,
        "gender": inputGender
    }

    $.ajax({
        url: `persons/${id}`,
        method: 'PUT',
        data: data
        })
        .done((res) => {
            console.log(res);
            $(`#person-${id}`).find('input[name=name]').value = res.name;
            $(`#person-${id}`).find('input[name=gender]').value = res.gender;
    });
}





function createPerson(event){
    event.preventDefault();

    const inputName = $(`#form-create-person`).find('input[name=name]').val();
    const inputGender = $(`#form-create-person`).find('input[name=gender]').val();
    
    const data = {
        "name": inputName,
        "gender": inputGender
    }

    console.log(inputGender, inputName);
    $.ajax({
        url: `persons/`,
        method: 'POST',
        data: data
      })
      .done((res) => {

          const newPerson = res.newPerson;

          const containerPerson=`
            <div class="personCard" id="person-${newPerson.id}">
                <p>ID: ${newPerson.id ? newPerson.id : "No ID"}</p>
                <label for="name">Name</label>
                <input type="text" disabled name="name" value="${newPerson.name ? newPerson.name: "No name"}">
                <input type="text" disabled name="gender" value="${newPerson.gender ? newPerson.gender: "No gender"}">
                <button class="delete" onClick=deletePerson(${newPerson.id})>X</button>
                <button class="update" onClick=updatePerson(${newPerson.id})>Update</button>
                <button class="save">Save</button>
            </div>
        `;
        $(".person-wrapper").append(containerPerson); 
    });
}

function toggleDisable(id){
    console.log(id);
    $(`#person-${id}`).find('input').prop("disabled", (i, v) => {
        return !v;
    });
} 