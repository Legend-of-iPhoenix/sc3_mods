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
}, true /* buttonless/internal */ );

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