const path = require('path');
const fs = require('fs').promises;

const sortSettings = {
    girls: {
        folderPath: path.join(__dirname, "girls"),
        key: `"gender": "female"`
    },
    boys: {
        folderPath: path.join(__dirname, "boys"),
        key: `"gender": "male"`
    }
}

const sortFiles = async (sortSettings) => {

    const folders = Object.keys(sortSettings);
    const allFiles = [];

    for (const folder of folders) {

        try {
            const innerFiles = await fs.readdir(path.join(__dirname, folder));

            for (const file of innerFiles) {

                const currentFilePath = path.join(__dirname, folder, file);
                const fileContent = await fs.readFile(currentFilePath);

                if (fileContent.toString().indexOf(sortSettings.girls.key) !== -1) {
                    allFiles.push(
                        {
                            currentPath: currentFilePath,
                            endPath: path.join(sortSettings.girls.folderPath, file)
                        }
                    )
                } else if (fileContent.toString().indexOf(sortSettings.boys.key) !== -1) {
                    allFiles.push(
                        {
                            currentPath: currentFilePath,
                            endPath: path.join(sortSettings.boys.folderPath, file)
                        }
                    )
                }
            }
        } catch (e) {
            console.log(e, "folder of folders");
        }
    }

    for (const file of allFiles) {
        try {
            if (file.currentPath !== file.endPath) {
                await fs.rename(file.currentPath, file.endPath);
            }
        } catch (e) {
            console.log(e);
        }
    }
}


sortFiles(sortSettings);


