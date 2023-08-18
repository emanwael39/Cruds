var title=document.getElementById("title");
var price=document.getElementById("price");
var taxes=document.getElementById("taxes");
var ads=document.getElementById("ads");
var discount=document.getElementById("discount");
var total=document.getElementById("total");
var cout=document.getElementById("count");
var category=document.getElementById("category");
var submit=document.getElementById("submit");
var search=document.getElementById("search");
var titleSearch=document.getElementById("titleSearch");
var categorySearch=document.getElementById("categorySearch");
var deleteAll=document.getElementById("deleteAll");
var update=document.getElementById("update");
var deleteBtn=document.getElementById("delete"); 
var tbody=document.getElementById("tbody"); 
var span=document.getElementById("span");
var temp;
cout.style.color="blue";

//function total
function getTotal(){
  if(price.value != ""){
    total.innerHTML=(+price.value + +taxes.value + +ads.value)- +discount.value;
    total.style.backgroundColor="#040";
  }else{
    total.innerHTML="";
    total.style.backgroundColor="#a00d02"
  }
}
//function getData
 var Data;
 if(localStorage.product != null){
  Data=JSON.parse(localStorage.product);
 }else{
   Data=[];
     
 }
 submit.onclick=function(){
  
  var newObj={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:+(cout.value),
    category:category.value.toLowerCase(),
  }
  if(submit.innerHTML=="update"){
    Data[temp].title=title.value.toLowerCase();
Data[temp].price=price.value;
Data[temp].ads=ads.value;
   Data[temp].discount=discount.value;
Data[temp].taxes=taxes.value;
Data[temp].category=category.value.toLowerCase();
    submit.innerHTML="create";
    cout.style.display="block";
  }else{
  	if(newObj.title!=""&& newObj.price!=""){
  if(newObj.count>1){
  for(let j=0;j<newObj.count; j++){
   Data.push(newObj)
  }
  }else{
    Data.push(newObj)
  }
  }else{
alert("please enter the title and the price")
}
  }
 localStorage.setItem("product",JSON.stringify(Data));
  showData();
  clearData();
  getTotal();
 span.innerHTML=" ("+Data.length+")";
}
//showData
 function showData(){
  var table="";
  for(i=0;i<Data.length;i++){
    table+=`   <tr>
            <td>${i+1}</td>
            <td>${Data[i].title}</td>
            <td>${Data[i].price}</td>
            <td>${Data[i].taxes}</td>
            <td>${Data[i].ads}</td>
            <td>${Data[i].discount}</td>
            <td>${Data[i].total}</td>
            <td>${Data[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="dele(${i})">delete</button></td>
          </tr>`
  }
  tbody.innerHTML=table;
} 
showData();
//clearData
function clearData(){
  title.value="";
  price.value="";
  taxes.value="";
  ads.value="";
  cout.value="";
  category.value="";
  discount.value="";
}
function check(){
  if(tbody!=""){
     deleteAll.style.display="block"
   }else{
     deleteAll.style.display="none"
   }
}
check();
 deleteAll.onclick=function(){
    
  Data.splice(0);
  localStorage.clear();
  showData();
span.innerHTML=" ("+Data.length+")";
  }
  
 span.innerHTML=" ("+Data.length+")"
  
  function dele(k){
    Data.splice(k,1)
    localStorage.product=JSON.stringify(Data);
    showData();
    span.innerHTML=" ("+Data.length+")"
  }
 function updateData(j){
   title.value=Data[j].title;
   price.value=Data[j].price;
  taxes.value=Data[j].taxes;
   ads.value=Data[j].ads;
  discount.value=Data[j].discount;
   category.value=Data[j].category;
   scroll({
     top:0,
     behaviour:'smooth',
   })
   cout.style.display="none";
   submit.innerHTML="update";
   temp=j;
   getTotal();
 }
 var searchMoood="title";
 function getId(id){
 	search.focus();
 if(id=="titleSearch"){
 	search.style.color="blue";
     search.placeholder="search by title";
     searchMoood="title";
       }else{
     search.style.color="red";
      search.placeholder="search by category";
      searchMoood="category";
         }
        search.value="";
        showData();
 	}
 function getSearch(value){ 
 	var table="";
for(i=0;i<Data.length;i++){
if(Data[i].title.includes( value.toLowerCase())){
	table+=`   <tr>
            <td>${i+1}</td>
            <td>${Data[i].title}</td>
            <td>${Data[i].price}</td>
            <td>${Data[i].taxes}</td>
            <td>${Data[i].ads}</td>
            <td>${Data[i].discount}</td>
            <td>${Data[i].total}</td>
            <td>${Data[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="dele(${i})">delete</button></td>
          </tr>`
     }else if(   Data[i].category.includes( value.toLowerCase())){
table+=`   <tr>
            <td>${i+1}</td>
            <td>${Data[i].title}</td>
            <td>${Data[i].price}</td>
            <td>${Data[i].taxes}</td>
            <td>${Data[i].ads}</td>
            <td>${Data[i].discount}</td>
            <td>${Data[i].total}</td>
            <td>${Data[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="dele(${i})">delete</button></td>
          </tr>`
}
  }
  tbody.innerHTML=table;
}