"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
  assignee_id: number;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } else {
      alert("Failed to delete task");
    }
  };

  return (
    <main className="p-6">
      <Link href="/tasks/new" className="inline-block mb-4 mr-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">
        + New Task
      </Link>
      <LogoutButton />
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded-md shadow-sm bg-white text-black">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
              <p>Assignee ID: {task.assignee_id}</p>
              <Link href={`/tasks/${task.id}/edit`} className="text-blue-600 underline">
                Edit
              </Link>
              <button onClick={() => handleDelete(task.id)} className="text-red-600 underline ml-4">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
