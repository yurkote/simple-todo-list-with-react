import React, { useState, useEffect } from "react";
import "../css/style.css";
import ToDoList from "./ToDoList/ToDoList";
import Context from "../context";
// import AddTodo from "./AddTodo/AddTodo";
import Loader from "./Loader/Loader";

//lazy load and dynamic import
// const AddTodo = React.lazy(() => import("./AddTodo/AddTodo"));

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./AddTodo/AddTodo"));
      }, 900);
    })
);

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 500);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React Simple Todo List</h1>
        <React.Suspense fallback="Loading...">
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <ToDoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
