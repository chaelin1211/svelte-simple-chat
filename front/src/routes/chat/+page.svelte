<script lang="ts">
  import { name, roomCode } from "../../store.js";
  import { goto } from "$app/navigation";
  import { onDestroy, onMount, tick } from "svelte";
  import { socket } from "$lib/socket.js";

  let message = "";
  let messages = [];
  let chatElement;
  let roomCount = 0;

  socket.on("message", async ({ id, name, color, message }) => {
    messages = [...messages, { id, color, name, message }];
    // UI 업데이트 사이클이 끝나고 나서 작업을 실행하기 위해 tick 사용
    await tick();
    await scrollToBottom(chatElement);
  });

  socket.on("connected", async ({ name, roomSize, color }) => {
    let message = `🌏<span style="color: ${color}">${name}</span> 님이 입장했습니다🙋‍♀️`;
    messages = [...messages, { message }];
    roomCount = roomSize;
    await tick();
    await scrollToBottom(chatElement);
  });

  socket.on("disconnected room", async ({ name, color, roomSize }) => {
    let message = `🛸<span style="color: ${color}">${name}</span> 님이 떠났습니다👽`;
    messages = [...messages, { message }];
    roomCount = roomSize;
    await tick();
    await scrollToBottom(chatElement);
  });

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("message", { message, code: $roomCode });
    resetMessage();
  }

  function resetMessage() {
    message = "";
  }

  const scrollToBottom = async (node) => {
    !!node && node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };

  onMount(() => {
    name.subscribe((value) => {
      if (!value || value === "") {
        alert("이름을 입력하세요");
        goto("/first");
      }
    });

    console.log("join chat");
    socket.emit("join", { name: $name, code: $roomCode });
  });

  onDestroy(() => {
    console.log("leave chat");
    socket.emit("leave");
    roomCode.set(undefined);
  });
</script>

{#if !!$roomCode}
  <div>Code: {$roomCode}, now {roomCount} in this room</div>
{/if}

<div
  bind:this={chatElement}
  class="bg-black text-white rounded-md p-2 mb-2 h-80 justify-end overflow-y-auto scrollbar-hide break-words text-xs"
>
  {#each messages as { name, color, message }}
    {#if !!name}
      <p>
        <span class="text-red-200" style="color: {color}">{name}</span
        >{`: ${message}`}
      </p>
    {:else}
      <p>{@html message}</p>
    {/if}
  {/each}
</div>
<form on:submit={(e) => sendMessage(e)} class="flex space-x-2">
  <input
    class="block w-full rounded-full ring-1 text-gray-900 ring-gray-300 placeholder:text-gray-400 py-0.5 px-3 focus:ring-2 focus:ring-blue-400 outline-0 sm:text-sm sm:leading-6"
    type="text"
    bind:value={message}
    placeholder="send ..."
  />
  <button
    title="입력"
    type="submit"
    class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 -rotate-90"
  >
    <svg
      class="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
    <span class="sr-only">Icon description</span>
  </button>
</form>
