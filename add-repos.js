#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Repositories to add
const newRepos = [
  {
    id: 'repo.substrate-connect',
    name: 'substrate-connect',
    remoteUrl: 'https://github.com/paritytech/substrate-connect',
    teamIds: [],
    contributors: []
  },
  {
    id: 'repo.smoldot',
    name: 'smoldot',
    remoteUrl: 'https://github.com/smol-dot/smoldot',
    teamIds: [],
    contributors: []
  },
  {
    id: 'repo.polkadot-sdk',
    name: 'polkadot-sdk',
    remoteUrl: 'https://github.com/paritytech/polkadot-sdk',
    teamIds: [],
    contributors: []
  }
];

// Read the current project file
const projectPath = path.join(__dirname, 'examples', 'sample.project.json');
const projectData = JSON.parse(fs.readFileSync(projectPath, 'utf8'));

console.log(`Current repos count: ${projectData.repos.length}`);

// Add new repos (avoid duplicates)
newRepos.forEach(repo => {
  const exists = projectData.repos.find(r => r.id === repo.id);
  if (!exists) {
    projectData.repos.push(repo);
    console.log(`✓ Added: ${repo.name}`);
  } else {
    console.log(`⊘ Already exists: ${repo.name}`);
  }
});

console.log(`New repos count: ${projectData.repos.length}`);

// Write back to file
fs.writeFileSync(projectPath, JSON.stringify(projectData, null, 2));
console.log('\n✅ Project file updated successfully!');
console.log('Reload the app to see the new repositories.');
