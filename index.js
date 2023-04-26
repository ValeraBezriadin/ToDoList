const todoInput = document.querySelector("#todo__input");
const todoBtn = document.querySelector(".todo__add");
const todoList = document.querySelector(".todo__list");

todoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const todo = document.createElement("li");
  todo.innerHTML = `
  <input type="checkbox" />
  <span>${todoInput.value}</span>
  <button>Видалити</button>
  `;
  todoList.appendChild(todo);
  console.log(todoInput.value);
  todoInput.value = "";
});
console.log(todoInput, todoBtn, todoList);
