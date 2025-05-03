// Store credentials in chrome.storage.local
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SAVE_CREDENTIAL') {
    chrome.storage.local.get({credentials: []}, (result) => {
      const credentials = result.credentials;
      credentials.push(message.data);
      chrome.storage.local.set({credentials});
    });
  }
  // Required for async response in MV3, but not used here
  return false;
});

// Listen for requests to get all credentials
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_CREDENTIALS') {
    chrome.storage.local.get({credentials: []}, (result) => {
      sendResponse(result.credentials);
    });
    return true; // Keep the message channel open for sendResponse
  }
}); 