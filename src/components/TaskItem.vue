<template>
  <div class="tasks-area">
    <div class="tasks-container">
      <div class="flex justify-between py-1">
        <h3 class="text-m">{{ taskData.title }}</h3>
      </div>
      <div class="flex justify-between py-1">
        {{ taskData.description }}
      </div>

      <div class="task-editdelete">
        <button @click="toggleEdit">Edit</button>
        <button @click="deleteTask">Delete</button>
        <button @click="completeItem">Completed</button>
      </div>
      <div v-if="editInput">
        <input type="text" v-model="editTitle" />
        <input type="text" v-model="editDescription" />
        <button @click="edit">Apply</button>
        <h1 v-if="errorContainer">{{ errorMessage }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// BOOLEAN TO HIDE/SHOW THE INPUT  FOR EDIT
let editInput = ref(false);

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

const emit = defineEmits(["editChild", "deleteChild"]);
const props = defineProps(["taskData"]);
</script>

<style></style>
