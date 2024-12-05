<script>
  import { createEventDispatcher } from "svelte";

  export let isOpen = false; // 모달 열림 여부
  export let title = ""; // 모달 제목

  // 확인 이벤트
  const dispatch = createEventDispatcher();
  const callback = () => {
    dispatch("callback");
    closeModal();
  };

  function closeModal() {
    isOpen = false;
    title = "";
  }
</script>

{#if isOpen}
  <div class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <h2>{title}</h2>
        <button on:click={closeModal}>✖</button>
      </header>
      <slot />
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
</style>
