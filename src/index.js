import { legacy_createStore as createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// vanilla JS
// let count = 0;
// number.innerText = count;
// const updateText = () => {
//   number.innerText = count;
// };
// const handleAdd = () => {
//   count = count + 1;
//   updateText();
// };
// const handleMinus = () => {
//   count = count - 1;
//   updateText();
// };
// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

// redux Count

const Add = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case Add:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // } else {
  //   return count;
  // }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: Add });
};
const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

// redux TO DO LIST

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: Date.now() };
      return [...state, newTodoObj];
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};
const store = createStore(reducer);

const dispatchAddTodo = (text) => {
  store.dispatch(addToDo(text));
};
const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};
store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddTodo(toDo);
};

form.addEventListener("submit", onSubmit);
