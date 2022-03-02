
chrome.tabs.onUpdate.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status === 'complete'){
    chrome.tabs.executeScript({
      file: 'content.js'
    })
  }
})