<script lang="ts">
  import { goto } from "$app/navigation";
  import { name, roomCode } from "../../store.js";
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  let input = "";

  function enterChat(e, input: string, code = "ALL") {
    e.preventDefault();
    sessionStorage.setItem("userName", input);
    name.set(input);
    roomCode.set(code);
    goto("/chat");
  }

  function createNewRoom(e, input) {
    enterChat(e, input, uuidv4());
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
      title="모든 사람 만나기"
      type="submit"
      class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >모든 사람 만나기
    </button>
  </div>
  <div>
    <button
      title="나만의 방 만들기"
      type="button"
      on:click={(e) => createNewRoom(e, input)}
      class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >나만의 방 만들기
    </button>
  </div>
</form>
