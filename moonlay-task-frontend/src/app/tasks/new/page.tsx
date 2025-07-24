"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
};

export default function CreateTaskPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [deadline, setDeadline] = useState("");
  const [assigneeId, setAssigneeId] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetch("http://127.0.0.1:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status,
      deadline,
      assignee_id: assigneeId,
    };

    const res = await fetch("http://127.0.0.1:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newTask),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to create task");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <button onClick={() => router.back()} className="px-4 py-2 mb-4 rounded bg-gray-200 text-black hover:bg-gray-300">
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input type="text" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select className="w-full p-2 border rounded dark:bg-black dark:text-white" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Deadline</label>
          <input type="datetime-local" className="w-full p-2 border rounded" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </div>

        <div>
          <label className="block font-medium">Assignee</label>
          <select className="w-full p-2 border rounded dark:bg-black dark:text-white" value={assigneeId} onChange={(e) => setAssigneeId(Number(e.target.value))}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Task
        </button>
      </form>
    </main>
  );
}
