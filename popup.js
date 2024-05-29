document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("run-script").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "runContentScript" }, (response) => {
      console.log(response.status);
    });
  });
});
