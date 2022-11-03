import { FuzzySuggestModal, Plugin } from "obsidian";

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {
				new BugExampleModal(this.app).open();
			},
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class BugExampleModal extends FuzzySuggestModal<string> {
	getItems(): string[] {
		return ["choose me"];
	}

	getItemText(item: string): string {
		return item;
	}

	onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
		console.log(item);
	}
}
