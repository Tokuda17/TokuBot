chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["bovada.js"],
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "runContentScript") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["bovada.js"],
    });
    sendResponse({ status: "executed" });
  }
});
