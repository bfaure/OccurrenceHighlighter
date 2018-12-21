// credit to Tim Down at https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text.trim();
}

// credit to Jason at https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
function selectText(node) {
    node = document.getElementById(node);
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}

var orig_html='';


window.addEventListener("mouseup", function(e){
	console.log(e);
	console.log(orig_html);
	//console.log("in addEventListener")
	let cur_text=getSelectionText();
	let cur_selection=window.getSelection();
	//console.log(cur_selection)
	//return;
	if (cur_text.length>0){
		orig_html=document.body.innerHTML
		document.body.innerHTML=document.body.innerHTML.split(cur_text).join("<span class=\'occurence-highlight\'>"+cur_text+"</span>");
		selectText(cur_selection);
	} else {
		if (orig_html.length>0){
			document.body.innerHTML=orig_html;
		}
	}

	// if (cur_text.length>0){
	// 	console.log(getSelectionText())
	// 	console.log("adding highlight");
	// 	var html = document.body.innerHTML; // get all inner html on page
	// 	orig_html=html;
	// 	let matches=html.split(cur_text);
	// 	let new_html='';
	// 	for (let i=0; i<matches.length-1; i+=1){
	// 		//console.log(matches[i]);
	// 		new_html+=matches[i];
	// 		new_html+="<span class=\'occurence-highlight\'>"+cur_text+"</span>";
	// 	}
	// 	new_html+=matches[matches.length-1];
	// 	document.body.innerHTML=new_html
	// 	//console.log(new_html)	

	// } else {
	// 	return;
	// 	console.log("stripping highlight");
	// 	// var html=document.body.innerHTML;
	// 	// html=html.split("<span class=\'occurence-highlight\'>").join("").split("</span class=\'occurence-highlight\'>").join("");
	// 	// document.body.innerHTML=html;	
	// 	var html=document.body.innerHTML;
	// 	let matches=html.split("<span class=\'occurence-highlight\'>");
	// 	let new_html='';
	// 	for (let i=0; i<matches.length-1; i+=1){
	// 		new_html+=matches[i];
	// 		matches[i+1]=matches[i+1].replace("</span>","");
	// 	}
	// 	new_html+=matches[matches.length-1];
	// 	document.body.innerHTML=new_html;	
	// }
});