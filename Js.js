let taske = document.querySelector(".taske");
let button = document.querySelector(".btn");
let addTaskes = document.querySelector(".addtaskes");
let listArry =[]


//chek If Theres Tasks In Local Storage
if(localStorage.getItem("task")){
    listArry = JSON.parse(localStorage.getItem("task"));
}
getDataFromLocalStorge()

// add Task
button.addEventListener("click", function(){
    if(taske.value !== ""){
        addTaskeToArray(taske.value);
        taske.value = "";
    }
    function addTaskeToArray(tasksText){
        const taskObject={
            id : Date.now(),
            title:tasksText,
            complited : false,
        }
        listArry.push(taskObject);
        addElementToPage(listArry);
        addToLocaleStorge(listArry);
    }
});
    
function addElementToPage(listArry){
    addTaskes.innerHTML = "";
    listArry.forEach(taskObject => {
    let div = document.createElement("div");
    div.className = "taskes";
    div.setAttribute("data-id",taskObject.id);
    let p = document.createElement("p")
    p.className = "tas"
    p.appendChild(document.createTextNode(taskObject.title))
    div.appendChild(p)
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delet"))
    div.appendChild(span);
    addTaskes.appendChild(div)
    });
}
function addToLocaleStorge(listArry){
    window.localStorage.setItem("task",JSON.stringify(listArry));
}

function getDataFromLocalStorge(){
    let data = window.localStorage.getItem("task");
    if(data){
    let taskess = JSON.parse(data)
        addElementToPage(taskess)
    }
}
document.addEventListener("click",function(e){
    if(e.target.className === 'delete'){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
    e.target.parentNode.remove();
}
    });
document.addEventListener('click' , function(complitedTask){
    if(complitedTask.target.className === "tas"){
        complitedTask.target.classList.toggle("complited");
    }         
}) ;


function deleteTaskWith(taskId){
    listArry = listArry.filter((task)=>task.id!= taskId);
    addToLocaleStorge(listArry);

}

       