"use client";
import { FormEvent, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Prvi task",
      completed: false,
    },
    {
      id: 2,
      title: "Drugi task",
      completed: true,
    },
  ]);
  const [title, setTitle] = useState<string>("");

  function addTask(e: FormEvent) {
    e.preventDefault();
    console.log("task");
  }

  function handleChangeTodo(todo: Todo) {
    console.log(todo);
  }

  function handleDeleteTodo(id: number) {
    console.log(id);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Todo Component</h1>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <label className="sr-only" htmlFor="taskTitle">
          Task title
        </label>
        <input
          type="text"
          id="taskTitle"
          className="border p-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title for task"
        />
        <button className="bg-blue-500 text-white px-4">Add task</button>
      </form>

      <ul className="">
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl">{todo.title}</h2>
              <label className="sr-only" htmlFor="taskChecked">
                Task title
              </label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleChangeTodo(todo)}
                id="taskChecked"
              />
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 border p-1 rounded cursor-pointer"
              >
                Delete Todo
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
// 33:43
