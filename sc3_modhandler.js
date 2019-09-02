let sc3_mods = {};

/**
 * @enum {number}
 * Even types have a button, odd ones do not.
 */
let sc3_mod_types = {
	BUTTON: 0,
	INTERNAL: 1,
	BUTTON_TOGGLE: 2
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
