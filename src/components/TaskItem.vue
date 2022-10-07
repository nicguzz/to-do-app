<template>
  <div class="tasks-area">
    <div class="tasks-container">
      <div class="py-1 flex flex-col">
        <p class="tasks-td">Title</p>
        <h3 class="text-m">{{ taskData.title }}</h3>
      </div>
      <div class="py-1 flex flex-col">
        <p class="tasks-td">Description</p>

        <h3 class="text-m">{{ taskData.description }}</h3>
      </div>

      <div class="task-editdelete">
        <button v-if="isComplete" class="task-red" @click.prevent="recoverItem">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div v-else class="edit-done-container">
          <button @click.prevent="completeItem" class="task-green">
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
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <button @click.prevent="toggleEdit" class="task-edit">
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>

        <div class="task-delete">
          <button @click="deleteTask">
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="editInput" class="editinput">
        <div class="editinput-text">
          <input type="text" v-model="editTitle" />
          <input id="editdescription" type="text" v-model="editDescription" />
        </div>

        <button @click="edit" class="apply-edit">Apply</button>
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
let isComplete = props.taskData.is_complete;

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
  //

  emit("emitRecoverItem", props.taskData);
}

const emit = defineEmits(["editChild", "deleteChild"]);
const props = defineProps(["taskData"]);
</script>

<style></style>
