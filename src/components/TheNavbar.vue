<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="position-relative container-fluid px-4 py-2">
      <div class="navbar-brand user-select-none">
        <img
          src="@/assets/images/logo.svg"
          alt="program logo"
          width="32"
          height="32"
        />
        <span class="ms-2 test-my-heading-Eczar" style="color: #7cb7e1"
          >Export Points</span
        >
      </div>
      <button class="btn btn-dark" type="button" @click="showMenu = !showMenu">
        <span>
          <img
            v-if="showMenu"
            src="@/assets/images/x-lg.svg"
            alt="program logo"
            width="32"
            height="32"
          />
          <img v-else src="@/assets/images/menuBtn.svg" alt="program logo" />
        </span>
      </button>
      <!-- dropdown-->
      <div
        v-if="showMenu"
        class="p-3 border border-info rounded-4 text-bg-dark d-flex flex-column position-absolute side-dropdown scale-up-center"
      >
        <button class="btn btn-outline-danger mb-2">
          <div class="d-flex flex-column-reverse text-center">
            <span class="m-1">Reload</span>
            <span class="m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path
                  d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                />
              </svg>
            </span>
          </div>
        </button>
        <button class="btn btn-outline-danger mb-2">
          <div class="d-flex flex-column-reverse text-center">
            <span class="m-1">Reset</span>
            <span class="m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-journal-x"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"
                />
                <path
                  d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
                />
                <path
                  d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
                />
              </svg>
            </span>
          </div>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.side-dropdown {
  z-index: 3;
  top: 50px;
  right: 40px;
}
.scale-up-center {
  animation: myAnim 2s ease-in-out 0s 1 normal forwards;
}
@keyframes myAnim {
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }

  15% {
    transform: translateX(-30px) rotate(6deg);
  }

  30% {
    transform: translateX(15px) rotate(-6deg);
  }

  45% {
    transform: translateX(-15px) rotate(3.6deg);
  }

  60% {
    transform: translateX(9px) rotate(-2.4deg);
  }

  75% {
    transform: translateX(-6px) rotate(1.2deg);
  }
}
</style>
