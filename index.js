#!/usr/bin/env node

var { RegisterFreebox } = require("freebox-wrapper")
const { prompt } = require("inquirer")
const fetch = require("node-fetch")
const serverDomain = process.argv[2] || "https://api-freeboxnotifier.vercel.app"
console.log(`API: ${serverDomain}\n`)

async function main(){
	// Afficher le message d'accueil
	console.log("Bienvenue dans l'assistant de configuration de Freebox Call Notifier.")
	console.log("Cet assistant vous aidera à authentifier notre service auprès de votre Freebox. Vous devrez être connecté au réseau WiFi de votre Freebox pour continuer.")
	console.log("\x1b[33m%s\x1b[0m", "Un message sera affiché sur l'écran du Server pour vous demander de confirmer l'authentification.\n")

	// Demander à l'utilisateur de confirmer
	const { confirm } = await prompt([
		{
			type: "confirm",
			name: "confirm",
			message: "Voulez-vous continuer ?"
		}
	])

	// Si l'utilisateur ne veut pas continuer, on quitte
	if(!confirm) process.exit(0)

	// Créer une instance de RegisterFreebox
	const register = await RegisterFreebox({
		showLogs: true, // affiche les logs dans la console, true par défaut
		appId: "fbx.notifier",
		appName: "Call Notifier",
		appVersion: "1.0.0",
		deviceName: "le CLI"
	})

	// On vérifie les informations
	if(!register.appToken || !register.apiDomain || !register.httpsPort){
		console.log(`Impossible de récupérer les informations de connexion.${register.msg ? ` Message d'erreur : ${register.msg}` : " Veuillez réessayer."}`)
		return process.exit(1)
	}

	// Log
	console.log("Envoi des informations au serveur de Call Notifier :")
	console.log(JSON.stringify({
		appToken: register.appToken,
		apiDomain: register.apiDomain,
		httpsPort: register.httpsPort
	}))

	// Demander un code d'association à l'API
	var code = await fetch(`${serverDomain}/associateBoxWithTelegram`, {
		method: "POST",
		body: JSON.stringify({
			appToken: register.appToken,
			apiDomain: register.apiDomain,
			httpsPort: register.httpsPort
		}),
		headers: { "Content-Type": "application/json" }
	}).then(res => res.text())

	// On tente de parser en JSON
	try { code = JSON.parse(code) }
	catch(e) {
		console.log("Impossible de récupérer la réponse du serveur distant, celui-ci est peut-être indisponible. Réessayez plus tard.")
	}

	// Si on a une erreur, on l'affiche
	if(!code?.success || !code?.code) return console.log("Une erreur est survenue lors de la récupération du code d'association :", code?.message || code?.error || code?.statusCode || code)

	// On affiche le code d'association en gras
	console.log("Code d'association :", code.code)
	console.log("Veuillez vous rendre sur Telegram et envoyer un message au bot contenant ce code pour terminer le processus d'association.")
}
main()