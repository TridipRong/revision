class Todo{
    #items;
    #onstateUpdateCallback;
    constructor() {
        this.#items=[];
        this.#onstateUpdateCallback=null;
    }
    get items(){
        return this.#items;
    }
    addTodo(value){
        const item = {
         title:value,
         status:false,
     };
    return  fetch("https://json-server-mocker-masai.herokuapp.com/tasks",{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify(item)
     }).then((res)=>{
         
         console.log("success");
         return todo.getTodos();
     }).catch((res)=>{
 
     })
    
     }
    toggleStatus(id,newStatus){
       return  fetch("https://json-server-mocker-masai.herokuapp.com/tasks/" +id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status: newStatus,
            }),
        }).then((res)=>{
            
            console.log("success");
            return todo.getTodos();
        }).catch((res)=>{
    
        })
    }
    deletetTodo(id){
        return  fetch("https://json-server-mocker-masai.herokuapp.com/tasks/" +id,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
           
        }).then((res)=>{
            
            console.log("success");
            return todo.getTodos();
        }).catch((res)=>{
    
        })
    }
    getTodos(){
    return fetch("https://json-server-mocker-masai.herokuapp.com/tasks")
    .then((res)=>res.json())
    .then((res)=>{
    this.#items=res;
    this.stateUpdateEvent();
    })
    .catch((err)=>{});
    }

    stateUpdateEvent(){
    console.log("updated");
    if(this.#onstateUpdateCallback){
        this.#onstateUpdateCallback();
    }
    }
    addstatechangeCallback(func){
        this.#onstateUpdateCallback=func;
    }
    
}

const todo=new Todo();

// todo.getTodos().then(()=>{
//     console.log(todo.items);
//     renderList(todo.items);
// });
todo.addstatechangeCallback(function(){
renderList(todo.items);
console.log(todo.items);
});
todo.getTodos();    

function renderList(items){
    const target= document.getElementById("todo-item");
    const itemElements=items.map((item)=>createTodoCard(item));
    target.innerHTML=null;
    target.append(...itemElements);
}

function createTodoCard(item){
    const div= document.createElement("div");
    const title=document.createElement("p");
    const button=document.createElement("button");
    const delBtn=document.createElement("button");

    title.textContent=item.title;
    button.textContent=item.status;
    delBtn.textContent="delete"
    div.append(title,button,delBtn);
    button.addEventListener("click",()=>{
        todo.toggleStatus(item.id,!item.status);
    });
    delBtn.addEventListener("click",()=>{
        todo.deletetTodo(item.id);
    })
    return div;
}

window.addEventListener("load",()=>{
    const addBtn=document.getElementById("add-todo-btn");
    addBtn.addEventListener("click",()=>{
        const input=document.getElementById("todo-input");
        const text=input.value;
        todo.addTodo(text);
    });
});
