<template>
  <div class="nic-bg">
    <div class="relative min-h-screen">
      <Nav />

      <NewTask @childNewTask="sendToStore" />
      <div class="tasks">
        <TaskItem
          v-for="(task, index) in taskArray"
          :key="index"
          :taskData="task"
          @editChild="editFather"
          @deleteChild="deleteId"
          @emitItemComplete="changeToCompleted"
          @emitRecoverItem="changeToIncomplete"
          @superCoolEmit="changeToIncomplete"
        />
      </div>
    </div>
    <!-- <AlertsComponent /> -->
    <Footer class="footer" />
  </div>
</template>

<script setup>
import NewTask from "@/components/NewTask.vue";
import { useTaskStore } from "../stores/task.js";
import TaskItem from "../components/TaskItem.vue";
import { ref } from "vue";
import { supabase } from "../supabase";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import AlertsComponent from "../components/AlertsComponent.vue";

// we define user store inside a const
const taskStore = useTaskStore();
// we start array of tasks
let taskArray = ref([]);

async function readFromStore() {
  // This is the function to read data from database
  taskArray.value = await taskStore.fetchTasks();
}

readFromStore();
// We add new task and send to database
async function sendToStore(title, description) {
  await taskStore.addTask(title, description);
  readFromStore();
}

async function editFather(task) {
  // We edit a task and send to database
  await taskStore.editTask(task.id, task.title, task.description);
  readFromStore();
}

async function deleteId(idTask) {
  // We delete a task and send to database

  await taskStore.deleteTask(idTask.id);
  readFromStore();
}

async function changeToCompleted(task) {
  // We change the value of is_complete to true in the database
  let booleanChange = !task.is_complete;
  let taskID = task.id;
  const response = await taskStore.completeTask(taskID, booleanChange);
  await readFromStore();
}

async function changeToIncomplete(task) {
  // We change the value of is_complete to false in the database
  let booleanChange = !task.is_complete;
  let taskID = task.id;
  await taskStore.completeTask(taskID, booleanChange);
  readFromStore();
}
</script>
