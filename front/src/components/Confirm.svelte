<script>
  import { closeConfirm } from "../store.js";
  import { createEventDispatcher } from "svelte";

  export let isOpen = false;
  export let title = ""; // 모달 제목
  export let content = "";

  const dispatch = createEventDispatcher();

  // 확인 이벤트
  function callback() {
    dispatch("callback");
    closeConfirm();
  }
</script>

{#if isOpen}
  <div class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h2>{title}</h2>
        <button type="button" on:click={closeConfirm}>✖</button>
      </header>
      <main class="modal-content">
        <slot>{content}</slot>
      </main>
      <footer class="modal-footer">
        <button on:click={callback}>확인</button>
        <button on:click={closeConfirm}>close</button>
      </footer>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    min-width: 300px;
    max-width: 500px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-content {
    margin: 1rem 0;
  }

  .modal-footer {
    text-align: right;
  }
</style>
