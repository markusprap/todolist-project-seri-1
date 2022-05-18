const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");

// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo(){
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let isCompleted = todos.status == "completed" ? "checked" : "";
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li><i class="uil uil-pen"></i>Edit</li>
                                <li><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        });
    }
    taskBox.innerHTML = li;
}

showTodo();

function showMenu(selectedTask){
    //getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    })
}

function updateStatus(selectedTask) {
   let taskName = selectedTask.parentElement.lastElementChild;
   if(selectedTask.checked) {
       taskName.classList.add('checked');
       //updating the status of selected task to completed
       todos[selectedTask.id].status = "completed";
   } else {
       taskName.classList.remove('checked');
       todos[selectedTask.id].status = "pending";
   }
   localStorage.setItem("todo-list", JSON.stringify(todos));
}



taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!todos){ //if todos isn't exist, pass an empty array to todos
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = {name: userTask, status: "pending"};
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
})