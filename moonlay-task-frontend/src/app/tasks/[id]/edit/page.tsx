"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
  assignee_id: number;
};

type User = {
  id: number;
  name: string;
};

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/tasks`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((t: Task) => t.id === Number(id));
        setTask(found);
      });

    fetch(`http://127.0.0.1:8000/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const res = await fetch(`http://127.0.0.1:8000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to update task");
    }
  };

  if (!task) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <button onClick={() => router.back()} className="px-4 py-2 mb-4 rounded bg-gray-200 text-black hover:bg-gray-300">
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input className="w-full p-2 border rounded" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea className="w-full p-2 border rounded" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select className="w-full p-2 border rounded dark:bg-black dark:text-white" value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Deadline</label>
          <input type="datetime-local" className="w-full p-2 border rounded" value={task.deadline.split(".")[0]} onChange={(e) => setTask({ ...task, deadline: e.target.value })} />
        </div>

        <div>
          <label className="block font-medium">Assignee</label>
          <select className="w-full p-2 border rounded dark:bg-black dark:text-white" value={task.assignee_id} onChange={(e) => setTask({ ...task, assignee_id: Number(e.target.value) })}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">Update Task</button>
      </form>
    </main>
  );
}
