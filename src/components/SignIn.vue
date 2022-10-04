<template>
  <!-- <PersonalRouter :route="route" :buttonText="buttonText" /> -->

  <p v-if="errorMsg" class="">
    {{ errorMsg }}
  </p>
  <div class="signin-center">
    <div class="signin-container">
      <div class="signin">Sign in</div>
      <div class="signin-credentials">
        Enter your credentials to access your account
      </div>

      <div class="mt-10">
        <form action="#" @submit.prevent="signIn">
          <div class="flex flex-col mb-5">
            <label for="email" class="signin-email-label">email @:</label>
            <div class="relative">
              <input
                id="email"
                type="email"
                name="email"
                v-model="email"
                class="signin-email"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="signin-password-label"
              >password:</label
            >
            <div class="relative">
              <input
                :type="passwordFieldType"
                onpaste="return false"
                v-model="password"
                id="password"
                class="signin-password"
                placeholder="Enter your password"
              />
              <span class="">
                <EyeIcon
                  :class="[passwordFieldIcon]"
                  @click.prevent="hidePassword = !hidePassword"
                />
              </span>
            </div>
          </div>

          <div class="flex w-full">
            <button type="submit" class="submit-button">
              <span class="mr-2 uppercase">Sign in</span>
              <span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
              </span>
            </button>
          </div>
        </form>
      </div>
      <div class="flex justify-center items-center mt-6">
        <span class="register-now"
          >You don't have an account?
          <p class="text-xs ml-2 text-blue-500 font-semibold">
            <PersonalRouter :route="route" :buttonText="buttonText" />
          </p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Register now";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style></style>
