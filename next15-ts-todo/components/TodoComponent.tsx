"use client";
import { useState } from "react";

type Todos = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [title, setTitle] = useState<string>("");
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl">Todo Component</h1>
      <form className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title"
        />
      </form>
    </div>
  );
}
