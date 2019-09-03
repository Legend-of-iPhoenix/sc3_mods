let sc3_mods = {};

/**
 * @enum {number}
 * Even types have a button, odd ones do not.
 */
let sc3_mod_types = {
	BUTTON: 0,
	INTERNAL: 1,
	BUTTON_TOGGLE: 2,
	SELECT: 3
}
class sc3_mod {
	/**
	 * @param {string} id
	 * @param {string} name
	 * @param {Function} func
	 * @param {sc3_mod_types=} type
	 */
	constructor(id, name, func, type) {
		console.log("Loaded Mod \"" + name + "\"");
		type = type || sc3_mod_types.BUTTON;
		this.name = name;
		this.func = func;

		this.type = type;


		if (!(type % 2)) {
			// create button
			let mods_div = document.getElementById("sc3_mods");
			let button = document.createElement("button");

			button.classList.add("sc3_interface_button");

			if (type == sc3_mod_types.BUTTON_TOGGLE) {
				this.toggle = false;
				button.onclick = () => {
					this.func(this.toggle);
					this.toggle = !this.toggle;
				};
			} else {
				button.onclick = this.func;
			}
			
			button.innerText = name;

			mods_div.appendChild(button);
		}

		sc3_mods[id] = this;
	}

	static init() {
		let buttons = document.getElementById("proj_buttons");

		let div = document.createElement("div");
		div.classList.add("project_pane");
		div.id = "sc3_mods";

		buttons.appendChild(div);
	}
}

sc3_mod.init();
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
new sc3_mod("format_basic", "Format TI-BASIC", (lines) => {
  const INDENTATION = "  ";
  let depth = 0;

  return lines.map(line => {
    line = line.trimStart();

    if (line.startsWith("End") || line.startsWith("Else")) {
      depth--;
    }

    let indented = line;
    if (depth) {
      indented = INDENTATION.repeat(depth) + line;
    }

    if (line.startsWith("Then") ||
      line.startsWith("While") ||
      line.startsWith("Repeat") ||
      line.startsWith("For(") ||
      line.startsWith("Else")) {
      depth++;
    }

    return indented;
  });
}, sc3_mod_types.INTERNAL);

new sc3_mod("format", "Format Code", () => {
  let file = proj.files[proj.projectCurIdx];

  let currentType = file.subType;

  let lines = file.data.split("\n");

  switch (currentType) {
    // basic subtypes
  case "84+CSE": // gosh darn it, why are these so weird
  case "Tokens":
    file.data = sc3_mods["format_basic"].func(lines).join("\n");

    proj.loadToPage(proj.projectCurIdx);
    proj.refreshProjectPane();
    break;
  default:
    $.msgBox({
      type: "error",
      icon: "/sc/img/64x64_error.png",
      title: "Current file type not supported",
      content: "Currently, I only support formatting TI-BASIC programs."
    });
  }
});new sc3_mod("fullscreen_toggle", "Toggle Fullscreen", (toggle) => {
  [
    "#user_tools_parent",
    "#sidebar_parent",
    "#sc3_container>div.gradient_edge",
    "#sc3_columns>.jstified_edge",
    "#sc3_columns>.jstified_edge2",
    "#sc3_columns>.jstified_shutter"
  ].map(selector => {
    document.querySelector(selector).style.display = toggle ? "" : "none";
  });

  let pcp = document.querySelector("#page_content_parent");
  pcp.style.width = toggle ? "" : "100%";
  pcp.style.overflow = toggle ? "" : "initial";

  let cw = document.querySelector("#content_wrapper");
  cw.style.maxWidth = toggle ? "80rem" : "";
}, sc3_mod_types.BUTTON_TOGGLE);
new sc3_mod("local_save", "Save Project Locally", () => {
  // just in case, though this should never throw an error under normal use.
  try {
    localStorage.setItem("proj", JSON.stringify(proj));
  } catch (err) {
    console.error(err);
    setEdMsgBad("There was an error saving your project locally.");
    return;
  }

  setEdMsgOK("Saved local copy of project successfully.");
});

new sc3_mod("local_load", "Load Local Project", () => {
  /** @type {Object|null|undefined} */
  let data = undefined;
  try {
    data = /** @type {Object|null|undefined} */ (JSON.parse(localStorage.getItem("proj")));
  } catch (err) {
    $.msgBox({
      type: "error",
      icon: "/sc/img/64x64_error.png",
      title: "Failed to read data from local storage.",
      content: "Your data may have been invalid, erased, or too large."
    });

    return;
  }

  if (data == null) {
    $.msgBox({
      type: "error",
      icon: "/sc/img/64x64_error.png",
      content: "No local save was found."
    });

    return;
  }

  if (sc3_mods["parse_text"].func(data)) {
    setEdMsgOK("Loaded local copy of project successfully.");
  }
});
new sc3_mod("export_text", "Export Project as Text", () => {
  createTextDialog(JSON.stringify(proj), true);
});

new sc3_mod("parse_text", "Text Parser", (data) => {
  // we store files as normal objects in JSON notation, but the rest of the code expects
  // the files to be sc3_file objects, convert them and assign the properties.
  try {
    let length = proj.files.length;
    for (let i = 0; i < length; i++) {
      /** @type {Object|null} */
      let file = data.files[i];

      if (file) {
        // args required by constructor because, uhh, ???
        // not my code :V
        let newfile = new sc3_file(file.type, file.subType);

        Object.assign(newfile, file);

        data.files[i] = newfile;
      } else {
        delete data.files[i];
      }
    }
  } catch (e) {
    console.error(e);
    $.msgBox({
      type: "error",
      icon: "/sc/img/64x64_error.png",
      title: "Failed to load project from text",
      content: "The data was formatted improperly."
    });

    return false;
  }

  // same here, we have a normal object, code expects a sc3_proj object.
  proj = new sc3_proj();
  Object.assign(proj, data); // copy the properties over

  // display the page
  proj.loadToPage(proj.projectCurIdx);
  proj.refreshProjectPane();

  return true;
}, sc3_mod_types.INTERNAL);

new sc3_mod("load_text", "Import Project from Text", () => {
  /* If you haven't noticed, I'm quite lazy */
  let data = prompt("Paste the text here. \n THIS WILL OVERWRITE YOUR CURRENT PROJECT");

  if (data == null) {
    $.msgBox({
      type: "error",
      icon: "/sc/img/64x64_error.png",
      title: "No text inputted.",
      content: ""
    });

    return;
  }

  data = JSON.parse(data);

  if (sc3_mods["parse_text"].func(data)) {
    setEdMsgOK("Loaded project from text successfully!");
  }
});
const THEMES = ["neat", "default", "3024-day", "3024-night", "abcdef", "ambiance", "base16-dark", "base16-light", "bespin", "blackboard", "cobalt", "colorforth", "darcula", "dracula", "duotone-dark", "duotone-light", "eclipse", "elegant", "erlang-dark", "gruvbox-dark", "hopscotch", "icecoder", "idea", "isotope", "lesser-dark", "liquibyte", "lucario", "material", "material-darker", "material-palenight", "material-ocean", "mbo", "mdn-like", "midnight", "monokai", "moxer", "neo", "night", "nord", "oceanic-next", "panda-syntax", "paraiso-dark", "paraiso-light", "pastel-on-dark", "railscasts", "rubyblue", "seti", "shadowfox", "solarized", "the-matrix", "tomorrow-night-bright", "tomorrow-night-eighties", "ttcn", "twilight", "vibrant-ink", "xq-dark", "xq-light", "yeti", "yonce", "zenburn"];
let loadedThemes = {
  default: true,
  neat: true
};

let select = document.createElement("select");
select.name = "theme";
select.innerHTML = THEMES.map(theme => "<option>" + theme + "</option>").join("\n");

let label = document.createElement("label");
label.for = "theme";
label.innerText = "Theme: ";

select.oninput = (event) => {
  let theme = event.target.value;
  if (!loadedThemes[theme]) {
    let stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";

    stylesheet.href = "https://codemirror.net/theme/" + theme + ".css";

    document.body.appendChild(stylesheet);
    loadedThemes[theme] = true;
  }

  myCodeMirror.setOption("theme", theme);
}

let mods_div = document.getElementById("sc3_mods");
mods_div.appendChild(label);
mods_div.appendChild(select);