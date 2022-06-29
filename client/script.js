const popup_delete = document.getElementById("popup-modal-delete");
const dclose = document.getElementById("dclose");
const btnDclose = document.getElementById("btnDclose");
const confirmBtn = document.getElementById("confirmBtn");
var loadDataBtn = document.getElementById("loadData");
var output = document.querySelector("#output");
var pname = document.getElementById("productNameValidation");
var p_nameValue = document.getElementById("p_name");
const detailValue = document.getElementById("p_details");
const priceValue = document.getElementById("p_price");
const categoryValue = document.getElementById("p_category");
const image = document.getElementById("image");
let image_preview = document.getElementById("image_preview");
let detailErr = document.getElementById("detailErr");
let priceErr = document.getElementById("priceErr");
let categoryErr = document.getElementById("categoryErr");
let imageErr = document.getElementById("imageErr");
const title = document.getElementById("title");
var u_id = "";
var row1 = "";
var strr = false;
fetch("http://localhost:3000/products")
.then((response) => response.json())
.then((data) => {

  renderUser(data);
});
const renderUser = (users) => {

  let out = "";
  users.forEach((user) => {
    out += `
            <tr data-id=${user.id} data-cid=${user.p_category} id="row">
                <td class="border border-slate-600" id="name_id" >${user.p_name}</td>
                <td class="border border-slate-600" id="detail_id" >${user.p_details}</td>
                <td class="border border-slate-600" id="price_id" >${user.p_price}</td>
                <td class="border border-slate-600" id="category_id" >${user.p_category}</td>
                <td class="border border-slate-600" id="category_id" ><img class="h-[100px] w-[100px]" src="../server/images/${user.image}"></td>
                <td class="p-2 border border-slate-600 text-center"><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-id=${user.id} id="id_delete" onclick="deleteUser(${user.id})">Delete</button></td>
                <td class="p-2 border border-slate-600 text-center"><button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" id="id_edit_${user.id}" onclick="editUser(${user.id})">Edit</button></td>
                
            </tr>
            
            `;
  });

  output.innerHTML = out;
};
const submitbtn = document.getElementById("submit");
submitbtn.addEventListener("click", (event) => {
  event.preventDefault();
  if(p_nameValue.value === ""){
    pname.innerHTML = "Name Field is Empty";
  }
  if(priceValue.value === ""){
    priceErr.innerHTML = "Price Field is Empty";
  }
  if(detailValue.value === ""){
    detailErr.innerHTML = "Dettail Field is Empty";
  }
  if(categoryValue.value === ""){
    categoryErr.innerHTML = "Category Field is Empty";
  }
  if(p_nameValue.value.length > 0 && priceValue.value.length > 0 && categoryValue.value.length > 0 && detailValue.value.length > 0  && strr == true){
    if(u_id){
      const formData = new FormData(document.querySelector("#form"));
      for (const value of formData.values()) {
        console.log(value);
      }
      fetch(`http://localhost:3000/products/update/${u_id}`, {
        method: 'PUT',
        body: formData,
      }).then((response) => response.json())
      .then(data => {
         var arr = [];
        arr.push(data);
        console.log(arr)
        let out = "";
        arr.forEach((user) => {
          out += `
                  <tr data-id=${user.id} data-cid=${user.p_category} id="row">
                      <td class="border border-slate-600" id="name_id" >${user.p_name}</td>
                      <td class="border border-slate-600" id="detail_id" >${user.p_details}</td>
                      <td class="border border-slate-600" id="price_id" >${user.p_price}</td>
                      <td class="border border-slate-600" id="category_id" >${user.p_category}</td>
                      <td class="border border-slate-600" id="category_id" ><img class="h-[100px] w-[100px]" src="../server/images/${user.image}"></td>
                      <td class="p-2 border border-slate-600 text-center"><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-id=${user.id} id="id_delete" onclick="deleteUser(${user.id})">Delete</button></td>
                      <td class="p-2 border border-slate-600 text-center"><button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" id="id_edit_${user.id}" onclick="editUser(${user.id})">Edit</button>
                  </tr>
                  
                  `;
        });
        row1.innerHTML = out;
        console.log(row1);
        modal_container.classList.add("hidden");
        clearData();
      })
        }
        else{
          const formData = new FormData(document.querySelector("#form"));
          fetch("http://localhost:3000/products/create", {
            method: 'post',
            body: formData,
        }).then((response) => response.json())
        .then(data => {
          console.log(data);
             var arr = [];
            arr.push(data);
            render(arr);
            modal_container.classList.add("hidden");
            clearData();
        })
        }
  }

});
const render = (users) => {

  let out = "";
  users.forEach((user) => {
    out += `
            <tr data-id=${user.id} data-cid=${user.p_category} id="row">
                <td class="border border-slate-600" id="name_id" >${user.p_name}</td>
                <td class="border border-slate-600" id="detail_id" >${user.p_details}</td>
                <td class="border border-slate-600" id="price_id" >${user.p_price}</td>
                <td class="border border-slate-600" id="category_id" >${user.p_category}</td>
                <td class="border border-slate-600" id="category_id" ><img class="h-[100px] w-[100px]" src="../server/images/${user.image}"></td>
                <td class="p-2 border border-slate-600 text-center"><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick="deleteUser(${user.id})">Delete</button></td>
                <td class="p-2 border border-slate-600 text-center"><button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" id="id_edit_${user.id}" onclick="editUser(${user.id})">Edit</button></td>
                
            </tr>
            
            `;
  });

  output.innerHTML += out;
};
const addProductbtn =  document.getElementById("addProduct");
var modal_container = document.getElementById("modal-container");
var modal_container_closer = document.getElementById("modal-container-closer");
addProductbtn.addEventListener("click",(e)=>{
  e.preventDefault();
  title.innerHTML = "Add New Product";
  modal_container.classList.remove("hidden");
});
modal_container_closer.addEventListener("click",(e)=>{
  e.preventDefault();
  modal_container.classList.add("hidden");
  clearData()

})
// //DELETE OPARATIONS

var d_id = "";
function deleteUser(id) {

  popup_delete.classList.add("show");
  // console.log(id);
  // var user = allUser.find((x) => x.id == id);
  d_id = id;

}
confirmBtn.addEventListener("click", () => {
  fetch(`http://localhost:3000/products/delete/${d_id}`, {
    method: "DELETE",
  
  }).then(()=>{
    var row = document.getElementById("row");
    popup_delete.classList.remove("show");
    row.remove();
    d_id = "";
  });

});
btnDclose.addEventListener("click", () => popup_delete.classList.remove("show"));
dclose.addEventListener("click", () => {
  popup_delete.classList.remove("show");
});

// //DELETE OPARATIONS END
////Update Oparation 
function editUser(id){
  row1 = document.getElementById("row");
  title.innerHTML = "Update Product";
u_id = id;
fetch(`http://localhost:3000/products/${id}`)
.then((response) => response.json())
.then(data => {
  allUser = [...data];
  var item = allUser.find((x) => x.id == id);
  console.log(item.p_category);
  modal_container.classList.remove("hidden");
  p_nameValue.value  = item.p_name;
  detailValue.value  = item.p_details;
  priceValue.value  = item.p_price;
  categoryValue.value  = item.p_category;
  image_preview.innerHTML = `<img class="h-[100px] w-[100px]" src="../server/images/${item.image}">`;
});

}

//ALL VALIDATION
function nameValidation() {
  

    if (p_nameValue.value.length < 3) {
      pname.innerHTML = "Product Name must have at least 4 characters";
      productNameValidation.classList.add("show");
    }
    if (p_nameValue.value.length > 3 && p_nameValue.value.length < 19) {
      pname.innerHTML = "";
    }
    if (p_nameValue.value.length > 20) {
      pname.innerHTML = "Product Name more than 20 characters";
    }
  }
// //PRICE VALIDATION
function priceValidation(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}
function categoriesFun() {
  categoryValidation = true;
}
function restrict(tis) {
  var prev = tis.getAttribute("data-prev");
  prev = prev != "" ? prev : "";
  if (Math.round(tis.value * 100) / 100 != tis.value) tis.value = prev;
  tis.setAttribute("data-prev", tis.value);
}
//PRICE VALIDATION
function priceValidation(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}
function isEmpty(){
   console.log(detailValue.value);
  if(p_nameValue.value.length > 0 && priceValue.value.length > 0 && categoryValue.value.length > 0 ){
    console.log("worked");
    document.getElementById("submit").classList.remove("cursor-not-allowed");
  }
}
function upload(event) {
  const value = event.target.value;
  let files = event.target.files;
  for (let file of files) {
    imageName = file.name;
    fileSize = file.size;
  }
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  const file = Math.round(fileSize / 1024);
  if (!allowedExtensions.exec(value)) {
    imageErr.innerHTML = "Invalid File type";
    return false;
  }
  if (file >= 1024) {
    imageErr.innerHTML = "more than 1024";
  }
  if (file <= 1024) {
    imageErr.innerHTML = "";
    strr = true;
  }
}

/////CLEAR DATA

function clearData(){
 p_nameValue.value  ="";
 detailValue.value  = "";
 priceValue.value  = "";
 categoryValue.value  = "";
 image.value = "";
 image_preview.innerHTML = "";
 pname.innerHTML = "";
 detailValue.value
 priceErr.innerHTML = "";
 categoryErr.innerHTML = "";
}

