<template>
  <div class="taskcreator-area">
    <div class="taskcreator-container">
      <div class="flex justify-between py-1">
        <h3 class="text-m">New Iron Task</h3>
      </div>
      <div class="text-sm mt-2">
        <div class="new-title">
          <input
            v-model="taskTitle"
            type="text"
            id="newTaskTitle"
            placeholder="Task's title"
          />
        </div>

        <div class="new-description">
          <textarea
            v-model="taskDesc"
            type="text"
            id="newTaskDesc"
            placeholder="Task's description"
          ></textarea>
        </div>
        <button class="add-button" @click.prevent="onInput">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add
        </button>
      </div>
      <div>
        <h3 v-if="errorBool" class="errormsg">{{ emptyString }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["childNewTask"]);
let taskTitle = ref("");
let taskDesc = ref("");
let errorBool = ref(false);
const emptyString = ref("");

function onInput() {
  // this function alerts user that a title is required in case field is empty, otherwise it creates a new task
  if (taskTitle.value === "") {
    errorBool.value = true;
    emptyString.value = "Title is required.";
    setTimeout(() => {
      errorBool.value = false;
    }, 1000);
  } else {
    emit("childNewTask", taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
  }
}
</script>
