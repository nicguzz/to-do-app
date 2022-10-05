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
    errorhandling();
  } else {
    editInput.value = !editInput.value;
    errorContainer.value = !errorContainer.value;
    let oldToNew = {
      id: props.taskData.id,
      title: editTitle.value,
      description: editDescription.value,
    };
    console.log(oldToNew);
    emit("editChild", oldToNew);
  }
}

function deleteTask() {
  let deleteId = props.taskData.id;
  emit("deleteChild", props.taskData);
  console.log(props.taskData);
  console.log(props.taskData.id);
}

function completeItem() {
  emit("emitItemComplete", props.taskData);
}

const emit = defineEmits(["editChild", "deleteChild"]);
const props = defineProps(["taskData"]);
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
