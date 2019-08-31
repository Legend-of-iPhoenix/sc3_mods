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
  }


  // we store them as normal objects in JSON notation, but the rest of the code expects
  // the files to be sc3_file objects, convert them and assign the properties.
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

  // same here, we have a normal object, code expects a sc3_proj object.
  proj = new sc3_proj();
  Object.assign(proj, data); // copy the properties over

  // display the page
  proj.loadToPage(proj.projectCurIdx);
  proj.refreshProjectPane();
});