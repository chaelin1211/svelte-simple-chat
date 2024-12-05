<script lang="ts">
  import { goto } from "$app/navigation";
  import { name, openConfirm, openModal, roomCode } from "../../store.js";
  import { onMount } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import { PUBLIC_SERVER } from "$env/static/public";
  import ModalPopup from "../../components/ModalPopup.svelte";

  let nickNameInput = "";
  let roomCodeInput = "";
  let roomCodeModalShow = false;

  async function enterExistedRoom(e, nickNameInput, code = "ALL") {
    e.preventDefault();
    if (code !== "ALL") {
      // 존재하는 Room인지 확인
      const response = await fetch(
        PUBLIC_SERVER + `/room-check?roomId=${code}`,
      );
      if (response.ok) {
        const data = await response.json();
        if (!data.result) {
          openConfirm("존재하지 않는 방입니다. 새로 만드시겠습니까?", () =>
            enterRoom(nickNameInput, code),
          );
          return;
        }
      }
    }

    enterRoom(nickNameInput, code);
  }

  function enterRoom(nickNameInput, code = uuidv4()) {
    if (!checkName(nickNameInput)) return;
    sessionStorage.setItem("userName", nickNameInput);
    name.set(nickNameInput);
    roomCode.set(code);
    goto("/chat");
  }

  function roomInputOpen(nickNameInput) {
    roomCodeModalShow = checkName(nickNameInput);
  }

  function checkName(nickNameInput) {
    if (!nickNameInput) {
      openModal("이름을 먼저 입력하세요.");
      return false;
    }
    return true;
  }

  onMount(() => {
    sessionStorage.setItem("userName", "");
  });
</script>

<form
  class="py-10 space-y-6"
  on:submit={(e) => enterExistedRoom(e, nickNameInput)}
>
  <div>
    <div class="mt-2">
      <input
        bind:value={nickNameInput}
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
      on:click={() => enterRoom(nickNameInput)}
      class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >나만의 방 만들기
    </button>
  </div>
  <div>
    <button
      title="초대 입장"
      type="button"
      on:click={() => roomInputOpen(nickNameInput)}
      class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >초대 입장
    </button>
  </div>
</form>

<ModalPopup bind:isOpen={roomCodeModalShow} title="초대 코드 입력">
  <div>
    <div>
      <div class="mt-2">
        <input
          bind:value={roomCodeInput}
          name="roomCode"
          type="text"
          placeholder="name"
          required
          class="block w-full rounded-md outline-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
        />
      </div>
      <div>
        <button
          title="입장"
          type="button"
          on:click={(e) => enterExistedRoom(e, nickNameInput, roomCodeInput)}
          class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >입장
        </button>
        <button
          title="취소"
          type="button"
          on:click={() => (roomCodeModalShow = false)}
          class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >취소
        </button>
      </div>
    </div>
  </div>
</ModalPopup>
