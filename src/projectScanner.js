// Filename - projectScanner.js
const vscode = require('vscode');
const { saveFileNames } = require('./fileScanner');

const fs = require('fs');
const path = require('path');

function loadConfig() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folders found.');
        return null;
    }

    // Assuming we're working with the first workspace folder
    const rootDir = workspaceFolders[0].uri.fsPath;
    const configPath = path.join(rootDir, '.ai-scanner', 'config.json');

    try {
        const rawData = fs.readFileSync(configPath);
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error loading config file:', error);
        return null;
    }
}

// Example usage
const config = loadConfig();
if (config) {
    console.log('API Key:', config.api_key);
    console.log('Default Folder:', config.default_folder);
    console.log('Max Files to Scan:', config.max_files_to_scan);
    console.log('Excluded Folders:', config.excluded_folders);
} else {
    console.error('Failed to load config.');
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
async function analyzeProject (){
    console.log('analyzeProject function called');

    // Define excluded folders
    // const excludedFolders = ['node_modules', '.git', 'vendor', '.vscode', 'public', 'resources', 'tests', '.scannerwork', 'dist']; // Add any folders you want to exclude
    const excludedFolders = config.excluded_folders; // Add any folders you want to exclude

    // Find all files in the workspace
    const files = await vscode.workspace.findFiles('**/*');

    // Filter out files from excluded folders
    const filteredFiles = files.filter(file => {
        const filePath = file.path;
        return !excludedFolders.some(folder => filePath.includes(folder));
    });

    saveFileNames(filteredFiles);
    // return fileNames;
    // Display file names
    vscode.window.showInformationMessage(`Files in project: ${filteredFiles.length}`);
}

module.exports = {  
    analyzeProject
}