"use client";

import { useState } from "react";
import { nanoid } from "nanoid";

import Form from "./Form";
import Todo from "./Todo";

export default function GetAllTodos(props: any) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id: any) {
    const updatedTasks = tasks.map((task: { id: any; completed: any }) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: any) {
    const remainingTasks = tasks.filter((task: { id: any }) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks.map((task: { id: any; name: any; completed: any }) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  function addTask(name: any) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>taskwallet</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception my-5"></div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
