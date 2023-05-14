var emailf=document.getElementById('email');
var idf=document.getElementById('id');
var agef=document.getElementById('age');

function getmethod(){
    var method=document.getElementById('method').value;
    var fields=document.getElementById('data');
    var namef=document.getElementById('namef');
    var emailf=document.getElementById('emailf');
    var idf=document.getElementById('idf');
    var agef=document.getElementById('agef');
    var genderfield=document.getElementById("gender");
    if(method=="Get_all"){
        fields.style.display="none";
        genderfield.style.display="none";
    }else if(method=="Get_by_ID"){
        fields.style.display="block";
        namef.style.display="none";
        emailf.style.display="none";
        agef.style.display="none";
        genderfield.style.display="none";
    }else if(method=="Post_new"){
        fields.style.display="block";
        namef.style.display="block";
        emailf.style.display="block";
        agef.style.display="block";
        idf.style.display="none";
        genderfield.style.display="block";
    }else if(method=="Update_by_ID"){
        fields.style.display="block";
        namef.style.display="block";
        emailf.style.display="block";
        agef.style.display="block";
        idf.style.display="block";
        genderfield.style.display="block";
    }else if(method=="Delete_by_ID"){
        fields.style.display="block";
        namef.style.display="none";
        emailf.style.display="none";
        agef.style.display="none";
        genderfield.style.display="none";
    }else{
        alert("CHOOSE FUNCTION");
        fields.style.display="block";
        namef.style.display="block";
        emailf.style.display="block";
        agef.style.display="block";
        idf.style.display="block";
        genderfield.style.display="block";
    }
}
function getgender() {
    var ele = document.getElementsByName('gender');
    var genderval;
    for (i = 0; i < ele.length; i++) {
        if (ele[0].checked)
            genderval= ele[0].value;
        else if(ele[1].checked)
            genderval=ele[1].value;
    }
    return genderval;
}

function getdata(){
    const data = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        gender: getgender()
      };
      const jsonString = JSON.stringify(data);
      console.log(jsonString);
}
function funupdate(){
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var age=document.getElementById('age').value;
}

function submits(){
    var methodeselected=document.getElementById('method').value;
    if(methodeselected=="Post_new"){
        const url = 'http://localhost:3000/persons'; 
        var data = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            gender: getgender()
        };
        fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(person => {
        console.log(person);
        const table = document.getElementById('personTable');
        const row = table.insertRow();

        // Create table cells for each property of the person
        const idCell = row.insertCell();
        const nameCell = row.insertCell();
        const ageCell = row.insertCell();
        const gendercell = row.insertCell();
        const emailcell = row.insertCell();
        // Assign values to the table cells
        idCell.textContent = person.id;
        nameCell.textContent = person.name;
        ageCell.textContent = person.age;
        gendercell.textContent=person.gender;
        emailcell.textContent=person.email;
        alert("Person has been added");
        })
        .catch(error => {
        // Handle any errors
        console.error(error);
        });

    }else if(methodeselected=="Update_by_ID"){
        var id=document.getElementById('id').value;
        const url = 'http://localhost:3000/persons/<person_id>';
        const updatedData = {
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                email: document.getElementById('email').value,
                gender: getgender()
        };

        fetch(url.replace('<person_id>', id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Request failed with status ' + response.status);
            }
        })
        .then(data => {
            console.log(data);
            const table = document.getElementById('personTable');
            const row = table.insertRow();

            // Create table cells for each property of the person
            const idCell = row.insertCell();
            const nameCell = row.insertCell();
            const ageCell = row.insertCell();
            const gendercell = row.insertCell();
            const emailcell = row.insertCell();
            // Assign values to the table cells
            idCell.textContent = data.id;
            nameCell.textContent = data.name;
            ageCell.textContent = data.age;
            gendercell.textContent=data.gender;
            emailcell.textContent=data.email;
            alert(`person ${id} has been updated`);
           
        })
        .catch(error => {
            console.error(error); // Handle any errors
        });

    }else if(methodeselected=="Get_all"){
        fetch('http://localhost:3000/persons')
            .then(response => response.json())
            .then(data => {
            // Process the response data
            console.log(data);
            const table = document.getElementById('personTable');

            // Create a table row for each person in the data
            data.forEach(person => {
            const row = table.insertRow();

            // Create table cells for each property of the person
            const idCell = row.insertCell();
            const nameCell = row.insertCell();
            const ageCell = row.insertCell();
            const gendercell = row.insertCell();
            const emailcell = row.insertCell();
            // Assign values to the table cells
            idCell.textContent = person.id;
            nameCell.textContent = person.name;
            ageCell.textContent = person.age;
            gendercell.textContent=person.gender;
            emailcell.textContent=person.email;
            });
         })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

    }else if(methodeselected=="Get_by_ID"){
        var id=document.getElementById('id').value;

        fetch(`http://localhost:3000/persons/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Error: ' + response.status);
            }
        })
        .then(person => {
            // Handle the person data
            console.log(person);
            const table = document.getElementById('personTable');
            const row = table.insertRow();

            // Create table cells for each property of the person
            const idCell = row.insertCell();
            const nameCell = row.insertCell();
            const ageCell = row.insertCell();
            const gendercell = row.insertCell();
            const emailcell = row.insertCell();
            // Assign values to the table cells
            idCell.textContent = person.id;
            nameCell.textContent = person.name;
            ageCell.textContent = person.age;
            gendercell.textContent=person.gender;
            emailcell.textContent=person.email;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

    }else if(methodeselected=="Delete_by_ID"){
        var id=document.getElementById('id').value;
        const url = `http://localhost:3000/persons/${id}`; 
        fetch(url, {
        method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to delete person');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data
            console.log(data);
            alert(`person ${id} is deleted`);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

    }
}