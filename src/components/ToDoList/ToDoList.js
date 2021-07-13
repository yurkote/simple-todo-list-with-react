import React from "react";
import PropTypes from "prop-types";
import styles from "./toDoList.module.css";
import ToDoItem from "../ToDoItem/ToDoItem";

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired
}

function ToDoList(props) {
  return (
    <ul className={styles.todolist}>
      {props.todos.map((todo, index) => {
        return <ToDoItem todo={todo} key={todo.id} index={index} onChecked={props.onToggle}/>;
      })}
    </ul>
  );
}

export default ToDoList;
