const vscode = require('vscode');
const { saveFileNames } = require('./fileScanner');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
async function analyzeProject (){
    console.log('analyzeProject function called');

    // Define excluded folders
    const excludedFolders = ['node_modules', '.git', 'vendor', '.vscode', 'public', 'resources', 'tests', '.scannerwork']; // Add any folders you want to exclude

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