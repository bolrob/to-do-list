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
    text.textContent = value;
    editButton.setAttribute("class", "item-edit-button");
    editButton.onclick = editItem;
    editButton.textContent = "Редактировать";
    deleteButton.setAttribute("class", "item-delete-button");
    deleteButton.onclick = deleteItem;
    deleteButton.textContent = "Удалить";
    item.appendChild(text);
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    printContainer.append(item);
}


function editItem(event) {
    event.preventDefault();
    const item = event.target.parentNode;
    const newItem = document.createElement("div");
    newItem.setAttribute("id", item.id);
    newItem.setAttribute("class", "todo-item");
    const input = document.createElement("input");
    const confirmButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    input.setAttribute("class", "edit-input");
    input.required = true;
    input.setAttribute("value", item.querySelector(".item-text").textContent)
    confirmButton.setAttribute("class", "item-confirm-edit-button");
    confirmButton.onclick = confirmEdit;
    confirmButton.textContent = "Подтвердить";
    cancelButton.setAttribute("class", "item-cancel-edit-button");
    cancelButton.onclick = cancelEdit;
    cancelButton.textContent = "Отменить";
    newItem.appendChild(input);
    newItem.appendChild(confirmButton);
    newItem.appendChild(cancelButton);
    item.replaceWith(newItem);
}

function confirmEdit(event) {
    event.preventDefault();
    const item = event.target.parentNode;
    const newItem = document.createElement("div");
    const todoItem = todoItems.get(parseInt(item.id));
    todoItem.value = item.querySelector(".edit-input").value;
    todoItems.set(item.id, todoItem);
    newItem.setAttribute("id", item.id);
    newItem.setAttribute("class", "todo-item");
    const text = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    text.setAttribute("class", "item-text");
    text.textContent = item.querySelector(".edit-input").value;
    editButton.setAttribute("class", "item-edit-button");
    editButton.onclick = editItem;
    editButton.textContent = "Редактировать";
    deleteButton.setAttribute("class", "item-delete-button");
    deleteButton.onclick = deleteItem;
    deleteButton.textContent = "Удалить";
    newItem.appendChild(text);
    newItem.appendChild(editButton);
    newItem.appendChild(deleteButton);
    item.replaceWith(newItem);
}

function cancelEdit(event) {
    const item = event.target.parentNode;
    const oldItem = todoItems.get(parseInt(event.target.parentNode.id));
    const newItem = document.createElement("div");
    newItem.setAttribute("id", event.target.parentNode.id);
    newItem.setAttribute("class", "todo-item");
    const text = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    text.setAttribute("class", "item-text");
    text.textContent = oldItem.value;
    editButton.setAttribute("class", "item-edit-button");
    editButton.onclick = editItem;
    editButton.textContent = "Редактировать";
    deleteButton.setAttribute("class", "item-delete-button");
    deleteButton.onclick = deleteItem;
    deleteButton.textContent = "Удалить";
    newItem.appendChild(text);
    newItem.appendChild(editButton);
    newItem.appendChild(deleteButton);
    item.replaceWith(newItem);
}


function deleteItem(event) {

}


const form = document.querySelector(".todo-form");
form.addEventListener("submit", submit);