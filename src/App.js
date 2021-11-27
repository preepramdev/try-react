import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const LOCAL_STORAGE_KEY = 'todoApp.todos';

  // set todos if exist in local
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // save todos to local
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(_todo => _todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function addTodo() {
    const nameInput = todoNameRef.current.value;
    if (nameInput !== '') {
      setTodos(oldTodos => {
        const todoId = (oldTodos.length + 1);
        const newTodo = {
          id: todoId,
          name: nameInput,
          complete: false
        }
        return [...oldTodos, newTodo];
      });
      console.log(nameInput);
    }
  }

  function clearCompleteTodos() {
    const uncompleteTodos = todos.filter(todo =>
      todo.complete === false
    );
    setTodos(uncompleteTodos);
  }

  function calculateUncompleteTodos() {
    const uncompleteTodos = todos.filter(todo =>
      todo.complete === false
    );
    return uncompleteTodos.length;
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearCompleteTodos}>Clear Completed Todos</button>
      <div>{calculateUncompleteTodos()} left to do</div>
    </>
  )
}

export default App;
