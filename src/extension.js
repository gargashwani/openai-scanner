// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { analyzeProject } = require('./projectScanner');

async function activate(context) {
    let disposable = vscode.commands.registerCommand('openai-scanner.helloWorld', async () => {
        await analyzeProject("code");
        // vscode.window.showInformationMessage("Analysis done");
    });
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
