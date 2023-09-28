const { FreeboxRegister } = require("freebox");
const inquirer = require("inquirer");

async function main() {

	// Demander le @ telegram de l'utilisateur
	const username = await inquirer.prompt([
		{
			type: "input",
			name: "telegram",
			message: "Veuillez entrer votre @ telegram",
		}, 
	]);


	const freeboxRegister = new FreeboxRegister({
		app_id: "fbx.telegram_notifier",
		app_name: "Call Notifier",
		app_version: "1.0.0",
		device_name: "Telegram",
	});

	console.log("Regardez votre freebox un message est apparu !")
	console.log("Veuillez accepter la demande d'authentification sur votre box.")

	const access = freeboxRegister.register();

	return username.telegram, access.app_token, access.app_id, access.api_domain, access.https_port, access.api_base_url, access.api_version;

}
main().catch((err) => console.error(err));
