// Filename - extension.js
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { analyzeProject } = require('./projectScanner');
const { createConfigFile } = require('./createConfigFile');
const { watchConfigFileChanges } = require('./watcher');

async function activate(context) {
    createConfigFile();
    let disposable = vscode.commands.registerCommand('openai-scanner.helloWorld', async () => {
            // Watch for changes in config.json file
        watchConfigFileChanges(() => {
            // When config file changes, re-analyze project or update functionality
            analyzeProject();
        });
        analyzeProject();

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
