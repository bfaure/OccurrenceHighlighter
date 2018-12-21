// low-level function to make a GET HTTP request, returns response data
function get_http_xml(url)
{
	var xml_http = new XMLHttpRequest();
	xml_http.open("GET",url,false);
	xml_http.send(null);
	return xml_http.responseText;
}

chrome.runtime.onMessage.addListener(
	function(meta, sender, sendResponse)
{
	if (meta.func == 'get_url')
	{
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs)
		{
			sendResponse({data: tabs[0].url});

		});
	}

  if (meta.func == 'get_remote_data')
  {
      sendResponse({data: get_http_xml(meta.url)});
  }

  if (meta.func == 'open_tab')
  {
    chrome.tabs.create({'url': meta.url});
  }

	return true;
});

/*
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	//chrome.tabs.executeScript({file: 'js/popup.js'})
  if (changeInfo.status == 'complete') {
    chrome.tabs.executeScript({
          file: 'js/popup.js'
    });

  }
})
*/


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	console.log("here")
  if (changeInfo.status == 'complete') {
    chrome.tabs.executeScript({
          file: 'js/popup.js'
    });

  }
})


console.log("backgroun 2");	




