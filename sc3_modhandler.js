let sc3_mods = {};
class sc3_mod {
	/**
	 * @param {string} id
	 * @param {string} name
	 * @param {Function} func
	 * @param {?boolean=} buttonless
	 */
	constructor(id, name, func, buttonless) {
		console.log("Loaded Mod \"" + name + "\"");
		this.name = name;
		this.func = func;

		this.buttonless = buttonless;


		if (!this.buttonless) {
			// create button
			let mods_div = document.getElementById("sc3_mods");
			let button = document.createElement("button");

			button.classList.add("sc3_interface_button");

			button.onclick = this.func;
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
