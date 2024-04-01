const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function createConfigWebView() {
    // Create a new webview panel
    const panel = vscode.window.createWebviewPanel(
        'configView',
        'Config Viewer',
        vscode.ViewColumn.One,
        {}
    );

    // Get path to config.json file
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folders found.');
        return;
    }
    const rootDir = workspaceFolders[0].uri.fsPath;
    const configPath = path.join(rootDir, '.ai-scanner', 'config.json');

    // Read config.json file content
    fs.readFile(configPath, 'utf-8', (err, data) => {
        if (err) {
            vscode.window.showErrorMessage('Error reading config.json file.');
            return;
        }

        // Update WebView content with config.json content
        panel.webview.html = `<html><body><pre>${data}</pre></body></html>`;
    });

    // Watch for changes in config.json file and update WebView content
    fs.watch(configPath, (eventType, filename) => {
        if (eventType === 'change' && filename === 'config.json') {
            fs.readFile(configPath, 'utf-8', (err, data) => {
                if (err) {
                    vscode.window.showErrorMessage('Error reading config.json file.');
                    return;
                }
                panel.webview.html = `<html><body><pre>${data}</pre></body></html>`;
            });
        }
    });
}

module.exports = {
    createConfigWebView
};
