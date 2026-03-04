const fs = require('fs');
const { exec } = require('child_process');

require('dotenv').config(); // Load environment variables from .env file

const uploadToGit = (filePath) => {
    const gitUrl = process.env.GIT_URL; // Git repository URL from environment variables
    const gitToken = process.env.GIT_TOKEN; // Git authentication token from environment variables

    if (!gitUrl || !gitToken) {
        console.error('Git URL or Token is not set in environment variables.');
        return;
    }

    const fileName = filePath.split('/').pop();
    const tempDir = './temp-repo';

    // Clone the repository
    exec(`git clone ${gitUrl.replace('https://', `https://${gitToken}@`)}`, (cloneErr) => {
        if (cloneErr) {
            console.error('Error cloning repository:', cloneErr);
            return;
        }

        // Copy the file to the repository
        fs.copyFile(filePath, `${tempDir}/${fileName}`, (copyErr) => {
            if (copyErr) {
                console.error('Error copying file:', copyErr);
                return;
            }

            // Commit and push the file
            exec(
                `cd ${tempDir} && git add . && git commit -m "Add ${fileName}" && git push`,
                (pushErr) => {
                    if (pushErr) {
                        console.error('Error pushing to repository:', pushErr);
                    } else {
                        console.log('File uploaded successfully to Git.');
                    }

                    // Clean up temporary directory
                    fs.rmSync(tempDir, { recursive: true, force: true });
                }
            );
        });
    });
};

// Example usage
uploadToGit('./path/to/your/file.txt');