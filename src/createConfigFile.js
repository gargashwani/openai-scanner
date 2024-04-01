// Filename - createConfigFile.js
const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

function createConfigFile() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folders found.');
        return;
    }

    // Assuming we're working with the first workspace folder
    const rootDir = workspaceFolders[0].uri.fsPath;
    const scannerDir = path.join(rootDir, '.ai-scanner');
    const filePath = path.join(scannerDir, 'config.json');

    // Define default configuration data
    const defaultConfig = {
        "api_key": "your_api_key_here",
        "default_folder": "/path/to/default/folder",
        "max_files_to_scan": 1000,
        "excluded_folders": [
            'node_modules', 
            '.git', 
            'vendor', 
            '.vscode', 
            'public', 
            'resources', 
            'tests', 
            '.scannerwork', 
            'dist'
        ]
    };

    // Create the .vscode-scanner directory if it doesn't exist
    if (!fs.existsSync(scannerDir)) {
        fs.mkdirSync(scannerDir);
    }

    // Write the default configuration data to config.json
    fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2));

    vscode.window.showInformationMessage('Config file created at .vscode-scanner/config.json');
}

module.exports = {
    createConfigFile
};
