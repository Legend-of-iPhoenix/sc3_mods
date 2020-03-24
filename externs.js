/** @nocompile @extern */

/**
 * @param {string} text
 * @param {boolean} someparamidk
 */
function createTextDialog(text, someparamidk) {}

let myCodeMirror = {};

/**
 * @param {string} option
 * @param {string} value
 */
myCodeMirror["setOption"] = function(option, value) {};

let $ = {};

$["msgBox"] = function (msgdata) {};

let proj = {};

let localStorage = {
  "setItem": function (item, value) {},
  "getItem": /* @return {string} */ function (item) {}
};

class sc3_file {
  /**
   * @param {string} type
   * @param {string} subType
   */
  constructor(type, subType) {
    this["type"] = type;
    this["subType"] = subType;
  }
}

class sc3_proj {
  constructor() {
    /** @type {Array<Object>} */
    this["files"] = [];

    /** @type {boolean} */
    this["projectNew"] = false;

    /** @type {boolean} */
    this["projectOpen"] = false;

    /** @type {boolean} */
    this["projectSaved"] = false;

    /** @type {boolean} */
    this["projectSaveIncremental"] = false;

    /** @type {number} */
    this["projectID"] = 0;

    /** @type {boolean} */
    this["projectShared"] = false;

    /** @type {boolean} */
    this["projectFromFile"] = false;

    /** @type {boolean} */
    this["projectFromSaved"] = false;

    /** @type {string} */
    this["projectType"] = "";

    /** @type {number} */
    this["projectCurIdx"] = 0;

    /** @type {number} */
    this["projectOldIdx"] = 0;

    /** @type {string} */
    this["projectName"] = "";

    /** @type {number} */
    this["autoSaveTimer"] = 0;

    /** @type {string} */
    this["projectSubtype"] = "";
  }

  reset() {}

  addFile() {}

  deleteFile() {}

  saveFromPage() {}

  resetPanes() {}

  loadToPage(index) {}

  refocus() {}

  remove() {}

  autosave() {}

  timedsave() {}

  setChanged() {}

  updateSharedUI() {}

  refreshProjectPane() {}

  setValidators() {}

  validNumStr() {}
}

function setEdMsgBad(message) {}

function setEdMsgOK(message) {}

let sc3_settings = {
  "arghint": true,
  "syncolor": true,
  "spriteedit": true,
  "indent": true,
  "indent_width": 4,
  "indent_type": "tabs"
};
