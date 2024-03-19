<script lang="ts">
  import { goto } from "$app/navigation";
  import { name } from "../../store.js";
  import { onMount } from "svelte";

  let input = "";

  function enterChat(input: string) {
    sessionStorage.setItem("userName", input);
    name.set(input);
    goto("/chat");
  }

  onMount(() => {
    sessionStorage.setItem("userName", "");
  });
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="bg-white rounded-md mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Simple Web Chat 🤐
      </h2>
    </div>
    <div class="p-10 space-y-6">
      <div>
        <label
          for="name"
          class="block text-sm font-medium leading-6 text-gray-900">name</label
        >
        <div class="mt-2">
          <input
            bind:value={input}
            id="name"
            name="name"
            type="text"
            required
            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button
          on:click={() => enterChat(input)}
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Enter
        </button>
      </div>
    </div>
  </div>
</div>
