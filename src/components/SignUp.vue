<template>
  <IroncheckLogo />

  <div class="signin-center">
    <div class="signup-container">
      <div class="signin">Sign Up</div>
      <div class="signin-credentials">
        Enter your credentials to register your account
      </div>

      <div class="mt-10">
        <form @submit.prevent="signUp">
          <div class="flex flex-col mb-5">
            <label for="email" class="signin-email-label">Email @:</label>
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
              >Password:</label
            >
            <div class="relative">
              <input
                v-model="password"
                id="password"
                :type="passwordFieldType"
                class="signin-password"
                placeholder="Enter your password"
              />
              <span
                class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  class=""
                  @click="hidePassword = !hidePassword"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>

          <div class="flex flex-col mb-6">
            <label for="password" class="signin-password-label">
              Confirm Password:</label
            >
            <div class="relative">
              <input
                onpaste="return false"
                class="signin-password"
                placeholder="Re-enter your password"
                type="password"
                v-model="confirmPassword"
                id="confirmPassword"
              />
            </div>
          </div>

          <div class="flex w-full">
            <button type="submit" class="submit-button">
              <span class="mr-2 uppercase">Sign Up</span>
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
        <span class="register-now">
          Signed up already?
          <p class="text-xs ml-2 text-blue-500 font-semibold">
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="register-now-text"
            />
          </p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import IroncheckLogo from "./IroncheckLogo.vue";
// Route Variables
const route = "/auth/login";
const buttonText = "Sign in here";
// Input Fields

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style></style>
