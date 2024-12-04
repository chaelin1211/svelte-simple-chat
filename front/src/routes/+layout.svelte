<script>
  import "$lib/app.css";
  import { socket } from "$lib/socket.js";
  import { confirmState, modalState } from "../store.js";
  import Modal from "../components/Modal.svelte";
  import Confirm from "../components/Confirm.svelte";
  import { onMount } from "svelte";
  import { PUBLIC_SERVER } from "$env/static/public";

  function openNewTab(url) {
    window.open(url, "_blank");
  }

  let userCount = 0;
  socket.on("connected", ({ count }) => {
    userCount = count;
  });

  socket.on("disconnected", ({ count }) => {
    userCount = count;
  });

  onMount(async () => {
    const response = await fetch(PUBLIC_SERVER + "/user-count");
    if (response.ok) {
      const data = await response.json();
      userCount = data.count;
    }
  });
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-0">
  <div class="bg-white rounded-md mt-10 sm:mx-auto sm:w-full sm:max-w-md p-5">
    <a href="first" title="홈">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          ChatterBox👻
        </h2>
      </div>
    </a>
    <div
      class="flex justify-between tracking-tight text-sm"
      style="word-spacing: -0.2em"
    >
      <pre>now {userCount}</pre>
      <button
        type="button"
        on:click={() => openNewTab("https://github.com/chaelin1211")}
      >
        <pre
          class="cursor-pointer underline"
          title="github.com/chaelin1211 (new tab)">@chaelin1211</pre>
      </button>
    </div>
    <slot />
    <Confirm
      bind:isOpen={$confirmState.isOpen}
      content={$confirmState.content}
      on:callback={$confirmState.callback}
    />
    <Modal
      bind:isOpen={$modalState.isOpen}
      content={$modalState.content}
      on:callback={$modalState.callback}
    />
  </div>
</div>
