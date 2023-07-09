add = document.getElementById("add");

add.addEventListener("click", getAndUpdate);
updateData();

function reset() {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
}

function getAndUpdate() {
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;

  if(title.valueOf() == ''){
    alert("title is required!");
  }
else{
  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];

    itemJsonArray.push([title, description]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    console.log(itemJsonArray);
    reset();
  } else {
    itemJsonArrayStr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    console.log(itemJsonArray);
    itemJsonArray.push([title, description]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    reset();
  }
}
  updateData();
}

function updateData() {
  if (table.innerText == "There is no task") {
    table.innerHTML = `
            
            <table class="table" id="table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Task Title</th>
              <th scope="col">Item Description</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody id="tableBody">

            <tr>
              <th scope="row"></th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>`;
  }

  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    let tableBody = document.getElementById("tableBody");
  } else {
    itemJsonArrayStr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  //populate the table
  let tableBody = document.getElementById("tableBody");
  let str = "";

  itemJsonArray.forEach((element, index) => {
    str += `
        <tr>
              <th scope="row">${index + 1}</th>
              <td class="fw-bold">${element[0]}</td>
              <td>${element[1]}</td>
              <td>
                <button class="btn btn-sm shadow btn-danger" onclick="deleteItem(${index});">Delete</button>
            </td>
            </tr>`;
  });
  tableBody.innerHTML = str;
  if (str == "") {
    table.innerHTML = `<span><h3 class="text-center">There is no task</h3></span>`;
  }
}

function deleteItem(itemIndex) {
  itemJsonArrayStr = localStorage.getItem("itemJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);

  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  updateData();
}

function clr() {
  if (itemJsonArray < [Array(2)]) {
    alert("No Task to remove!");
  } else if (
    confirm("You will loss your all Tasks, Do you want to continue?")
  ) {
    localStorage.clear();
  }

  updateData();
}