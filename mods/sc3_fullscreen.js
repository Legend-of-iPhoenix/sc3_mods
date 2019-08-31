let sc3mod_isFullscreen = false;
new sc3_mod("fullscreen_toggle", "Toggle Fullscreen", () => {
  [
    "#user_tools_parent",
    "#sidebar_parent",
    "#sc3_container>div.gradient_edge",
    "#sc3_columns>.jstified_edge",
    "#sc3_columns>.jstified_edge2",
    "#sc3_columns>.jstified_shutter"
  ].map(selector => {
    document.querySelector(selector).style.display = sc3mod_isFullscreen ? "" : "none";
  });

  let pcp = document.querySelector("#page_content_parent");
  pcp.style.width = sc3mod_isFullscreen ? "" : "100%";
  pcp.style.overflow = sc3mod_isFullscreen ? "" : "initial";

  sc3mod_isFullscreen = !sc3mod_isFullscreen;
});