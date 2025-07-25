// console.log("JavaScript is working");

let tasks = [];
let filteredTasks = [];
const addButton = document.querySelector(".addBtn");
const inputTask = document.getElementById("input-task");
const dueDate = document.getElementById("input-date");

addButton.addEventListener("click", function () {
  if (inputTask.value === "" || dueDate.value === "") {
    alert("Please enter a task...");
  } else {
    const newTask = {
      id: Date.now(),
      task: inputTask.value,
      dueDate: dueDate.value,
      status: "Pending",
    };

    // console.log(newTask);
    tasks.push(newTask);

    inputTask.value = "";
    dueDate.value = "";

    displayTasks();
  }
});

// display task
function displayTasks(taskToShow = tasks) {
  const tableBody = document.querySelector("tbody");

  if (taskToShow.length === 0) {
    tableBody.innerHTML = `<td colspan="4" class="text-center text-base sm:text-xl p-5">
                  Task Not Found!
                </td>`;
  } else {
    tableBody.innerHTML = "";
    taskToShow.forEach((e) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="text-center">${e.task}</td>
        <td class="text-center">${e.dueDate}</td>
        <td class="text-center">${e.status}</td>
        <td class="text-center sm:flex sm:gap-2 sm:justify-between">
          <button class="${
            e.status === "Pending" ? "bg-green-400" : "bg-orange-300"
          } p-2 mb-2 rounded-md w-[50%] sm:w-[50%]" onclick="markAsDone(${
        e.id
      })">${e.status === "Pending" ? "Done" : "Pending"}</button>
          <button class="bg-red-500 p-2 mb-2 rounded-md w-[50%] sm:w-[50%]" onclick="deleteTask(${
            e.id
          })">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// mark task as done
function markAsDone(id) {
  const task = tasks.find((e) => e.id === id);
  if (task) {
    task.status = task.status === "Pending" ? "Done" : "Pending";
    displayTasks();
  }
}

// delete task
function deleteTask(id) {
  tasks = tasks.filter((e) => e.id !== id);
  displayTasks();
}

// delete all tasks
const deleteAllButton = document.querySelector(".delete-all-btn");
deleteAllButton.addEventListener("click", () => {
  if (tasks.length === 0) {
    alert("No tasks to delete!");
  } else {
    const confirmDelete = confirm("Are you sure you want to delete all tasks?");
    if (confirmDelete) {
      tasks = [];
      displayTasks();
    }
  }
});

// filter tasks
const filterButton = document.querySelector(".filter-btn");
filterButton.addEventListener("click", () => {
  const filterStatus = document.getElementById("status-selected").value;
  if (filterStatus === "All") {
    displayTasks(tasks);
  } else {
    filteredTasks = tasks.filter((task) => task.status === filterStatus);
    displayTasks(filteredTasks);
  }
});
