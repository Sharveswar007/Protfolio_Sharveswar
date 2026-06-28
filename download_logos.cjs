const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/images/awards');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const logos = {
    'salesforce.svg': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    'aws.svg': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    'srm.png': 'https://upload.wikimedia.org/wikipedia/en/f/f5/SRM_University_logo.png',
    'nptel.png': 'https://icon.horse/icon/nptel.ac.in',
    'hackerrank.svg': 'https://cdn.simpleicons.org/hackerrank/ffffff',
    'hackathon.svg': 'https://cdn.simpleicons.org/devpost/ffffff'
};

Object.entries(logos).forEach(([filename, url]) => {
    const options = {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    };
    https.get(url, options, (res) => {
        if(res.statusCode === 200) {
            const file = fs.createWriteStream(path.join(dir, filename));
            res.pipe(file);
            console.log(`Downloaded ${filename}`);
        } else if (res.statusCode === 301 || res.statusCode === 302) {
            https.get(res.headers.location, options, (res2) => {
                if(res2.statusCode === 200) {
                    const file = fs.createWriteStream(path.join(dir, filename));
                    res2.pipe(file);
                    console.log(`Downloaded ${filename} (redirect)`);
                } else {
                    console.log(`Failed to download ${filename}: ${res2.statusCode}`);
                }
            });
        } else {
            console.log(`Failed to download ${filename}: ${res.statusCode}`);
        }
    }).on('error', (e) => {
        console.error(`Error downloading ${filename}: ${e.message}`);
    });
});
