import { toDoList, addToDo, editToDo, projectList, addProject, projectArray, 
    updateToDoList, saveData } from ".";
import editIcon from './images/file-edit.svg';
import binIcon from './images/delete.svg';

export const domManipulator = (function () {

    

    function renderToDoList(array) {
        let i = 0;
        for (let toDo of array) {
            const container = document.querySelector('#main');  
            
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = i
            i += 1;
            container.appendChild(card);

            const checkBox = document.createElement('div');
            checkBox.classList.add(toDo.checkBox);
            checkBox.addEventListener('click', e => checkBoxFunction(e, array));
            card.appendChild(checkBox);

            const task = document.createElement('p');
            task.classList.add('task');
            task.textContent = toDo.task;
            card.appendChild(task);

            const details = document.createElement('div');
            details.classList.add('details');
            details.textContent = 'Details';
            details.addEventListener('click', e => 
            displayDetails(toDo.task, toDo.details, toDo.dueDate))
            card.appendChild(details);

            const dueDate = document.createElement('div');
            dueDate.classList.add('dueDate');
            dueDate.textContent = toDo.dueDate;
            card.appendChild(dueDate);

            
            const edit = document.createElement('img');
            edit.classList.add('edit');
            edit.src = editIcon;
            edit.addEventListener('click', e => 
            editForm(toDo.task, toDo.details, toDo.dueDate))
            edit.addEventListener('click', e => showEditForm(e, array));
            card.appendChild(edit);
            

            const bin = document.createElement('img');
            bin.classList.add('bin');
            bin.src = binIcon;
            bin.addEventListener('click', e => deleteToDo(e, array));
            card.appendChild(bin);
        }
        
        
        const container = document.querySelector('#main');
        
        const addTaskButton = document.createElement('button');
        addTaskButton.classList.add('addTaskButton');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.addEventListener('click', e => showForm(array));

        container.appendChild(addTaskButton); 
        
       
    }

    function renderProjectList() {
        let i = 0;
        for (let project of projectList) {
            const container = document.querySelector('.sidebar');  

            const projectTitle = document.createElement('p');
            projectTitle.classList.add('task');
            projectTitle.dataset.index = i
            projectTitle.textContent = project;
            projectTitle.addEventListener('click', e => clear('#main'));
            container.appendChild(projectTitle);
            console.log(i)
            if (i===0) {
                //projectTitle.addEventListener('click', updateToDoList);
                // projectTitle.addEventListener('click', e => 
                // renderToDoList(toDoList));
                projectTitle.addEventListener('click', e => {
                    for (let i = 0; i < projectArray.length; i++) {
                        const container = document.querySelector('#main');  
                        const projectTitleCard = document.createElement('div');
                        projectTitleCard.classList.add('card');
                        projectTitleCard.textContent = projectList[i+1]
                        container.appendChild(projectTitleCard);
                        renderToDoList(projectArray[i]);
                    }
                })
                

            } else {
                console.log(projectArray)
                projectTitle.addEventListener('click', e => 
                renderToDoList(projectArray[projectTitle.dataset.index - 1]));
            }
            i += 1;
        }
        const container = document.querySelector('.sidebar');
        
        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('addProjectButton');
        addProjectButton.textContent = '+';
        addProjectButton.addEventListener('click', e => 
        showProjectForm());
        container.appendChild(addProjectButton);
    }

    function clear(id) {
        const container = document.querySelector(id);
        while (container.firstChild) {
        container.removeChild(container.firstChild);
        }
    }

    function clearForm() {
        document.getElementById("toDoTask").value = '';
        document.getElementById("toDoDetails").value = '';
        document.getElementById("toDoDueDate").value = '';
        document.getElementById("toDoPriority").value = '';
        document.getElementById("toDoProject").value = '';
    }

    function editForm(task, details, date) {
        document.getElementById("toDoTask").value = task;
        document.getElementById("toDoDetails").value = details;
        document.getElementById("toDoDueDate").value = date;
    }

    function deleteToDo(e, array) {
        const element = e.target;
        console.log(element.parentElement.dataset.index);
        let i = element.parentElement.dataset.index;
        array.splice(i, 1);
        clear('#main');
        renderToDoList(array);
        saveData()
    }

    function checkBoxFunction(e, array) {
        const element = e.target;
        let i = element.parentElement.dataset.index;
        if (e.target.classList.value === 'checkBox') {
            e.target.classList.value = 'checkBoxTicked';
            array[i].checkBox = 'checkBoxTicked';

        } else if (e.target.classList.value === 'checkBoxTicked') {
            e.target.classList.value = 'checkBox';
            array[i].checkBox = 'checkBox';
        }
        saveData();
    }

    function showForm(array) {
        document.getElementById('formElement').style.display = 'block';
        document.getElementById('formBackground').style.display = 'block';

        const container = document.querySelector('#formElement');  
            
        const addButton = document.createElement('button');
        addButton.type = "button";
        addButton.setAttribute('id', 'addButton');
        addButton.textContent = 'Submit';
        addButton.addEventListener('click', e => addToDo(array));
        addButton.addEventListener('click', clearForm)
        addButton.addEventListener('click', e => clear('#main'));
        addButton.addEventListener('click', e => renderToDoList(array));
        addButton.addEventListener('click', hideForm);
        container.appendChild(addButton);

        const cancelButton = document.createElement('button');
        cancelButton.type = "button";
        cancelButton.setAttribute('id', 'cancelButton');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', hideForm);
        cancelButton.addEventListener('click', clearForm)
        container.appendChild(cancelButton);
    }

    function hideForm() {
        document.getElementById('formElement').style.display = 'none';
        document.getElementById('formBackground').style.display = 'none';

        const addButton = document.getElementById('addButton');
        addButton.remove();
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.remove();
    }

    function showEditForm(event, array) {
        document.getElementById('formElement').style.display = 'block';
        document.getElementById('formBackground').style.display = 'block';

        const container = document.querySelector('#formElement');

        const editButton = document.createElement('button');
        editButton.type = "button";
        editButton.setAttribute('id', 'editButton');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', e => editToDo(event, array));
        editButton.addEventListener('click', clearForm)
        editButton.addEventListener('click', e => clear('#main'));
        editButton.addEventListener('click', e => renderToDoList(array));
        editButton.addEventListener('click', hideEditForm);
        container.appendChild(editButton);

        const cancelButton = document.createElement('button');
        cancelButton.type = "button";
        cancelButton.setAttribute('id', 'cancelButton');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', hideEditForm);
        container.appendChild(cancelButton);
    }

    function hideEditForm() {
        document.getElementById('formElement').style.display = 'none';
        document.getElementById('formBackground').style.display = 'none';

        const editButton = document.getElementById('editButton');
        editButton.remove();
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.remove();
    }

    function showProjectForm(array) {
        document.getElementById('projectFormElement').style.display = 'block';
        document.getElementById('formBackground').style.display = 'block';

        const container = document.querySelector('#projectFormElement');  
            
        const addButton = document.createElement('button');
        addButton.type = "button";
        addButton.setAttribute('id', 'addButton');
        addButton.textContent = 'Submit';
        addButton.addEventListener('click', addProject);
        addButton.addEventListener('click', clearForm)
        addButton.addEventListener('click', e => clear('.sidebar'));
        addButton.addEventListener('click', e => renderProjectList());
        addButton.addEventListener('click', hideProjectForm);
        // addButton.addEventListener('click', e => clear('#main'));
        // addButton.addEventListener('click', e => renderToDoList());
        container.appendChild(addButton);

        const cancelButton = document.createElement('button');
        cancelButton.type = "button";
        cancelButton.setAttribute('id', 'cancelButton');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', hideProjectForm);
        cancelButton.addEventListener('click', clearForm)
        container.appendChild(cancelButton);
    }

    function hideProjectForm() {
        document.getElementById('projectFormElement').style.display = 'none';
        document.getElementById('formBackground').style.display = 'none';

        const addButton = document.getElementById('addButton');
        addButton.remove();
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.remove();
    }

    function displayDetails(task, details, date) {
        clear('#displayDetails');

        const container = document.querySelector('#displayDetails');
        
        const card = document.createElement('div');
        card.classList.add('detailsCard');
        container.appendChild(card);

        const displayTask = document.createElement('div');
        displayTask.classList.add('displayTask');
        displayTask.textContent = 'Task: ' + task;
        card.appendChild(displayTask);

        const displayDetails = document.createElement('div');
        displayDetails.classList.add('displayDetails');
        displayDetails.textContent = 'Details: ' + details;
        card.appendChild(displayDetails);
        
        const displayDueDate = document.createElement('div');
        displayDueDate.classList.add('displayDueDate');
        displayDueDate.textContent = 'Date due: ' + date;
        card.appendChild(displayDueDate);

        const closeDetails = document.createElement('button');
        closeDetails.classList.add('closeDetails');
        closeDetails.textContent = 'close';
        closeDetails.addEventListener('click', e => 
        clear('#displayDetails'));
        card.appendChild(closeDetails);
    }

    return {
        renderToDoList,
        renderProjectList,
        clear,
        showForm,
        hideForm,
        showProjectForm,
        clearForm
        
    }
})();