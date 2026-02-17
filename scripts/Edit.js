const employeeFormEle = document.getElementById("employee-form");
const firstNameEle = document.getElementById("firstname");
const middleNameEle = document.getElementById("middlename");
const lastNameEle = document.getElementById("lastname");
const dobEle = document.getElementById("dob");
const emailEle = document.getElementById("email");
const maritalStatusEle = document.getElementById("maritalstatus");
const phoneNoEle = document.getElementById("phoneno");
const streetEle = document.getElementById("address");
const cityEle = document.getElementById("city");
const stateEle = document.getElementById("state");
const countryEle = document.getElementById("country");
const zipCodeEle = document.getElementById("zipcode");

async function getEditEmp() {
    const parms = new URLSearchParams(window.location.search)

    const id = (parms.get("id"))
    console.log("id", id)

    try {
        let resp = await fetch(`http://localhost:5000/employees/${id}`,)
        let data = await resp.json()
        console.log("data==>",data);

        // pre-Filled Input Fileds

        firstNameEle.value = data.firstname;
        middleNameEle.value  = data.middlename
        lastNameEle.value = data.lastname
        dobEle.value = data.dob
        emailEle.value = data.email
        maritalStatusEle.value = data.maritalstatus
        phoneNoEle.value = data.phoneno
        streetEle.value = data.address.street
        stateEle.value = data.address.city
        countryEle.value = data.address.country
        zipCodeEle.value = data.address.zipcode
        cityEle.value = data.address.city
        
    } catch (error) {
        console.log(error);
        alert("somthing went wrong")
        
    }
    
}

window.addEventListener("DOMContentLoaded", (event) =>{
    getEditEmp()
})

employeeFormEle.addEventListener("submit", (event)=>{
    
    event.preventDefault();
    //const data = new FormData(employeeFormEle);
    //console.log("data", data)
    const parms = new URLSearchParams(window.location.search)
    const id = (parms.get("id"))
    EditEmployee(id);

})

async function EditEmployee(id){
    // update EMP OBJECT
  let newEmployeeData = {
    firstname: firstNameEle.value.trim(),
    middlename: middleNameEle.value.trim(),
    lastname: lastNameEle.value.trim(),
    dob: dobEle.value.trim(),
    email: emailEle.value.trim(),
    maritalstatus: maritalStatusEle.value,
    phoneno: phoneNoEle.value,
    address: {
      street: streetEle.value.trim(),
      city: cityEle.value.trim(),
      state: stateEle.value.trim(),
      country: countryEle.value.trim(),
      zipcode: zipCodeEle.value.trim(),
    },
  };

  try {
    let resp = await fetch(`http://localhost:5000/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeData),// <-- SEND EMP DATA IN JSON-FORMAT 
    });

    window.lo
  } catch (err) {
    console.log(err);
  }
}