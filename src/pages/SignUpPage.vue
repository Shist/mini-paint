<template>
  <div class="sign-up-page">
    <burger-menu />
    <form action="#" class="sign-up-page__form">
      <h2 class="sign-up-page__headline">Sign Up</h2>
      <label class="sign-up-page__email-input-label" for="emailInput">
        Enter your email below:
      </label>
      <input
        v-model="email"
        type="email"
        name="email"
        class="sign-up-page__email-input"
        id="emailInput"
        placeholder="Email"
        required
      />
      <label class="sign-up-page__name-input-label" for="nameInput">
        Enter your name below:
      </label>
      <input
        v-model="name"
        type="name"
        name="name"
        class="sign-up-page__name-input"
        id="nameInput"
        placeholder="Name"
        required
      />
      <label class="sign-up-page__password-input-label" for="passwordInput">
        Enter your password below:
      </label>
      <input
        v-model="password"
        type="password"
        name="password"
        class="sign-up-page__password-input"
        id="passwordInput"
        placeholder="Password"
        required
      />
      <label
        class="sign-up-page__repeat-password-input-label"
        for="repeatPasswordInput"
      >
        Repeat your password below:
      </label>
      <input
        v-model="repeatPassword"
        type="password"
        name="repeat-password"
        class="sign-up-page__repeat-password-input"
        id="repeatPasswordInput"
        placeholder="Repeat password"
        required
      />
      <button
        class="sign-up-page__confirm-btn"
        @click.prevent="onConfirmBtnClicked"
        :disabled="isLoading"
      >
        Confirm
      </button>
    </form>
    <h3 class="sign-up-page__sign-up-suggestion-headline">
      Already have an account?
    </h3>
    <router-link
      to="/sign-in"
      class="sign-up-page__sign-up-btn"
      :class="{ 'disabled-link': isLoading }"
    >
      Sign In
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import BurgerMenu from "@/components/BurgerMenu.vue";
import useToast from "@/composables/useToast";
import useFirebaseErrorMsg from "@/composables/useFirebaseErrorMsg";
import useValidationErrorMsg from "@/composables/useValidationErrorMsg";
import { signUpUser } from "@/services/firebase";

export default defineComponent({
  name: "sign-up-page",
  components: { BurgerMenu },
  setup() {
    const router = useRouter();
    const isLoading = ref(false);

    const { setLoadingToast, setSuccessToast, setErrorToast } = useToast();
    const { getErrorMsg } = useFirebaseErrorMsg();

    const email = ref("");
    const name = ref("");
    const password = ref("");
    const repeatPassword = ref("");

    const { getValidationError } = useValidationErrorMsg({
      email,
      name,
      password,
      repeatPassword,
    });

    const onConfirmBtnClicked = async () => {
      const errorMsg = getValidationError();
      if (errorMsg) {
        setErrorToast(`Error! ${errorMsg}`);
        return;
      }
      isLoading.value = true;
      setLoadingToast("Registering an account...");
      try {
        await signUpUser(email.value, name.value, password.value);
        setSuccessToast("Your account has been successfully registered!");
        email.value = "";
        name.value = "";
        password.value = "";
        repeatPassword.value = "";
        router.push("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          const errorMsg = getErrorMsg(error);
          setErrorToast(
            `An error occurred while trying to register an account! ${errorMsg}`
          );
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      email,
      name,
      password,
      repeatPassword,
      onConfirmBtnClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-up-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__form {
    display: flex;
    flex-direction: column;
    .sign-up-page__headline {
      @include default-headline(42px, 42px, var(--color-text));
      margin-bottom: 30px;
      text-align: center;
    }
    .sign-up-page__email-input-label {
      @include default-text(24px, 24px, var(--color-text));
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-up-page__email-input {
      @extend %default-input;
      margin-bottom: 20px;
    }
    .sign-up-page__name-input-label {
      @include default-text(24px, 24px, var(--color-text));
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-up-page__name-input {
      @extend %default-input;
      margin-bottom: 20px;
    }
    .sign-up-page__password-input-label {
      @include default-text(24px, 24px, var(--color-text));
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-up-page__password-input {
      @extend %default-input;
      margin-bottom: 20px;
    }
    .sign-up-page__repeat-password-input-label {
      @include default-text(24px, 24px, var(--color-text));
      @media (max-width: $phone-l) {
        font-size: 19px;
        line-height: 19px;
      }
    }
    .sign-up-page__repeat-password-input {
      @extend %default-input;
      margin-bottom: 40px;
    }
    .sign-up-page__confirm-btn {
      @include default-btn(300px, var(--color-btn-text), var(--color-btn-bg));
      margin-bottom: 20px;
    }
  }
  &__sign-up-suggestion-headline {
    @include default-text(20px, 20px, var(--color-text));
    margin-bottom: 5px;
  }
  &__sign-up-btn {
    @include default-btn(100px, var(--color-btn-text), var(--color-btn-bg));
    text-decoration: none;
  }
}
</style>
