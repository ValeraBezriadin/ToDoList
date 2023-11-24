const todoInput = document.querySelector("#todo__input");
const todoBtn = document.querySelector(".todo__add");
const todoList = document.querySelector(".todo__list");

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo.id;
  li.classList.toggle("checked", todo.completed);
  li.innerHTML = `
      <input type="checkbox" class="checkbox" ${todo.completed ? "checked" : ""} />
      <span>${todo.text}</span>
      <button class="btn"><img src="./static/delete.svg" alt="delete"></button>
  `;
  return li;
}

function renderTodos() {
  todoList.innerHTML = "";

  savedTodos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });

  todoList.classList.toggle('show', savedTodos.length > 0);
}

todoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value !== "") {
    const todo = {
      id: Date.now().toString(),
      text: todoInput.value,
      completed: false,
    };

    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    todoInput.value = "";
    renderTodos();
    todoInput.focus();
  }
});

todoList.addEventListener("change", (e) => {
  if (e.target.classList.contains("checkbox")) {
    const li = e.target.closest("li");
    const id = li.dataset.id;
    const index = savedTodos.findIndex((todo) => todo.id === id);
    savedTodos[index].completed = e.target.checked;
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    setTimeout(() => {
      renderTodos();
      li.classList.toggle("checked", e.target.checked);
    }, 10);
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const li = e.target.closest("li");
    const id = li.dataset.id;
    savedTodos.splice(savedTodos.findIndex(todo => todo.id === id), 1);
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    setTimeout(() => {
      renderTodos();
    }, 10);
  }
});

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    todoBtn.click();
  }
});

renderTodos();