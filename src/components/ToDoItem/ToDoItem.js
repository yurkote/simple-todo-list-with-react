import React, {useContext} from "react";
import styles from "./toDoItem.module.css";
import PropTypes from "prop-types";
import Context from "../../context";

ToDoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onChecked: PropTypes.func.isRequired,
  index: PropTypes.number,
};

function ToDoItem({ todo, index, onChecked }) {
  const {removeTodo} = useContext(Context);
  function checked() {
    if (todo.completed) {
      return styles.done;
    }
  }

  return (
    <>
      <li className={styles.li}>
        <span className={checked()}>
          <input
            className={styles.inp}
            type="checkbox"
            onChange={() => onChecked(todo.id)}
            checked ={todo.completed}
          />
          <strong>{index + 1}</strong>
          &nbsp;
          {todo.title}
        </span>

        <button className={styles.btn} onClick={removeTodo.bind(null, todo.id)}>&times;</button>
      </li>
    </>
  );
}

export default ToDoItem;
