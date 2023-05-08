const todoInput = document.querySelector("#todo__input");
const todoBtn = document.querySelector(".todo__add");
const todoList = document.querySelector(".todo__list");
// const checkbox = document.querySelectorAll(".checkbox");

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(savedTodos);
savedTodos.forEach((todo) => {
  const li = document.createElement("li");
  todo.completed ? li.classList.add("span") : li.classList.remove("span");
  li.innerHTML = `
        <input type="checkbox"  class="checkbox " ${
          todo.completed ? "checked" : ""
        } />
        <span >${todo.text}</span>
        <button class="btn">Видалити</button>
        `;
  todoList.appendChild(li);
});

todoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value !== "") {
    const todo = {
      text: todoInput.value,
      completed: false,
    };
    let li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="checkbox" />
        <span>${todoInput.value}</span>
        <button>Видалити</button>
        `;
    todoList.appendChild(li);
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    todoInput.value = "";
  }
});
todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const li = e.target.parentNode;
    const index = Array.prototype.indexOf.call(todoList.children, li);
    savedTodos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    li.remove();
  } else if (e.target.tagName === "INPUT") {
    const li = e.target.parentNode;
    const index = Array.prototype.indexOf.call(todoList.children, li);
    savedTodos[index].completed = e.target.checked;
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    // li.classList.toggle("span");
    // console.log("checkbox", checkbox);
    // checkbox.forEach((i) => {
    //    i.checked ? i.classList.add("span") : i.classList.remove("span");
    //   i.checked ? console.log("true") : console.log("flase");
    // });
    // if (e.target.checked) {
    //   span.style.textDecoration = "line-through";
    // } else {
    //   span.style.textDecoration = "none";
    // }
    const input = e.target.checked;
    console.log(input);
    input ? li.classList.add("span") : li.classList.remove("span");
  }
});
