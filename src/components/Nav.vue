<template>
  <nav id="header" class="nav-container">
    <div class="navbox">
      <nav class="ironcheck-nav">
        <p class="todoapp-image-nav"></p>
        <p class="nav-title">Iron cHeck</p>
      </nav>
      <h2 class="nav-time">{{ time }}</h2>
      <div class="nav-logout-box" id="nav-content">
        <p class="usernav">{{ username }}</p>
        <button @click="signout" class="signout">Log Out</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
import moment from "moment";
// import AlertsComponent from "../components/AlertsComponent.vue";
// import { alerts } from "../components/AlertsComponent.vue";

const redirect = useRouter();
const userStore = useUserStore();
const time = moment().format("LLL");
const username = userStore.user.email.split("@")[0];

async function signout() {
  // function that signs out user
  await userStore.signOut();
  redirect.push({ path: "/auth/login" });
}
</script>
