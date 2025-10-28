/* Generates version.json at root level */
const fs = require('fs');
const path = require('path');

function readFromEnv() {
    return (
        process.env.CBIOPORTAL_VERSION && process.env.CBIOPORTAL_VERSION.trim()
    );
}

function readFromMasterSh() {
    const pathToEnv = path.join(__dirname, '..', 'env', 'master.sh');
    if (!fs.existsSync(pathToEnv)) {
        throw new Error(`Environment file not found: ${pathToEnv}`);
    }
    const envContent = fs.readFileSync(pathToEnv, 'utf8');
    const match = envContent.match(
        /^\s*export\s+CBIOPORTAL_VERSION\s*=\s*["']?\$\{CBIOPORTAL_VERSION:-([^}"']+)/m
    );
    return match ? match[1].trim() : null;
}

try {
    const version = readFromEnv() || readFromMasterSh() || 'unknown';

    const outFile = path.join(__dirname, '..', 'version.json');
    fs.writeFileSync(outFile, JSON.stringify({ version }, null, 2));
} catch (error) {
    console.error('Error retrieving CBIOPORTAL_VERSION:', error);
}
