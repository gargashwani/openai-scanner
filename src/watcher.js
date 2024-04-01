const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

function watchConfigFileChanges(callback) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folders found.');
        return;
    }

    const rootDir = workspaceFolders[0].uri.fsPath;
    const configPath = path.join(rootDir, '.ai-scanner', 'config.json');

    fs.watch(configPath, (eventType, filename) => {
        if (eventType === 'change' && filename === 'config.json') {
            // Config file has changed, invoke callback
            callback();
        }
    });
}

module.exports = {
    watchConfigFileChanges
};
