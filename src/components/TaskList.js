import React from "react";

function TaskList({ tasks, toggleTask, deleteTask, filter }) {
  // Show messages depending on filter and tasks length
  if (tasks.length === 0) {
    if (filter === "all") {
      return <p>No tasks yet, add one above 👆</p>;
    } else {
      return <p>No tasks found</p>;
    }
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            onClick={() => toggleTask(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
