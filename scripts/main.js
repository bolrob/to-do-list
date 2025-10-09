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
    console.log(todoItems);
}

function printItems(todoItems){
    const container = document.querySelector(".print-container");
    todoItems.entries().forEach(renderItem.bind(null, container));
}

function renderItem(printContainer, [id, {value}]) {
    const item = document.createElement("div");
    const elementExists = printContainer.querySelector(`[id="${id}"]`);
    if (elementExists) {
        return;
    }
    item.setAttribute("id", id);
    item.setAttribute("class", "todo-item");
    const text = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    text.setAttribute("class", "item-text");
    editButton.setAttribute("class", "item-edit-button");
    deleteButton.setAttribute("class", "item-delete-button");
    text.textContent = value;
    editButton.textContent = "Редактировать";
    deleteButton.textContent = "Удалить";
    item.appendChild(text)
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    printContainer.append(item);
    
}

const form = document.querySelector(".todo-form");
form.addEventListener("submit", submit);