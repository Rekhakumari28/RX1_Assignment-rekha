import { createStore } from "redux";
import taskReducer from "../taskReducer.mjs";
import { addTask, removeTask, toggleTask } from "../actions.mjs";

export const store = createStore(taskReducer);

store.getState();
console.log("Initial state", store.getState());

let taskCounter = 1;

store.subscribe(() => {
  renderTasks();
});

const renderTasks = () => {
  const state = store.getState();
  console.log("current", state);

  const taskListContainer = document.getElementById("taskList");
  const totalTasks = document.getElementById("totalTasks");

  if (!taskListContainer || !totalTasks) {
    console.error("Task list or total not found.");
    return;
  }

  taskListContainer.innerHTML = "";

  state.tasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${task.id}`;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => handleToggleTask(task.id));

    const label = document.createElement("label");
    label.htmlFor = `task-${task.id}`;
    label.textContent = `${task.id}. ${task.name}: ${task.details} ${task.completed === true ? ": Completed" : ""}`;

    li.appendChild(checkbox);
    li.appendChild(label);
    taskListContainer.appendChild(li);
  });

  totalTasks.textContent = state.tasks.length;
};

const handleToggleTask = (taskId) => {
  store.dispatch(toggleTask(taskId));
};

const addTaskForm = document.getElementById("addTaskForm");

addTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const taskDetail = document.getElementById("taskDetail").value;

  if (!taskName || !taskDetail) {
    console.error("Please enter task name and task detail");
  }
  const taskId = taskCounter++;

  store.dispatch(
    addTask({
      id: taskId,
      name: taskName,
      details: taskDetail,
      completed: false,
    })
  );

  document.getElementById("taskName").value = "";
  document.getElementById("taskDetail").value = "";
});


const removeTaskBtn = document.getElementById("removeTaskBtn");

removeTaskBtn.addEventListener("click", function(){
    const removeTaskId = parseInt(document.getElementById("removeTaskId").value);
    if(isNaN(removeTaskId)){
        alert("Invalid Id")
    }
    store.dispatch(removeTask(removeTaskId))
    document.getElementById("removeTaskId").value = ""
})

renderTasks()