<template>
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
                type="password"
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
          <p class="text-xs ml-2 text-blue-500 font-semibold">
            <PersonalRouter :route="route" :buttonText="buttonText" />
          </p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Signed up already? Sign in here";
// Input Fields
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
