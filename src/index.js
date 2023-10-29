import './styles/style.css';
import { domManipulator } from './functions';

console.log('working');

export const toDoList = [];

export let projectList = ['All'];

export let projectArray = [];

function toDo(checkBox, task, details, dueDate) {
    return {
        checkBox,
        task,
        details, 
        dueDate
    }
}

function makeLocalSave() {
    for (let i = 0; i < projectList.length - 1; i++) {
        
        if (!localStorage.getItem(`data${i}`)) {
        localStorage.setItem(`data${i}`, '[]')
        } 
    }
    

    
    //array = JSON.parse(localStorage.getItem('data'));
}

function makeLocalProjectSave() {
    if (!localStorage.getItem("projectData")) {
        localStorage.setItem("projectData", `['All']`)
    } 
    
}

export function saveData() {
    for (let i = 0; i < projectArray.length; i++) {
        localStorage.setItem(`data${i}`, JSON.stringify(projectArray[i]));
    }
}

function saveProjectData() {
    localStorage.setItem('projectData', JSON.stringify(projectList));
}

function viewData() {
    for (let i = 0; i < projectList.length - 1; i++) {
        projectArray[i] = JSON.parse(localStorage.getItem(`data${i}`));
    }
}

function viewProjectData() {
    if (localStorage.getItem('projectData')){
        projectList = JSON.parse(localStorage.getItem('projectData'));
    }
}
viewProjectData();
viewData();


    
export function addToDo(array) {
    const toDoCheckBox = 'checkBox';
    const toDoTask = document.getElementById("toDoTask").value
    const toDoDetails = document.getElementById("toDoDetails").value
    const toDoDueDate = document.getElementById("toDoDueDate").value
    const toDoPriority = document.getElementById("toDoPriority").value

    const listItem = toDo(toDoCheckBox, toDoTask, toDoDetails, toDoDueDate, toDoPriority)

    array.push(listItem);
    makeLocalSave(array);
    saveData();
}

export function editToDo(e, array) {
    const toDoCheckBox = 'checkBox';
    const toDoTask = document.getElementById("toDoTask").value
    const toDoDetails = document.getElementById("toDoDetails").value
    const toDoDueDate = document.getElementById("toDoDueDate").value
    const toDoPriority = document.getElementById("toDoPriority").value

    const listItem = toDo(toDoCheckBox, toDoTask, toDoDetails, toDoDueDate, toDoPriority)

    const element = e.target;
    let i = element.parentElement.dataset.index;
    const newValue = listItem;
    array[i] = newValue;
    makeLocalSave(array);
    saveData(array);
}

export function addProject() {
    const toDoProject = document.getElementById("toDoProject").value

    projectList.push(toDoProject);
    console.log(projectList);

    projectArray.push([]);
    console.log(projectArray);
    
    makeLocalProjectSave();
    saveProjectData();
    console.log(projectArray[0])
}


domManipulator.renderProjectList();