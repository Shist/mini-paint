<template>
  <div class="sign-in-page">
    <burger-menu />
    <form action="#" class="sign-in-page__form">
      <h2 class="sign-in-page__headline">Sign In</h2>
      <label class="sign-in-page__email-input-label" for="emailInput">
        Enter your email below:
      </label>
      <input
        v-model="email"
        type="email"
        name="email"
        class="sign-in-page__email-input"
        id="emailInput"
        placeholder="Email"
        required
      />
      <label class="sign-in-page__password-input-label" for="passwordInput">
        Enter your password below:
      </label>
      <input
        v-model="password"
        type="password"
        name="password"
        class="sign-in-page__password-input"
        id="passwordInput"
        placeholder="Password"
        required
      />
      <button
        class="sign-in-page__confirm-btn"
        @click.prevent="onConfirmBtnClicked"
        :disabled="isLoading"
      >
        Confirm
      </button>
    </form>
    <h3 class="sign-in-page__sign-up-suggestion-headline">
      Don't have an account yet?
    </h3>
    <router-link
      to="/sign-up"
      class="sign-in-page__sign-up-btn"
      :class="{ 'disabled-link': isLoading }"
    >
      Sign up
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BurgerMenu from "@/components/BurgerMenu.vue";
import useToast from "@/hooks/useToast";
import useFirebaseErrorMsg from "@/hooks/useFirebaseErrorMsg";
import { ISignInState } from "@/store/signInModule";

export default defineComponent({
  name: "sign-in-page",
  components: { BurgerMenu },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(false);

    const { setLoadingToast, setSuccessToast, setErrorToast } = useToast();
    const { getErrorMsg } = useFirebaseErrorMsg();

    const email = computed({
      get() {
        return store.state.signIn.email;
      },
      set(newValue: ISignInState["email"]) {
        store.commit("signIn/setEmail", newValue);
      },
    });

    const password = computed({
      get() {
        return store.state.signIn.password;
      },
      set(newValue: ISignInState["password"]) {
        store.commit("signIn/setPassword", newValue);
      },
    });

    const signInUser = async (payload: ISignInState) => {
      return store.dispatch("firebase/signInUser", payload);
    };

    const onConfirmBtnClicked = async () => {
      isLoading.value = true;
      setLoadingToast("Logging...");
      try {
        await signInUser({ email: email.value, password: password.value });
        setSuccessToast("You have successfully logged in!");
        email.value = "";
        password.value = "";
        router.push("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          const errorMsg = getErrorMsg(error);
          setErrorToast(
            `An error occurred while trying to log in to account! ${errorMsg}`
          );
        }
      } finally {
        isLoading.value = false;
      }
    };

    return { isLoading, email, password, onConfirmBtnClicked };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-in-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__form {
    display: flex;
    flex-direction: column;
    .sign-in-page__headline {
      @include default-headline(42px, 42px, var(--color-text));
      margin-bottom: 30px;
      text-align: center;
    }
    .sign-in-page__email-input-label {
      @include default-text(24px, 24px, var(--color-text));
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-in-page__email-input {
      @extend %default-input;
      margin-bottom: 20px;
    }
    .sign-in-page__password-input-label {
      @include default-text(24px, 24px, var(--color-text));
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-in-page__password-input {
      @extend %default-input;
      margin-bottom: 40px;
    }
    .sign-in-page__confirm-btn {
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
