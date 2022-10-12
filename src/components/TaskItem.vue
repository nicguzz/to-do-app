<template>
  <div class="tasks-area">
    <!-- If task is completed, applying class that gives task a grey background, if its not complete, the regular color -->

    <div
      :class="[
        taskData.is_complete ? 'task-area-complete' : 'tasks-container',
        errorClass,
      ]"
    >
      <div class="py-1 flex flex-col">
        <p id="task-time">{{ taskInsertedTime }}</p>
        <p class="tasks-td">Title</p>
        <h3 class="text-m">{{ taskData.title }}</h3>
      </div>
      <div class="py-1 flex flex-col">
        <p class="tasks-td">Description</p>

        <h3 class="text-m">{{ taskData.description }}</h3>
      </div>
      <!-- If task is completed, we give option to delete task or to recover -->
      <div v-if="taskData.is_complete" class="task-recover">
        <button class="task-red" @click.prevent="recoverItem">
          <i class="fa-sharp fa-solid fa-arrow-rotate-left w-20"></i>
        </button>
        <button @click="deleteTask" class="task-delete w-20">
          <i class="fa-regular fa-trash-can fa-lg"></i>
        </button>
      </div>
      <!-- If task is not completed, we give option to edit, delete or complete task -->
      <div v-else class="edit-done-container">
        <button @click.prevent="completeItem" class="task-green">
          <i class="fa-solid fa-check fa-lg"></i>
        </button>

        <button @click.prevent="toggleEdit" class="task-edit">
          <i class="fa-regular fa-pen-to-square fa-lg"></i>
        </button>
        <button @click="deleteTask" class="task-delete w-20">
          <i class="fa-regular fa-trash-can fa-lg"></i>
        </button>
      </div>
      <div v-if="editInput" class="editinput">
        <div class="editinput-text">
          <input id="edittitle" type="text" v-model="editTitle" />
          <textarea
            id="editdescription"
            type="text"
            v-model="editDescription"
          ></textarea>
        </div>
        <!-- If we click Edit, it opens inputs to edit task -->
        <button @click="edit" class="apply-edit">Apply</button>
        <h1 v-if="errorContainer">{{ errorMessage }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["taskData"]);
// BOOLEAN TO HIDE/SHOW THE INPUT  FOR EDIT
let editInput = ref(false);

const myArray = ["nic", "jashdjsad", "Ric", "mapi"];

// TIME FORMATTING FROM DATABASE
// Database time: 2022-10-10 09:29:58.285272+00
let time = props.taskData.inserted_at;

let taskInsertedTime = time.replace("T", " ").replace(".", " ").slice(0, 20);

// Formatted time: 2022-10-10 09:29:58

// VARIABLE WITH EMPTY STRING FOR INPUT TO EDIT
let editTitle = ref("");
let editDescription = ref("");

// FUNCTION THAT TOGGLES THE VISIBILITY OF THE INPUT

function toggleEdit() {
  // Function that will allow user to edit when editInput is changed to True(v-if="editInput")
  editInput.value = !editInput.value;
  editTitle.value = props.taskData.title;
  editDescription.value = props.taskData.description;
}

let errorMessage = ref("");
let errorContainer = ref(false);

function errorhandling() {
  errorContainer.value = !errorContainer.value;
  errorMessage.value = "It cant be empty";
}

function edit() {
  if (editTitle.value === "") {
    // If title is empty, error handling is started to inform user that string cannot be empty, activating the errorContainer to true and sending {{Error message}}
    errorhandling();
  } else {
    // If title is not empty, if it has some value, then edit box is closed, error turns to false, a new object(oldToNew) is created and also an emit("editChild") to later be used in Home.vue (@editChild="editFather") with the function editFather set in Home.vue
    editInput.value = !editInput.value;
    errorContainer.value = !errorContainer.value;
    let oldToNew = {
      id: props.taskData.id,
      title: editTitle.value,
      description: editDescription.value,
    };
    emit("editChild", oldToNew);
  }
}

function deleteTask() {
  emit("deleteChild", props.taskData); // function using an emit("deleteChild") to carry props.taskData to be used in Home.vue(@deleteChild="deleteId") and later use function deleteId to store to database
}

function completeItem() {
  //This function issues an emit of the html query to be used in Home.vue with a new function changeToCompleted @emitItemComplete="changeToCompleted"

  emit("emitItemComplete", props.taskData);
}

function recoverItem() {
  //This function issues an emit of the html query to be used in Home.vue with a new function changeToIncomplete @emitRecoverItem="changeToIncomplete"

  emit("emitRecoverItem", props.taskData);
}

const emit = defineEmits(["editChild", "deleteChild"]);
</script>
