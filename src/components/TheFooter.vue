<template>
  <footer
    class="mt-auto text-white-50 border-top border-2 border-info d-flex py-3 px-4 justify-content-between"
    style="background-color: #3b4453"
  >
    <div class="d-flex align-items-start">
      <span class="text-muted text-sm-start">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 15.938a7.438 7.438 0 1 1 0-14.876 7.438 7.438 0 0 1 0 14.876ZM8.5 17a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"
            fill="currentColor"
          />
          <path
            d="m9.488 7-2.433.305-.087.403.478.089c.312.074.374.187.306.498l-.784 3.685c-.206.953.111 1.401.858 1.401.58 0 1.252-.268 1.557-.635l.093-.442a1.177 1.177 0 0 1-.728.261c-.293 0-.399-.205-.323-.566l1.063-5Zm.075-2.219a1.062 1.062 0 1 1-2.125 0 1.062 1.062 0 0 1 2.125 0Z"
            fill="currentColor"
          />
        </svg>
        Recording mode on ...
      </span>
    </div>
    <div class="align-items-end text-white">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12C7.5913 12 9.11742 11.3679 10.2426 10.2426C11.3679 9.11742 12 7.5913 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.63214 7.5913 0 6 0C4.4087 0 2.88258 0.63214 1.75736 1.75736C0.63214 2.88258 0 4.4087 0 6C0 7.5913 0.63214 9.11742 1.75736 10.2426C2.88258 11.3679 4.4087 12 6 12V12Z"
          fill="#FB5C5C"
        />
      </svg>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped></style>
