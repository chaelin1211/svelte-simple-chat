<script lang="ts">
  import {goto} from "$app/navigation";
  import {name} from "../../store.js";
  import {onMount} from "svelte";

  let input = "";

  function enterChat(e, input: string) {
    e.preventDefault();
    sessionStorage.setItem("userName", input);
    name.set(input);
    goto("/chat");
  }

  onMount(() => {
    sessionStorage.setItem("userName", "");
  });
</script>

<form class="py-10 space-y-6" on:submit={(e) => enterChat(e, input)}>
  <div>
    <div class="mt-2">
      <input
              bind:value={input}
              id="name"
              name="name"
              type="text"
              placeholder="name"
              required
              class="block w-full rounded-md outline-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
  <div>
    <button
      title="입장"
      type="submit"
      class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >Enter
    </button>
  </div>
</form>