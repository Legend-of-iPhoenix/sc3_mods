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