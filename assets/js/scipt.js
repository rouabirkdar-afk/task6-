const name = document.getElementById('name');
const price = document.getElementById('price');
const caterory = document.getElementById('category');
const link = document.getElementById('link');
const submite = document.getElementById('submite');
console.log(name, price, caterory, link, submite)
let Status = 'create';
let temp;
//creat product
let datap ;
if(localStorage.product!=null){
    datap=JSON.parse(localStorage.product)
}else{
    datap= [];
}
submite.onclick = function () {
    let newob = {
        name: name.value,
        price: price.value,
        caterory: caterory.value,
        link: link.value,
    }
    if(Status==='create'){
        datap.push(newob)
    }
    else{
        datap[temp] = newob
        Status = 'create';
        submite.innerHTML='Create';
    }
    
    localStorage.setItem('product', JSON.stringify(datap))
    console.log(datap)
    clearData()
    showData()
}
//clear 
function clearData(){
    name.value='';
    price.value='';
    caterory.value='';
    link.value='';
}
//read{
showData =()=>{
let tabel='';
for (let i = 0; i < datap.length; i++) {
    // tabel = datap[i];
    tabel +=`<tr>
                    <td>${datap[i].name}</td>
                    <td>${datap[i].price}</td>
                    <td>${datap[i].caterory}</td>
                    <td>${datap[i].link}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`
    
}
document.getElementById('tbody').innerHTML =tabel;
let bdel = document.getElementById('deletall');
if(datap.length>0){
    bdel.innerHTML =`<button onclick="deleteAll()"  class="deletall">Deleta All</button>`
}else{
    bdel.innerHTML='';
}
}
showData()
//delete
function deleteData(i){
    datap.splice(i,1);
    localStorage.product = JSON.stringify(datap)
    showData()
}
function deleteAll(i){
    localStorage.clear;
    datap.splice(0);
    showData()
}

function updateData(i){
    console.log(i)
    name.value = datap[i].name;
    price.value = datap[i].price;
    caterory.value = datap[i].caterory;
    link.value = datap[i].link;
    submite.innerHTML = 'Update';
    Status = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}