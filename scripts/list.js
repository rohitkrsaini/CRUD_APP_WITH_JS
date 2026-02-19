const tableBody = document.getElementById("table-body");

async function loadData() {

  try {
    let resp = await fetch("https://crud-app-with-js.onrender.com/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(newEmployeeData),// <-- SEND EMP DATA IN JSON-FORMAT 
    });
    //console.log(resp);
    let data = await resp.json();
    console.log("data", data);
    //alert(resp);
    let inner = '';
    for (i = 0; i < data.length; i++) {

      //const tr = createNode('tr');

      inner += `<tr>
        <td>${data[i].firstname}</td>
        <td>${data[i].email}</td>
        <td>${data[i].phoneno}</td>
        <td>${data[i].address.city}</td>
        <td>${data[i].address.state}</td>
        <td>${data[i].address.zipcode}</td>
        <td><button class="btn btn-edit" data-id="${data[i].id}"> edit</button >
        <button class="btn btn-delete" data-id="${data[i].id}">delete</button>
        </td>
      

        </tr>`

    }

    // console.log("inner", inner)
    tableBody.innerHTML = inner

  } catch (err) {
    console.log(err);
    alert("somthing went wrong ")
  }
};

// CALLS FUNCTION AFTER DOM TREE CREATION
window.addEventListener("DOMContentLoaded", () => {

  loadData();
})

//! update/edit oprations

async function handleDelete(id){
  console.log(id);
  try {
    let resp = await fetch(`https://crud-app-with-js.onrender.com/employees/${id}`,{
      method: "DELETE"
    })
    loadData();
    alert("delete successfully ")
  } catch (error) {
    console.log(error);
    alert("unable to delete")
    
  }
}

tableBody.addEventListener("click", function (event) {

  //console.log("event", event);
  //return;
  event.preventDefault();
  // If Delete button clicked
  if (event.target.classList.contains("btn-delete")) {
    const id = event.target.dataset.id;
    console.log("Delete clicked:", id);
    handleDelete(id);
  }

  // If Edit button clicked
  if (event.target.classList.contains("btn-edit")) {
    const id = event.target.dataset.id;
    console.log("Edit clicked:", id);
    window.location.href= `/pages/EditEmp.html?id=${id}`;
  }

});
