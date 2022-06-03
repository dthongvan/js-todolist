let btnAddtask = document.querySelector('button')
let taskName = document.querySelector('#content')
let tasks = getTaskFromLocalStorage()
var count = 0
var text = 'hello'

function onClickDeleteBtn(currentKey) {
    const btn = document.querySelectorAll("#btn");

    if (btn[currentKey].value === "incompleted") {
        btn[currentKey].value = "completed";
    } else {
        btn[currentKey].value = "incompleted";
    }
}

renderTasks(tasks)
btnAddtask.addEventListener('click', function() {
    if (!taskName.value) {
        alert(" enter job name, please !")
        return false
    }
    let taskId = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage()
    let task = { name: taskName.value }

    if (taskId == 0 || taskId) {
        tasks[taskId] = task
        this.removeAttribute('id')
    } else {
        tasks.push(task)
    }

    taskName.value = ''

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(tasks)
})

function renderTasks(tasks = []) {
    let content = '<ul>'
    tasks.forEach((task, index) => {
        content += ` <li> 
        <p> ${task.name} </p> 
        <div class = "button-edit">
        <input type="button"  onclick="onClickDeleteBtn(${index})" value="incompleted"  id="btn" />

        <button onclick='editTask(${index})'> <i class = "ti-pencil"> </i></button>
        <button onclick='deleteTask(${index})'> <i class = "ti-trash" > </i></button>
         </div> </li>`
    })
    content += '</ul>'
    document.querySelector('#result').innerHTML = content
}

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}

function editTask(id) {
    let tasks = getTaskFromLocalStorage()

    if (tasks.length > 0) {
        console.log(tasks[id])
        taskName.value = tasks[id].name
        btnAddtask.setAttribute('id', id)
    }
}

function deleteTask(id) {
    if (confirm('do you really want to delete ?')) {
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }
}