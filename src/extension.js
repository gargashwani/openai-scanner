// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

async function analyzeProject (){
    console.log('analyzeProject function called');
    // const editor = vscode.window.activeTextEditor;
    // if (!editor) {
    //     vscode.window.showErrorMessage('No active editor found. Please open a file to analyze.');
    //     return;
    // }
    
    // const code = editor.document.getText();
    //     if (!code) {
    //     vscode.window.showErrorMessage('The active editor is empty. Please add some code to analyze.');
    //     return;
    // }
    // console.log(code);

    // Define excluded folders
    const excludedFolders = ['node_modules', '.git', 'vendor']; // Add any folders you want to exclude

    // Find all files in the workspace
    const files = await vscode.workspace.findFiles('**/*');

    // Filter out files from excluded folders
    const filteredFiles = files.filter(file => {
        const filePath = file.path;
        return !excludedFolders.some(folder => filePath.includes(folder));
    });


    // Retrieve file names
    const fileNames = filteredFiles.map(file => {
        const filePath = file.path;
        // Extract file name from file URI
        const fileName = filePath.split('/').pop();
        return fileName;
    });
    console.log('fileNames');
    console.log(fileNames);

    // return fileNames;
    // Display file names
    // vscode.window.showInformationMessage(`Files in project: ${fileNames.join(', ')}`);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    try {
        
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "openai-scanner" is now active!');

    let disposable = vscode.commands.registerCommand('openai-scanner.helloWorld', async () => {
        // const editor = vscode.window.activeTextEditor;
        // if (!editor) {
        //     vscode.window.showErrorMessage('No active editor found. Please open a file to analyze.');
        //     return;
        // }
        
        // const code = editor.document.getText();
        console.log("code");
        // console.log(code);
        // if (!code) {
        //     vscode.window.showErrorMessage('The active editor is empty. Please add some code to analyze.');
        //     return;
        // }
        
        const analysis = await analyzeProject("code");
        vscode.window.showInformationMessage("analysis done");
    });
    // scanAllNestedFileNames();
	context.subscriptions.push(disposable);
    } catch (error) {
        console.log(error);
    }
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
