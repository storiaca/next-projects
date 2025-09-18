"use client";
import { FormEvent, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  function addTask(e: FormEvent) {
    e.preventDefault();
    console.log("task");
  }
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Todo Component</h1>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
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
            <div>
              <h2 className="text-xl">Todo Component</h2>
            </div>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
