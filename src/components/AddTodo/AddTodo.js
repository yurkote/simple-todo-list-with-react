import React from "react";
import styles from "./addTodo.module.css";
import PropTypes from "prop-types";
import useInputValue from "../../hooks/useInputValue";

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

function AddTodo({ onCreate }) {
  const input = useInputValue('');

  function submitHandler(e) {
    e.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button className={styles.btn} type="submit">
        Add to do
      </button>
    </form>
  );
}

export default AddTodo;
