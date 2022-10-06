<template>
  <nav id="header" class="nav-container">
    <div class="navbox">
      <label for="menu-toggle" class="cursor-pointer md:hidden block">
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </label>
      <input class="hidden" type="checkbox" id="menu-toggle" />
      <nav class="ironcheck-nav">
        <p class="todoapp-image-nav"></p>
        <p class="max-w-xs mt-2 text-xl text-gray-600">Iron cHeck</p>
      </nav>

      <div
        class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
        id="nav-content"
      >
        <div class="auth flex items-center w-full md:w-full">
          <button
            @click="signout"
            class="bg-red-400 text-gray-200 p-2 rounded hover:bg-red-500 hover:text-gray-100"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
const redirect = useRouter();
const userStore = useUserStore();

async function signout() {
  await userStore.signOut();
  redirect.push({ path: "/auth/login" });
}
</script>

<style></style>
