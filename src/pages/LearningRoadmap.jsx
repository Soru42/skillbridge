import { useState } from "react";
import {
  getSavedJobs,
  getRoadmapTasks,
  saveRoadmapTasks,
  deleteRoadmapTask,
} from "../utils/storage";
import { buildTasksFromJobs } from "../utils/roadmap";

function LearningRoadmap() {
  // Lazy initial state: localStorage is read only once, on the first render
  const [tasks, setTasks] = useState(() => getRoadmapTasks());
  const [message, setMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");

  // Edit mode: which task is being edited, and the text in its input
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // Progress is calculated from the tasks array, never hardcoded
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Creates tasks from the missing skills of saved jobs
  function handleSync() {
    const newTasks = buildTasksFromJobs(getSavedJobs(), tasks);

    if (newTasks.length === 0) {
      setMessage("No new skills to add. Save more jobs from the Job Matcher.");
      return;
    }

    const updatedTasks = [...tasks, ...newTasks];
    setTasks(updatedTasks);
    saveRoadmapTasks(updatedTasks);
    setMessage(newTasks.length + " new task(s) added.");
  }

  // Adds a task written by the user
  function handleAdd() {
    const title = newTitle.trim();

    if (title === "") {
      setMessage("Please type a task title.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      skill: "",
      completed: false,
      source: "manual",
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveRoadmapTasks(updatedTasks);

    setNewTitle("");
    setMessage("");
  }

  // Flips completed between true and false for one task
  function toggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveRoadmapTasks(updatedTasks);
  }

  // Opens edit mode for one task
  function startEdit(task) {
    setEditingId(task.id);
    setEditTitle(task.title);
  }

  // Closes edit mode without saving
  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
  }

  // Saves the new title of the task being edited
  function saveEdit(id) {
    const title = editTitle.trim();

    if (title === "") {
      setMessage("Task title cannot be empty.");
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: title } : task
    );
    setTasks(updatedTasks);
    saveRoadmapTasks(updatedTasks);

    cancelEdit();
    setMessage("");
  }

  // Removes a task from localStorage and from the screen
  function handleDelete(id) {
    deleteRoadmapTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="container py-4">
      <h2 className="mb-1">Learning Roadmap</h2>
      <p className="text-muted">Track the skills you need to learn.</p>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="d-flex justify-content-between small mb-1">
          <span>
            {completedCount} of {totalCount} completed
          </span>
          <span>{percent}%</span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Learning progress"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="progress-bar" style={{ width: percent + "%" }}></div>
        </div>
      </div>

      {/* Add a manual task */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add your own task, e.g. Practice SQL joins"
          aria-label="New task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="button" className="btn btn-outline-primary" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* Create tasks from saved jobs */}
      <button type="button" className="btn btn-primary mb-3" onClick={handleSync}>
        Add tasks from saved jobs
      </button>

      {message && (
        <div className="alert alert-info py-2" role="status">
          {message}
        </div>
      )}

      {/* Task list */}
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks yet. Click the button above to get started.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                id={"task-" + task.id}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    aria-label="Edit task title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <label
                    htmlFor={"task-" + task.id}
                    className={
                      task.completed ? "text-decoration-line-through text-muted" : ""
                    }
                  >
                    {task.title}
                  </label>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary ms-auto"
                    onClick={() => startEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LearningRoadmap;