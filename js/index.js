let siteNameInput = document.getElementById("siteName");
let siteUrlInput = document.getElementById("siteUrl");
let submitBtn = document.getElementById("submitBtn");
let updateBtn = document.getElementById("updateBtn");
let inputSearch = document.getElementById("inputSearch")
let indexNumber;

let websiteHome = [];
if (localStorage.getItem("webStorage") != null) {
  websiteHome = JSON.parse(localStorage.getItem("webStorage"));
}
display();

function addProduct() {
  let entered = {
    Name: siteName.value,
    Url: siteUrl.value,
  };

  websiteHome.push(entered);
  localStorage.setItem("webStorage", JSON.stringify(websiteHome));
  display();
  clearData()
}
function clearData(){
  siteName.value = " ";
  siteUrl.value = " ";
}

function display() {
  let webDisplay = " ";
  for (var i = 0; i < websiteHome.length; i++) {
    webDisplay += `
  <tr>
   <td>${i + 1}</td>
  <td>${websiteHome[i].Name}</td>
  <td><a href="https:/${websiteHome[i].Url}" class="py-2 px-3 text-decoration-none text-white btn" target="-blank" style="background-color:#9EB23B"><i class="fa-solid fa-eye text-white"></i> Visit</a></td>
  <td><button class="text-white py-2 px-3 btn btn-danger" onclick="deleteWeb(${i})"><i class="fa-solid fa-trash-can text-white"></i> Delete</button></td>
  <td><button class="text-white py-2 px-3 btn btn-info" onclick="updateData(${i})"><i class="fa-solid fa-pen-to-square text-white"></i> Update</button></td>
  </tr>
  
  `;
  }
  document.getElementById("table").innerHTML = webDisplay;
}

function deleteWeb(index){
  websiteHome.splice(index,1)
  localStorage.setItem("webStorage", JSON.stringify(websiteHome));
  display()

}


function updateData(indexUpdate){
indexNumber = indexUpdate;
let currentSite = websiteHome[indexNumber]
siteNameInput.value = currentSite.Name;
siteUrlInput.value = currentSite.Url;
submitBtn.classList.add("d-none");
updateBtn.classList.remove("d-none");
}


updateBtn.onclick = function(){
  let entered = {
    Name: siteName.value,
    Url: siteUrl.value,
  };
  websiteHome.splice(indexNumber,1,entered)

  localStorage.setItem("webStorage", JSON.stringify(websiteHome));
  display();
  clearData()

updateBtn.classList.add("d-none");
submitBtn.classList.remove("d-none");

}

function searchFun(){
  let searchVal = inputSearch.value;
  let webDisplay = " ";
  for (var i = 0; i < websiteHome.length; i++) {
    if(websiteHome[i].Name.toLowerCase().includes(searchVal.toLowerCase())){
    webDisplay += `
  <tr>
   <td>${i + 1}</td>
  <td>${websiteHome[i].Name}</td>
  <td><a href="https:/${websiteHome[i].Url}" class="py-2 px-3 text-decoration-none text-white btn" target="-blank" style="background-color:#9EB23B"><i class="fa-solid fa-eye text-white"></i> Visit</a></td>
  <td><button class="text-white py-2 px-3 btn btn-danger" onclick="deleteWeb(${i})"><i class="fa-solid fa-trash-can text-white"></i> Delete</button></td>
  <td><button class="text-white py-2 px-3 btn btn-info" onclick="updateData(${i})"><i class="fa-solid fa-pen-to-square text-white"></i> Update</button></td>
  </tr>
  
  `;
  }
}
  document.getElementById("table").innerHTML = webDisplay;

}
