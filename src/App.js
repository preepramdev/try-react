import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const LOCAL_STORAGE_KEY = 'todoApp.todos';

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(_todo => _todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo() {
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

  function handleClearCompleteTodo() {
    const uncompleteTodos = todos.filter(todo =>
      todo.complete === false
    );
    setTodos(uncompleteTodos);
  }

  function calculateUncompleteTodo() {
    const uncompleteTodos = todos.filter(todo =>
      todo.complete === false
    );
    return uncompleteTodos.length;
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearCompleteTodo}>Clear Completed Todos</button>
      <div>{calculateUncompleteTodo()} left to do</div>
    </>
  )
}

export default App;
