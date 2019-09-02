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
