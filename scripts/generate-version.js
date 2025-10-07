/* Generates version.json at root level */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    // Source the master.sh file and get the CBIOPORTAL_VERSION
    const pathToEnv = path.join(__dirname, '..', 'env', 'master.sh');
    if (!fs.existsSync(pathToEnv)) {
        throw new Error(`Environment file not found: ${pathToEnv}`);
    }

    const version = execSync(
        `source ${pathToEnv} && echo $CBIOPORTAL_VERSION`,
        { stdio: 'pipe' }
    )
        .toString()
        .trim();
    const data = { version: version || '' };

    const outFile = path.join(path.join(__dirname, '..'), 'version.json');
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
} catch (error) {
    console.error('Error retrieving CBIOPORTAL_VERSION:', error);
}
