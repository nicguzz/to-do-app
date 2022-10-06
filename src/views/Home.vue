<template>
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
    />
  </div>
  <Footer />
</template>

<script setup>
import NewTask from "@/components/NewTask.vue";
import { useTaskStore } from "../stores/task.js";
import TaskItem from "../components/TaskItem.vue";
import { ref } from "vue";
import { supabase } from "../supabase";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";

// nos definimos la tienda del usuario dentro de una constante
const taskStore = useTaskStore();
// Inicializamos array de tareas
let taskArray = ref([]);

async function readFromStore() {
  taskArray.value = await taskStore.fetchTasks();
}

readFromStore();
// console.log(taskArray);
// Enviamos los datos de la tarea a la Tienda taskStore
async function sendToStore(title, description) {
  await taskStore.addTask(title, description);
  readFromStore();
}

async function editFather(task) {
  await taskStore.editTask(task.id, task.title, task.description);
  readFromStore();
}

async function deleteId(idTask) {
  console.log(idTask.id);
  await taskStore.deleteTask(idTask.id);
  readFromStore();
}

async function changeToCompleted(task) {
  let booleanChange = !task.is_complete;
  let taskID = task.id;
  await taskStore.completeTask(taskID, booleanChange);
  readFromStore();
}
</script>
<style></style>
