class Employees {

    #currentpage
    #data

    get currentpage() {
        return this.#currentpage
    }

    get data() {
        return this.#data
    }


    adddata() {
        nextPage()
       
    }

}
var pageNumber = 1;
const emp = new Employees();
window.addEventListener("load", emp.adddata)

function newPages(items,a) {
    
    
    document.getElementById("emp-table").innerHTML = null;
    var d = document.createElement("div")
    d.innerText = "Total pages are :" + items.totalPages;

    var d1 = document.createElement("div")
    d1.innerText = "page number are :" + a;
    document.getElementById("emp-table").append(d,d1)
    items.data.map((item) => {

        var div = document.createElement("div");
        var image = document.createElement("img")
        var id = document.createElement("h3")
        var name = document.createElement("h1")
        var dept = document.createElement("h3")
        var gen = document.createElement("h3")
        var salary = document.createElement("h3")

        div.style.border = "1px solid blue"
       div.style.marginTop = "10px"
        image.src = item.image;
        id.innerText = item.id;
        name.innerText = item.name;
        dept.innerText = item.department;
        gen.innerText = item.gender;
        salary.innerText = item.salary;

        div.append(image, id, name, dept, gen, salary)

        document.getElementById("emp-table").append(div)
    })
pageNumber=pageNumber+1;
   
}



document.getElementById("page").addEventListener("click", nextPage)

function nextPage() {

   
    if (pageNumber > 7) {
        pageNumber = 1;
        
    }
    var url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${pageNumber}`
    
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
        
            newPages(res,pageNumber)
        })

}