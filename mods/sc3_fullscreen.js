new sc3_mod("fullscreen_toggle", "Toggle Fullscreen", (toggle) => {
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
