let selectedpage;
let pageCounting;
function Previouspage(){
    if(selectedpage>1){
        selectedpage--;
        showInTable(selectedpage);
    }
}
function Nextpage(){
    if(selectedpage<pageCounting){
        selectedpage++;
        showInTable(selectedpage);
    }
}
function showInTable(currentPage){
    let viewrecords=JSON.parse(localStorage.getItem("sortpurpose"));
    let table = document.getElementById('mytable');
    table.innerHTML="";
    currentPage--;
    let from_start_this_data = 5 * currentPage;
	let till_end_this_data = from_start_this_data + 5;
	let paginatedItems = viewrecords.slice(from_start_this_data, till_end_this_data);
    for (let i = 0; i < paginatedItems.length; i++) {
        let row = `<tr>
                     <td>${paginatedItems[i].enteredname}</td>
                     <td>${paginatedItems[i].enteredage}</td>
                     <td>${paginatedItems[i].enteredmark}</td>`
        table.innerHTML += row
    }
    SetupPagination(viewrecords,currentPage);
}
function SetupPagination(details,current_page){
   const pagination_element = document.getElementById('pagination');
    pagination_element.innerHTML="";
     pageCounting = Math.ceil(details.length / 5);
	for (let i = 1; i <= pageCounting; i++) {
		let numberbutton = SetPageButton(i,current_page);
		pagination_element.appendChild(numberbutton);
	}
}
function SetPageButton(pagenumber,current_page){
     let button=document.createElement('button');
     button.innerText=pagenumber;
     button.addEventListener('click', function(){
        current_page=pagenumber;
        showInTable(current_page);
        selectedpage=current_page;
     });
     return button;
}


function  Plusdo(){
    let name=document.getElementById("Name").value;
    let age=document.getElementById("age").value;
    let mark=document.getElementById("mark").value;
    if(name!="" && age!="" && mark!=""){
        let values=JSON.parse(localStorage.getItem("enteredvalues"));
        if(values==null){
            data=[];
        }
        else{
            data=values;
        }
        data.push({enteredname: name,enteredage: age,enteredmark: mark});
        localStorage.setItem("enteredvalues",JSON.stringify(data));
       localStorage.setItem("sortpurpose",JSON.stringify(data));
        document.getElementById("Name").value="";
        document.getElementById("age").value="";
        document.getElementById("mark").value="";
        let after_store_data=JSON.parse(localStorage.getItem("enteredvalues"));
        let show_in_div=document.getElementById("inputdata");
        let to_display='';
        for(let i=0;i<after_store_data.length;i++){
              to_display+=`<div class="textcontainer display-column"><input type="text" value=${after_store_data[i].enteredname}>
                        <input type="text" value=${after_store_data[i].enteredage}>
                        <input type="text" value=${after_store_data[i].enteredmark}>
                        <input type="button" value="-" class="minusbtn" id="del_the_record" onclick=onDelete(${i})></div>`
                        
        }
        show_in_div.innerHTML=to_display;
    }
}
function onDelete(index){
    let records=JSON.parse(localStorage.getItem("enteredvalues"));
    records.splice(index,1);
    localStorage.setItem("enteredvalues",JSON.stringify(records));
    localStorage.setItem("sortpurpose",JSON.stringify(records));
    let afterdelete_store_data=JSON.parse(localStorage.getItem("enteredvalues"));
    let afterdelete_show_in_div=document.getElementById("inputdata");
    let to_display='';
    for(let i=0;i<afterdelete_store_data.length;i++){
          to_display+=`<input type="text" value=${afterdelete_store_data[i].enteredname}>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <input type="text" value=${afterdelete_store_data[i].enteredage}>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <input type="text" value=${afterdelete_store_data[i].enteredmark}>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <input type="button" value="-" id="del_the_record" onclick=onDelete(${i})><br>`
    }
    afterdelete_show_in_div.innerHTML=to_display;
}
function clearAllData(){
    if (confirm('if you want to clear all data ?')) {
        localStorage.clear();
        let after_store_data=JSON.parse(localStorage.getItem("sortpurpose"));
        if(after_store_data==null){
            data=[];
        }
       else{
            data=after_store_data;
        }
        let show_in_div=document.getElementById("inputdata");
        let to_display='';
        data.forEach((details,index) => {
            to_display+=`<input type="text" value=${details.enteredname}>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <input type="text" value=${details.enteredage}>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <input type="text" value=${details.enteredmark}>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                         <input type="button" value="-" id="del_the_record" onclick=onDelete(${index})><br>`
        });
        show_in_div.innerHTML=to_display;
        let table = document.getElementById('mytable');
        data.forEach((details,index)=>{
            to_display+=`<tr>
            <td class="table-cell">${viewrecords[i].enteredname}</td>
            <td class="table-cell">${viewrecords[i].enteredage}</td>
            <td class="table-cell">${viewrecords[i].enteredmark}</td></tr>`
        })
        table.innerHTML=to_display;
        let getpagebtn=document.getElementById('pagination');
        getpagebtn.remove();
    }

}
let sortagedirection=false;
function sortage(){
    sortagedirection=!sortagedirection;
let arraydata=JSON.parse(localStorage.getItem("sortpurpose"));
if(sortagedirection==false){
    arraydata.sort(function (x,y){
        return parseInt(y.enteredage)-parseInt(x.enteredage);
   });
   localStorage.setItem("sortpurpose",JSON.stringify(arraydata));
       showInTable(1);
}
else{
    arraydata.sort(function (x,y){
        return parseInt(x.enteredage)-parseInt(y.enteredage);
   });
   localStorage.setItem("sortpurpose",JSON.stringify(arraydata));
       showInTable(1);
}
}
let sortnamedirection=true;
function sortname(){
    sortnamedirection=!sortnamedirection;
    let arraydata=JSON.parse(localStorage.getItem("sortpurpose"));
    if(sortnamedirection==true){
        arraydata.sort(function (x,y){
            if(x.enteredname.toUpperCase()>y.enteredname.toUpperCase()) return -1;
            if(x.enteredname.toUpperCase()<y.enteredname.toUpperCase()) return 1;
            return 0;
       });
       localStorage.setItem("sortpurpose",JSON.stringify(arraydata));
           showInTable(1);
    }
    else{
        arraydata.sort(function (x,y){
            if(x.enteredname.toUpperCase()<y.enteredname.toUpperCase()) return -1;
            if(x.enteredname.toUpperCase()>y.enteredname.toUpperCase()) return 1;
            return 0;
       });
       localStorage.setItem("sortpurpose",JSON.stringify(arraydata));
           showInTable(1);
    }
}
let sortmarkdirection=false;
function sortmark(){
    sortmarkdirection=!sortmarkdirection;
    let arraydata=JSON.parse(localStorage.getItem("sortpurpose"));
if(sortmarkdirection==false){
    arraydata.sort(function (x,y){
        return parseInt(y.enteredmark)-parseInt(x.enteredmark);
   });
   localStorage.setItem("sortpurpose",JSON.stringify(arraydata));
       showInTable(1);
}
else{
    arraydata.sort(function (x,y){
        return parseInt(x.enteredmark)-parseInt(y.enteredmark);
   });
   localStorage.setItem("sortpurpose",JSON.stringify(arraydata));
       showInTable(1);
}
}






