
const inp = document.getElementById('inp');
const btn = document.getElementById('addTodo')
const list = document.getElementById('list');


btn.onclick = (e)=>{

    const input= inp.value;

    // Check for empty input
    if(input=="") {
        alert("Empty field !!! ");
    } else {

        const li = document.createElement('li');
        li.innerText=input;
        
        
        const new_div = document.createElement('div');    
        new_div.classList.add('float-end');

        // Delete
        const delItem = document.createElement('i');
        delItem.classList.add('fas');
        delItem.classList.add('fa-trash-alt');
        delItem.classList.add('del-color');
        
        // Edit 
        const editItem = document.createElement('i');
        editItem.classList.add('fas');
        editItem.classList.add('fa-pencil-alt');
        editItem.classList.add('margin-between');
        editItem.classList.add('editItem-color');
        
        // Add Input
        list.append(li);
        li.append(new_div);
        new_div.append(editItem);
        new_div.append(delItem);
        inp.value ="";   
        
        // Delete Item Function
        delItem.onclick = (e)=>{
            li.remove();
        }

        //Edit Item
        editItem.onclick = (e)=>{
            inp.value = li.innerText;
            const temp = inp.value;
            li.remove();
        }
    }
}