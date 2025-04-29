import { Project } from './project.js';
import { Storage } from './storage.js';
import {Todo} from './todos.js';

const modalOverlay = document.getElementById('modal-overlay');
const todoOverlay = document.getElementById('todo-modal-overlay')
const modalContent= document.getElementById('modal-content');
const todoContent = document.getElementById('todo-content')
const errorMessage = document.getElementById('error-message');
const taskNameError = document.getElementById('taskname-error-message');
const deadlineError = document.getElementById('deadline-error-message');
const projectName = document.getElementById('projectName');
const todoName = document.getElementById('todoName');
const todoPriority = document.getElementById('taskPriority');
const todoDeadline = document.getElementById('todoDeadlline')
const noproject=document.querySelector('.no-project');
const notask = document.querySelector('.no-task');
const todos=document.querySelector('.todos')
const ul = document.querySelector('.project-list');
const ultask = document.querySelector('.todo-list')
let selectedProject = null;

document.addEventListener('DOMContentLoaded',()=>{
    loadProject();
})

document.querySelector('.add-project').addEventListener('click',()=>{
    modalOverlay.style.display = "flex";
    modalContent.style.display = "flex";
})  

document.querySelector('#closeModal').addEventListener('click',()=>{
    modalOverlay.style.display = "none";
    modalContent.style.display = "none";
    errorMessage.style.display="none";
    //reset styling properties 
    projectName.style.border="";
    projectName.style.boxShadow ="";
    projectName.value="";
})

document.querySelector('#saveProject').addEventListener('click',()=>{
    // const newProject= new Project()
    const name = document.querySelector('#projectName').value;
    if (name == ""){
        errorMessage.style.display="flex";
        projectName.style.border="0.2rem,#e65100d1,solid";
        projectName.style.boxShadow ="0 0 0.15rem #e65100";
    }
    else{
        const project = new Project(name);
        Storage.save(project.id, project)
        renderProject(JSON.stringify(project));
        modalOverlay.style.display = "none";
        modalContent.style.display = "none";
        errorMessage.style.display="none";
        noproject.style.display="none"
        //reset styling properties 
        projectName.style.border="";
        projectName.style.boxShadow ="";
        projectName.value="";
    }
})

document.querySelector(".add-todos").addEventListener('click',()=>{
    todoOverlay.style.display="flex"
    todoContent.style.display="flex"
    notask.style.display="none"
})

document.querySelector("#closeTodo").addEventListener('click',()=>{
    todoOverlay.style.display="none"
    todoContent.style.display="none"
    todoName.value="";
    todoName.style.border="";
    todoName.style.boxShadow=""
    todoPriority.value="High";
    todoPriority.style.border="";
    todoPriority.style.boxShadow=""
    todoDeadline.value=""
    todoDeadline.style.border=""
    todoDeadline.style.boxShadow=""
    taskNameError.style.display ="none"
    deadlineError.style.display="none"
})

document.querySelector("#saveTodo").addEventListener('click',()=>{
    if (todoName.value == ""||todoDeadline.value==""){
        if(todoName.value=="" && todoDeadline.value==""){
            taskNameError.style.display ="flex"
            todoName.style.border="0.2rem,#e65100d1,solid";
            todoName.style.boxShadow="0 0 0.15rem #e65100"
            deadlineError.style.display="flex"
            todoDeadline.style.border="0.2rem,#e65100d1,solid";
            todoDeadline.style.boxShadow="0 0 0.15rem #e65100"
        }
        else if (todoDeadline.value==""){
            deadlineError.style.display="flex"
            todoDeadline.style.border="0.2rem,#e65100d1,solid";
            todoDeadline.style.boxShadow="0 0 0.15rem #e65100"
            taskNameError.style.display ="none"
            todoName.style.border="";
            todoName.style.boxShadow=""
        }
        else{
            taskNameError.style.display ="flex"
            todoName.style.border="0.2rem,#e65100d1,solid";
            todoName.style.boxShadow="0 0 0.15rem #e65100"
            deadlineError.style.display="none"
            todoDeadline.style.border="";
            todoDeadline.style.boxShadow=""
        }
    }
    else{
        const todo = new Todo(todoName.value,todoDeadline.value,todoPriority.value,selectedProject.id)
        Storage.update(selectedProject.id,todo)
        renderTodo(JSON.parse(Storage.get(selectedProject.id)))
        todoOverlay.style.display="none"
        todoContent.style.display="none"
        todoName.value="";
        todoName.style.border="";
        todoName.style.boxShadow=""
        todoPriority.value="High";
        todoPriority.style.border="";
        todoPriority.style.boxShadow=""
        todoDeadline.value=""
        todoDeadline.style.border=""
        todoDeadline.style.boxShadow=""
        taskNameError.style.display ="none"
        deadlineError.style.display="none"
    }
})

function renderProject(project){
    const projectObj = JSON.parse(project);
    const li = document.createElement('li');
    const remove = document.createElement('button')
    const projectname = document.createElement('p')
    remove.innerHTML=`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
    projectname.textContent = projectObj.name;
    li.appendChild(remove)
    li.appendChild(projectname)
    li.classList.add('project-item');
    li.setAttribute('proj-id',projectObj.id)
    remove.classList.add('remove-project');
    ul.appendChild(li);
    remove.addEventListener('click',()=>{
        // prevents parent elements from also reacting (li)
        event.stopPropagation();
        li.remove()
        Storage.remove(projectObj.id)
        const projects = document.querySelectorAll('.project-item')
        if(projects.length<=0){
            noproject.style.display="flex"
            todos.style.display=""
            selectedProject=null
        }
        else{
            selectedProject = Storage.get(projects[0].getAttribute('proj-id'))
            renderSelectedProject(JSON.parse(selectedProject))
            projects[0].classList.add("active")
        }
    })
    li.addEventListener('click',()=>{
        const projects = document.querySelectorAll('.project-item')
        projects.forEach(element => {
            element.classList.remove("active")
        });
        li.classList.add("active")
        //selectedProject = projectObj
        selectedProject = JSON.parse(Storage.get(li.getAttribute('proj-id')));
        renderSelectedProject(selectedProject)
    })
}

function renderTodo(project){
    const todolist = project.todos
    ultask.innerHTML=""
    if(todolist.length>0){
        notask.style.display="none"
        for(let i=0;i<todolist.length;i++){
            const li = document.createElement('li')
            const label = document.createElement('label')
            const checkbox = document.createElement('input')
            const checkmark = document.createElement('span')
            const taskName = document.createElement('p')
            const priority = document.createElement('p')
            const remove = document.createElement('button')
            const div = document.createElement('div')
            li.classList.add('task-item')
            label.classList.add('task-item-checkbox')
            remove.classList.add('task-item-button')
            remove.innerHTML=`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#e65100dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
            remove.addEventListener('click',()=>{
                event.stopPropagation()
                const currentProject = JSON.parse(Storage.get(selectedProject.id))
                const todoIndex = currentProject.todos.findIndex(todo=>{
                    return todo.id === todolist[i].id
                })
                console.log(todoIndex)
                li.remove()
                Storage.removeTodo(currentProject.id,currentProject.todos[todoIndex].id)
                const allTodos = document.querySelectorAll('.task-item')
                if(allTodos.length==0){
                    notask.style.display="flex"
                }
            })
            checkmark.classList.add('checkmark')
            checkbox.type = "checkbox"
            checkbox.checked=todolist[i].completed
            checkbox.addEventListener('change',()=>{
                const currentProject = JSON.parse(Storage.get(selectedProject.id));
                const todoIndex = currentProject.todos.findIndex(todo => todo.id === todolist[i].id);
                if (todoIndex !== -1) {
                    currentProject.todos[todoIndex].completed = checkbox.checked;
                    Storage.save(selectedProject.id, currentProject);
                    selectedProject = currentProject;
                }
            })
            taskName.classList.add('task-item-name')
            taskName.textContent=todolist[i].title
            div.classList.add("priority-remove")
            priority.classList.add("task-item-priority")
            priority.textContent = todolist[i].priority
            if(priority.textContent == "High"){
                priority.style.backgroundColor="#FF746C"
            }
            else if (priority.textContent == "Medium"){
                priority.style.backgroundColor="#FFEE8C"
            }
            else{
                priority.style.backgroundColor="#80EF80"
            }
            ultask.append(li)
            li.append(label)
            label.append(checkbox)
            label.append(checkmark)
            label.append(taskName)
            li.append(div)
            div.append(priority)
            div.append(remove)
        }
    }
    else{
        notask.style.display="flex"
    }
}

function loadProject(){
    const projectKeys = Storage.getAllProject();
    if (projectKeys.length>0){
        for(let i=0; i<projectKeys.length;i++){
            const project = projectKeys[i]; //get key first
            renderProject(project)
        }
        noproject.style.display="none"
    }
    else{
        noproject.style.display="flex"
    }
}

function renderSelectedProject(project){
    if(project == null) return
    document.querySelector('.selected-project-name').textContent=project.name
    renderTodo(project)
    todos.style.display="flex"
}