class Todo{
    #items;
    constructor() {
        this.#items=[];
    }
    get items(){
        return this.#items;
    }
    addTodo(value){
       const item = {id:value,
        text:value,
        status:false,
    };
       this.#items.push(item) ;
       return this.#items.length;
    }
    toggleStatus(id){
        this.#items =  this.#items.map((item)=>
        item.id === id ? {...item, status: !item.status } :  item
        );
    }

getTodos(){
return fetch("https://json-server-mocker-masai.herokuapp.com/tasks")
.then((res)=>res.json())
.then((res)=>{
   this.#items=res;
})
.catch((err)=>{});
}

}
const todo=new Todo();
// todo.addTodo("Tridip");
// todo.addTodo("Rong.map");
// todo.getTodos()
// todo.toggleStatus(todo.items[0].id);
todo.getTodos().then(()=>{
    console.log(todo.items);
    renderList(todo.items);
});
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


    title.textContent=item.title;
    button.textContent=item.status.toString();
    div.append(title,button);
    return div;
}

