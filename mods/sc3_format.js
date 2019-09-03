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
});