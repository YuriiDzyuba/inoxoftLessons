const path = require('path')
const fs = require('fs').promises;

const sortSettings = {
    root: path.join(__dirname, "boysAndGirls"),
    girls: {
        folderPath: path.join(__dirname, "boysAndGirls", "girls"),
        key: `"gender": "female"`
    },
    boys: {
        folderPath: path.join(__dirname, "boysAndGirls", "boys"),
        key: `"gender": "male"`
    }
}

const sortFiles = async (rootPath) => {
    try {
        const innerFiles = await fs.readdir(rootPath)
        if (!innerFiles.length) return

        for (const file of innerFiles) {

            const currentFilePath = path.join(rootPath, file)
            const fileStat = await fs.stat(currentFilePath)

            if (fileStat.isDirectory()) {
                await sortFiles(currentFilePath)
            }
            if (fileStat.isFile()) {
                const fileContent = await fs.readFile(currentFilePath)
                if (fileContent.toString().indexOf(sortSettings.girls.key) !== -1) {
                    await fs.rename(currentFilePath, path.join(sortSettings.girls.folderPath, file))
                } else if (fileContent.toString().indexOf(sortSettings.boys.key) !== -1) {
                    await fs.rename(currentFilePath, path.join(sortSettings.boys.folderPath, file))
                }
            }
        }
    } catch (e) {
        console.log(e)
    }


}

sortFiles(sortSettings.root)