const todoItems = new Map();
let id = 0;

function submit(event) {
    event.preventDefault();
    const item = event.target.querySelector(".todo-input");
    const value = item.value;
    todoItems.set(id++, {
        value,
        isDone: false
    });
    printItems(todoItems);
    item.value = "";
    console.log(todoItems)
}

function printItems(todoItems){
    const container = document.querySelector(".print-container");
    todoItems.entries().forEach(renderItem.bind(null, container));
}

function renderItem(printContainer, [id, {value}]) {
    const item = document.createElement("div");
    const elementExsists = printContainer.querySelector(`[id="${id}"]`)
    if (elementExsists) {
        return
    }
    item.setAttribute("id", id);
    item.textContent = value;
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    editButton.textContent = "Редактировать";
    deleteButton.textContent = "Удалить";
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    printContainer.append(item)
    
}

const form = document.querySelector(".todo-form");
form.addEventListener("submit", submit);