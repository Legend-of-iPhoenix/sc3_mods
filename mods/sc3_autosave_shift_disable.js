let tokenize_result = document.getElementById("tokenize_result");
tokenize_result.style.boxSizing = "border-box";
tokenize_result.style.margin = "0";
let wrapper = document.createElement("div");
wrapper.style.padding = "4px";
tokenize_result.parentNode.insertBefore(wrapper, tokenize_result);
wrapper.appendChild(tokenize_result);

new sc3_mod("autosave_shifting_disable", "Toggle Autosave Shifting", (toggle) => {
	wrapper.style.minHeight = toggle ? "" : "37px";
}, sc3_mod_types.BUTTON_TOGGLE);
