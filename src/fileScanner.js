// Filename - fileScanner.js

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');


function saveFileNames(fileNames) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folders found.');
        return;
    }

    // Assuming we're working with the first workspace folder
    const rootDir = workspaceFolders[0].uri.fsPath;
    const scannerDir = path.join(rootDir, '.ai-scanner');
    const filePath = path.join(scannerDir, 'filelist.json');

    // Create the .vscode-scanner directory if it doesn't exist
    if (!fs.existsSync(scannerDir)) {
        fs.mkdirSync(scannerDir);
    }

    // Construct JSON object with file names and 'scanned' property set to false
    const fileList = fileNames.map(fileName => ({
        filename: fileName,
        scanned: false,
        timestamp: Date.now(), // Current timestamp
    }));

    // Write the JSON object to filelist.json
    fs.writeFileSync(filePath, JSON.stringify(fileList, null, 2));

    vscode.window.showInformationMessage('File names saved to filelist.json');
}

module.exports = {
    saveFileNames
};