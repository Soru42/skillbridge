import { useState } from "react";
import {
  getSavedJobs,
  getRoadmapTasks,
  saveRoadmapTasks,
  deleteRoadmapTask,
} from "../utils/storage";
import { buildTasksFromJobs } from "../utils/roadmap";
import "../styles/LearningRoadmap.css";

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
  const pendingCount = totalCount - completedCount;
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

  // Lets the user press Enter to add a task
  function handleAddKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
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
      {/* Page header */}
      <div className="lr-header">
        <div>
          <h2 className="lr-title">Learning Roadmap</h2>
          <p className="lr-sub">Turn your missing skills into a study plan.</p>
        </div>
        <button type="button" className="lr-btn-primary" onClick={handleSync}>
          <i className="bi bi-arrow-repeat"></i> Add tasks from saved jobs
        </button>
      </div>

      {/* Progress card */}
      <div className="lr-card lr-progress-card">
        <div className="lr-progress-top">
          <div>
            <p className="lr-label">YOUR PROGRESS</p>
            <p className="lr-progress-text">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <span className="lr-percent">{percent}%</span>
        </div>

        <div
          className="lr-track"
          role="progressbar"
          aria-label="Learning progress"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="lr-fill" style={{ width: percent + "%" }}></div>
        </div>

        <div className="lr-stats">
          <span className="lr-stat lr-stat-done">
            <i className="bi bi-check-circle-fill"></i> {completedCount} completed
          </span>
          <span className="lr-stat lr-stat-pending">
            <i className="bi bi-clock"></i> {pendingCount} pending
          </span>
        </div>

        {totalCount > 0 && pendingCount === 0 && (
          <p className="lr-celebrate">
            Great work! Every task is done. Analyze another job to find new skills.
          </p>
        )}
      </div>

      {/* Add a manual task */}
      <div className="lr-card lr-add-card">
        <label htmlFor="newTask" className="lr-label">
          ADD YOUR OWN TASK
        </label>
        <div className="lr-add-row">
          <input
            id="newTask"
            type="text"
            className="lr-input"
            placeholder="e.g. Practice SQL joins"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleAddKeyDown}
          />
          <button type="button" className="lr-btn-outline" onClick={handleAdd}>
            <i className="bi bi-plus-lg"></i> Add
          </button>
        </div>
      </div>

      {message && (
        <div className="lr-message" role="status">
          <i className="bi bi-info-circle"></i> {message}
        </div>
      )}

      {/* Task list */}
      {tasks.length === 0 ? (
        <div className="lr-empty">
          <div className="lr-empty-icon">
            <i className="bi bi-graph-up-arrow"></i>
          </div>
          <h5>No learning tasks yet</h5>
          <p>
            Save a job in the Job Matcher, then add its missing skills here as tasks.
          </p>
        </div>
      ) : (
        <ul className="lr-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "lr-task lr-task-done" : "lr-task"}
            >
              <input
                type="checkbox"
                className="lr-check"
                id={"task-" + task.id}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    className="lr-input lr-edit-input"
                    aria-label="Edit task title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <div className="lr-task-actions">
                    <button
                      type="button"
                      className="lr-btn-save"
                      onClick={() => saveEdit(task.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="lr-btn-cancel"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor={"task-" + task.id} className="lr-task-title">
                    {task.title}
                  </label>

                  {task.skill ? (
                    <span className="lr-chip">{task.skill}</span>
                  ) : (
                    <span className="lr-chip lr-chip-custom">Custom</span>
                  )}

                  <div className="lr-task-actions">
                    <button
                      type="button"
                      className="lr-icon-btn"
                      aria-label={"Edit " + task.title}
                      onClick={() => startEdit(task)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      className="lr-icon-btn lr-icon-danger"
                      aria-label={"Delete " + task.title}
                      onClick={() => handleDelete(task.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
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