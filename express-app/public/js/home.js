window.addEventListener("DOMContentLoaded", function () {
  const socket = io();
  const form = document.getElementById("form");
  const inputTxt = document.getElementById("about");
  const username = document.getElementById("username");
  const msgList = document.getElementById("message_list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputTxt.value) {
      socket.emit("chat_message", {
        message: inputTxt.value,
        username: username.value,
      });
      inputTxt.value = "";
      username.value = "";
    }
  });

  socket.on("chat_message", (msg) => {
    let msgHTML = `<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900">${msg.username}</dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">${msg.message}</dd>
  </div>`;
    msgList.innerHTML = msgList.innerHTML + msgHTML;
  });
});
