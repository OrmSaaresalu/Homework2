<script setup>
import { computed, ref } from "vue";

const email = ref("");
const password = ref("");
const submitted = ref(false);
const signedUp = ref(false);

const rules = [
  {
    label: "Length is at least 8 and less than 15 characters",
    test: (p) => p.length >= 8 && p.length < 15,
  },
  {
    label: "Includes at least one uppercase alphabet character",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    label: "Includes at least two lowercase alphabet characters",
    test: (p) => (p.match(/[a-z]/g) ?? []).length >= 2,
  },
  {
    label: "Includes at least one numeric value",
    test: (p) => /[0-9]/.test(p),
  },
  {
    label: "Starts with an uppercase letter",
    test: (p) => /^[A-Z]/.test(p),
  },
  {
    label: 'Includes the character "_"',
    test: (p) => p.includes("_"),
  },
];

const unmet = computed(() =>
  rules.filter((rule) => !rule.test(password.value)).map((rule) => rule.label),
);

const showError = computed(
  () => (password.value.length > 0 || submitted.value) && unmet.value.length > 0,
);

function onSubmit() {
  submitted.value = true;
  signedUp.value = unmet.value.length === 0;
}

function onInput() {
  signedUp.value = false;
}
</script>

<template>
  <section class="signup">
    <h1 class="hidden">Signup</h1>

    <form class="signup-form" novalidate @submit.prevent="onSubmit">
      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          required
          @input="onInput"
        />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="new-password"
          required
          @input="onInput"
        />
      </div>

      <p v-if="showError" class="error" role="alert">
        the password is not valid - {{ unmet.join("; ") }}
      </p>
      <p v-else-if="signedUp" class="success" role="status">Signed up!</p>

      <button type="submit">Signup</button>
    </form>
  </section>
</template>

<style scoped>
.signup {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.signup-form {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  background: #e9f0dc;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.12);
}

.field {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  gap: 10px;
}

input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #c8d0b8;
  border-radius: 8px;
  background: #fff;
  font-family: inherit;
}

input:focus {
  outline: 2px solid #1f497d;
  outline-offset: 1px;
}

button {
  align-self: center;
  padding: 7px 28px;
  border: none;
  border-radius: 999px;
  background: #7aa2e3;
  color: #fff;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}

button:hover {
  background: #1f497d;
}

.error {
  margin: 0;
  padding: 8px 10px;
  border-radius: 6px;
  background: #fde8e8;
  color: #9b1c1c;
  font-size: 0.9em;
}

.success {
  margin: 0;
  padding: 8px 10px;
  border-radius: 6px;
  background: #def7e4;
  color: #1b6b32;
  font-size: 0.9em;
}

.hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (max-width: 480px) {
  .field {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
