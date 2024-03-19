<script lang="ts">
  import ioClient from "socket.io-client";
  import {name} from "../../store.js";
  import {goto} from "$app/navigation";
  import {onMount} from "svelte";

  const ENDPOINT = "http://localhost:3000";

  const socket = ioClient(ENDPOINT);

  let message = "";
  let messages = [];

  socket.on("message", ({name, message}) => {
    messages = [...messages, {name, message}];
  });

  socket.on("connected", ({name}) => {
    let message = `============= connected: ${name} =============`;
    messages = [...messages, {message}];
  });

  socket.on("disconnected", ({name}) => {
    let message = `============= disconnected: ${name} =============`;
    messages = [...messages, {message}];
  });

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("message", message);
    resetMessage();
  }

  function resetMessage() {
    message = "";
  }

  onMount(() => {
    name.subscribe((value) => {
      if (!value || value === "") {
        alert("이름을 입력하세요");
        goto("/first");
      }
    });

    socket.emit("init", {name: $name});
  });
</script>

<div class="bg-black text-white rounded-md p-2 mb-2 h-80 justify-end overflow-y-auto scrollbar-hide break-words">
    {#each messages as {name, message}}
        {#if !!name}
            <p><span class="text-red-200">{name}</span>{`: ${message}`}</p>
        {:else}
            <p>{message}</p>
        {/if}
    {/each}
</div>
<form on:submit={(e) => sendMessage(e)} class="flex space-x-2">
    <input class="block w-full rounded-full ring-1 ring-gray-400 py-0.5 px-3 focus:ring-2 focus:ring-blue-400 outline-0"  type="text" bind:value={message} placeholder="chat"/>
    <button type="submit" class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 -rotate-90">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        <span class="sr-only">Icon description</span>
    </button>

</form>
