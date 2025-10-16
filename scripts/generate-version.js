/* Generates version.json at root level */
const fs = require('fs');
const path = require('path');

try {
    // Read the file and extract CBIOPORTAL_VERSION using a regex
    const pathToEnv = path.join(__dirname, '..', 'env', 'master.sh');
    if (!fs.existsSync(pathToEnv)) {
        throw new Error(`Environment file not found: ${pathToEnv}`);
    }

    const envContent = fs.readFileSync(pathToEnv, 'utf8');
    const match = envContent.match(
        /^\s*export\s+CBIOPORTAL_VERSION\s*=\s*["']?\$\{CBIOPORTAL_VERSION:-([^}"']+)/m
    );
    const version = match ? match[1].trim() : 'unknown';
    const data = { version };

    const outFile = path.join(__dirname, '..', 'version.json');
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
} catch (error) {
    console.error('Error retrieving CBIOPORTAL_VERSION:', error);
}
