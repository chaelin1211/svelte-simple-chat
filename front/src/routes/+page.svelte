<script>
  import ioClient from "socket.io-client";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  const ENDPOINT = "http://localhost:3000";

  const socket = ioClient(ENDPOINT);

  let message = "";
  let name = "";
  let messages = [];

  socket.on("message", (message) => {
    console.log(message);
    messages = [...messages, message];
  });

  socket.on("disconnected", ({ connectors, name }) => {
    messages = [...messages, "disconnected: " + name];
  });

  function sendMessage(name, message) {
    socket.emit("message", { name, message });
  }
</script>

<input type="text" bind:value={name} placeholder="name" />
<input type="text" bind:value={message} placeholder="chat" />
<button on:click={sendMessage(name, message)}>Send</button>
<ul>
  {#each messages as msg}
    <li>{msg}</li>
  {/each}
</ul>
