const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse .env.local properly, ignoring comments
const lines = envContent.split('\n');
let uri = '';
for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^MONGODB_URI=['"]?([^'"\n]+)['"]?/);
    if (match) {
        uri = match[1];
        break; // Take the first valid non-commented URI
    }
}

if (!uri) {
    console.error('Could not find valid MONGODB_URI in .env.local');
    process.exit(1);
}

console.log('Testing connection to URI length:', uri.length);
// Masking password for log safety
console.log('URI structure:', uri.replace(/:([^:@]+)@/, ':****@'));

async function test() {
    try {
        console.log('Attempting to connect...');
        await mongoose.connect(uri);
        console.log('Connected successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Connection failed details:');
        console.error(err);
        process.exit(1);
    }
}

test();
