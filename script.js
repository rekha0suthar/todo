const form = document.getElementById('form');
const inputValue = document.getElementById('input');
const addbutton = document.querySelector('.add-btn');
const todoList = document.getElementById('todos');
const todo = document.querySelector('.todo-item');

const API_URL = 'https://jsonplaceholder.typicode.com/todos/';

const todos = [];
const getTodos = () => {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < 10; i++) {
        todos.push(data[i]);
      }

      for (let item of todos) {
        addItemToList(item.title);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const addItemToList = (todoItem) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(todoItem));
  li.className = 'todo-item';
  todoList.appendChild(li);
};

const onSubmit = (e) => {
  e.preventDefault();
  const newTodo = inputValue.value;
  if (newTodo === '') {
    alert('this is empty');
    return;
  }
  addItemToList(newTodo);
  inputValue.value = '';
};

const onSelectList = (e) => {
  if (e.target.classList.contains('todo-item')) {
    e.target.classList.toggle('completed');
  }
};

const onDelete = (e) => {
  if (e.target.classList.contains('todo-item')) {
    const index = todos.indexOf(e.target.textContent);
    if (index > -1) {
      todos.splice(index, 1); // Remove from array
    }
    e.target.remove(); // Remove from DOM
  }
};

const init = () => {
  getTodos();
  form.addEventListener('submit', onSubmit);
  document.querySelector('#todos').addEventListener('click', onSelectList);
  todoList.addEventListener('dblclick', onDelete);
};

init();
