<script lang="ts">
  import ioClient from "socket.io-client";
  import { name } from "../store.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  const ENDPOINT = "http://localhost:3000";

  const socket = ioClient(ENDPOINT);

  let message = "";
  let messages = [];

  socket.on("message", (message) => {
    messages = [...messages, message];
  });

  socket.on("connected", ({ name }) => {
    messages = [...messages, `============= connected: ${name} =============`];
  });

  socket.on("disconnected", ({ name }) => {
    messages = [
      ...messages,
      `============= disconnected: ${name} =============`,
    ];
  });

  function sendMessage() {
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

    socket.emit("init", { name: $name });
  });
</script>

<input type="text" bind:value={message} placeholder="chat" />
<button on:click={sendMessage}>Send</button>
<ul>
  {#each messages as msg}
    <li>{msg}</li>
  {/each}
</ul>
