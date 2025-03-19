const { execSync } = require("child_process");
const fs = require("fs");

const FILE_NAME = "changes.txt"; // File to modify
const BRANCH_NAME = "main"; // Change if using a different branch

// Function to execute shell commands
const runCommand = (command) => {
    try {
        console.log(`Running: ${command}`);
        execSync(command, { stdio: "inherit" });
    } catch (error) {
        console.error(`Error running command: ${command}`);
        process.exit(1);
    }
};

// Check if inside a Git repo
if (!fs.existsSync(".git")) {
    console.error("This is not a Git repository!");
    process.exit(1);
}

// Loop to make 10 commits
for (let i = 1; i <= 10; i++) {
    fs.appendFileSync(FILE_NAME, `Change ${i}\n`); // Append text to the file

    runCommand(`git add ${FILE_NAME}`); // Stage changes
    runCommand(`git commit -m "Commit ${i} - Continuous change"`); // Commit
    runCommand(`git push origin ${BRANCH_NAME}`); // Push to GitHub

    console.log(`✅ Pushed commit ${i}`);
}

// Final message
console.log("🚀 All 10 commits pushed successfully!");
