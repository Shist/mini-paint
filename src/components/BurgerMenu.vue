<template>
  <button class="burger-btn" @click="setMenuIsOpened(true)"></button>
  <teleport to=".global-container">
    <div
      v-show="menuIsOpened"
      class="burger-menu"
      @click="
        setMenuIsOpened(
          ($event.target as HTMLElement).className !== 'burger-menu'
        )
      "
    >
      <nav class="burger-menu__nav">
        <div class="burger-menu__curr-acc-wrapper">
          <span class="burger-menu__curr-acc-label">Current account</span>
          <div class="burger-menu__email-wrapper">
            <span class="burger-menu__email-label">Email:</span>
            <span class="burger-menu__email-value">{{
              userEmail ? userEmail : "(not authorized yet)"
            }}</span>
          </div>
          <div class="burger-menu__name-wrapper">
            <span class="burger-menu__name-label">Name:</span>
            <span class="burger-menu__name-value">{{
              userName ? userName : "(not authorized yet)"
            }}</span>
          </div>
        </div>
        <h2 class="burger-menu__headline">Menu</h2>
        <theme-switch class="burger-menu__theme-switch" />
        <ul v-if="userEmail" class="burger-menu__nav-list">
          <li class="burger-menu__nav-list-item">
            <a class="burger-menu__link" @click.stop="onLogOutBtnClicked">
              Log out
            </a>
          </li>
        </ul>
        <a
          href="https://github.com/Shist/mini-paint"
          target="_blank"
          class="burger-menu__github-link"
        >
          <img
            src="@/assets/images/github.png"
            alt="GitHub"
            class="burger-menu__github-img"
          />
          <span class="burger-menu__github-label">
            This project on GitHub
          </span>
        </a>
      </nav>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useToast from "@/hooks/useToast";
import useFirebaseErrorMsg from "@/hooks/useFirebaseErrorMsg";
import { IBurgerMenuState } from "@/store/burgerMenuModule";

export default defineComponent({
  name: "burger-menu",
  setup() {
    const store = useStore();
    const router = useRouter();

    const { setErrorToast } = useToast();
    const { getErrorMsg } = useFirebaseErrorMsg();

    const menuIsOpened = computed(() => store.state.burgerMenu.menuIsOpened);
    const setMenuIsOpened = (newValue: IBurgerMenuState["menuIsOpened"]) => {
      store.commit("burgerMenu/setMenuIsOpened", newValue);
    };

    const userEmail = computed(() => store.state.firebase.userEmail);
    const userName = computed(() => store.state.firebase.userName);

    const signOutUser = async () => {
      store.dispatch("firebase/signOutUser");
    };

    const onLogOutBtnClicked = async () => {
      try {
        await signOutUser();
        setMenuIsOpened(false);
        router.push("/sign-in");
      } catch (error: unknown) {
        if (error instanceof Error) {
          const errorMsg = getErrorMsg(error);
          setErrorToast(
            `An error occurred while trying to log out! ${errorMsg}`
          );
        }
      }
    };

    return {
      menuIsOpened,
      setMenuIsOpened,
      userEmail,
      userName,
      onLogOutBtnClicked,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/global";

.burger-btn {
  position: absolute;
  top: 30px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent var(--burger-menu-btn-img) no-repeat center / cover;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
.burger-menu {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100dvh;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(var(--color-burger-menu-back-bg-rgb), 0.5);
  &__nav {
    position: relative;
    max-width: 70%;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-burger-menu-bg);
    @media (max-width: $tablet-l) {
      padding: 20px;
    }
    @media (max-width: $phone-l) {
      padding: 10px;
    }
    .burger-menu__curr-acc-wrapper {
      margin-bottom: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      .burger-menu__curr-acc-label {
        @include default-headline(32px, 32px, var(--color-burger-menu-text));
        @media (max-width: $tablet-l) {
          font-size: 20px;
          line-height: 20px;
        }
      }
      .burger-menu__email-wrapper {
        display: flex;
        align-items: baseline;
        column-gap: 5px;
        .burger-menu__email-label {
          @include default-text(28px, 28px, var(--color-burger-menu-text));
          @media (max-width: $tablet-l) {
            font-size: 20px;
            line-height: 20px;
          }
        }
        .burger-menu__email-value {
          @include default-text(28px, 28px, var(--color-burger-menu-text));
          overflow: hidden;
          text-overflow: ellipsis;
          text-wrap: nowrap;
          @media (max-width: $tablet-l) {
            font-size: 16px;
            line-height: 16px;
          }
          @media (max-width: $phone-l) {
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
      .burger-menu__name-wrapper {
        display: flex;
        align-items: baseline;
        column-gap: 5px;
        .burger-menu__name-label {
          @include default-text(28px, 28px, var(--color-burger-menu-text));
          @media (max-width: $tablet-l) {
            font-size: 20px;
            line-height: 20px;
          }
        }
        .burger-menu__name-value {
          @include default-text(28px, 28px, var(--color-burger-menu-text));
          overflow: hidden;
          text-overflow: ellipsis;
          text-wrap: nowrap;
          @media (max-width: $tablet-l) {
            font-size: 16px;
            line-height: 16px;
          }
          @media (max-width: $phone-l) {
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
    }
    .burger-menu__headline {
      @include default-headline(48px, 48px, var(--color-burger-menu-text));
      margin-bottom: 20px;
      text-align: center;
    }
    .burger-menu__theme-switch {
      margin-bottom: 30px;
    }
    .burger-menu__nav-list {
      margin-bottom: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      .burger-menu__nav-list-item {
        padding: 20px;
        border: 3px solid var(--color-burger-menu-link-borders);
        border-radius: 10px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          transform: scale(1.2);
          border: 3px solid var(--color-burger-menu-link);
          .burger-menu__link {
            color: var(--color-burger-menu-link);
          }
        }
        @media (max-width: $phone-l) {
          padding: 15px;
        }
        .burger-menu__link {
          @include default-text(36px, 36px, var(--color-burger-menu-text));
          text-decoration: none;
          transition: 0.3s;
          @media (max-width: $phone-l) {
            font-size: 32px;
            line-height: 32px;
          }
        }
      }
    }
    .burger-menu__github-link {
      padding: 15px;
      margin: auto auto 0;
      max-width: 280px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
      border: 3px solid var(--color-burger-menu-link-borders);
      border-radius: 10px;
      text-decoration: none;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
        .burger-menu__github-label {
          color: var(--color-burger-menu-link);
        }
      }
      @media (max-width: $phone-l) {
        padding: 10px;
        text-align: center;
      }
      .burger-menu__github-img {
        width: 30px;
        height: 30px;
      }
      .burger-menu__github-label {
        transition: 0.3s;
        @include default-text(20px, 20px, var(--color-burger-menu-text));
        @media (max-width: $tablet-l) {
          font-size: 16px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
