'use strict';

const toDoForm = document.querySelector('.to-do-form');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const listContainer = document.querySelector('.to-do-list-box');
const formHeading = document.querySelector('.form-heading');
const editFormOverlay = document.querySelector('.edit-form-overlay ');
const editTitle = document.querySelector('#edit-title');
const editDescription = document.querySelector('#edit-description');
const cancelBtn = document.querySelector('.cancel-btn');
const editSave = document.querySelector('.edit-submit-btn');
let editBtn = document.querySelectorAll('.edit-task');
let deleteTaskBtn = document.querySelectorAll('.delete-task');
let toDoLists = [];



// Render to Do list
const renderList = (title, description) => {
    const html = `
        <div class="to-do-list">
                <div class="list-contnet">
                    <h4 class="to-do-title">${title}</h4>
                    <p class="to-do-description">${description}</p>
                </div>
                <div class="list-buttons">
                    <button class="edit-task list-btn btn"><i class="fas fa-pencil"></i></button>
                    <button class="btn list-btn delete-task"><i class="fas fa-trash"></i></button>
                </div>
                
        </div>
    `;

    listContainer.insertAdjacentHTML('beforeend', html);
    // redeclaring for upcoming new lists
    editBtn = document.querySelectorAll('.edit-task');
    deleteTaskBtn = document.querySelectorAll('.delete-task');
}


//Get Data from Local Storage
const getlocalStorage = () => {

    listContainer.innerHTML = '';
    const lists = JSON.parse(localStorage.getItem('toDoList'));
    console.log(lists)
    console.log(lists.length)
    
    //Guard
    if (lists.length === 0){
        listContainer.insertAdjacentHTML('beforeend', `
            <div style="color:#363636;text-align:center;">
                No tasks available, add into the list.
            </div>
        `);

        return
    }

    toDoLists = lists;
    toDoLists.forEach(item => {
        renderList(...item);
    });
}
// Initialized getting data
getlocalStorage();

// Clear Form
const clearForm = () => {
    titleInput.value = '';
    descriptionInput.value = '';
    editTitle.value = '';
    editDescription.value = '';
}

//Add to local storage
const setLocalStorage = (toDoLists) => {
    localStorage.setItem("toDoList", JSON.stringify(toDoLists));
}

// To do Form submit event
toDoForm.addEventListener('submit', (e) => {
    // e.preventDefault();

    var toDoItem = [];

    const title = titleInput.value;
    const description = descriptionInput.value;

    toDoItem.push(title);
    toDoItem.push(description);

    // Updating list array and local storage
    renderList(...toDoItem);
    toDoLists.push(toDoItem);
    setLocalStorage(toDoLists);

    clearForm();
});


//Edit Functionality
editBtn.forEach((item, i) => {
    item.addEventListener('click', function () {

        editFormOverlay.classList.remove('hide-form');

        const task = item.closest('.to-do-list');
        const title = task.querySelector('.to-do-title').textContent;
        const description = task.querySelector('.to-do-description').textContent;

        editTitle.value = title;
        editDescription.value = description;

        editSave.addEventListener('click', (e) => {
            // e.preventDefault();
            editList(i, editTitle.value, editDescription.value);
        });

        cancelBtn.addEventListener('click', function (e) {
            // e.preventDefault();
            editFormOverlay.classList.add('hide-form');
        });
    });
})


const editList = (i, newTitle, newDesc) => {

    toDoLists.splice(i, 1, [newTitle, newDesc]);
    setLocalStorage(toDoLists);

    editFormOverlay.classList.add('hide-form');
    getlocalStorage();
}

// task delete functionality
deleteTaskBtn.forEach((item, i) => {
    item.addEventListener('click', function (e) {
        location.reload();
        toDoLists.splice(i, 1);
        setLocalStorage(toDoLists);
        getlocalStorage();
    });
});

const reset = () => {
    localStorage.removeItem("toDoList");
    location.reload();
}

//item.closest('.to-do-list').childNodes[1].classList.contains('to-do-title')