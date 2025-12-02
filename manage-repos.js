#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// The three Polkadot repos to add
const POLKADOT_REPOS = [
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

function addReposToProject(projectPath) {
  if (!fs.existsSync(projectPath)) {
    console.error(`❌ File not found: ${projectPath}`);
    return;
  }

  const projectData = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
  console.log(`\n📁 Project: ${projectData.name}`);
  console.log(`Current repos: ${projectData.repos.length}`);

  // Add repos (avoid duplicates)
  let added = 0;
  POLKADOT_REPOS.forEach(repo => {
    const exists = projectData.repos.find(r => r.id === repo.id);
    if (!exists) {
      projectData.repos.push(repo);
      console.log(`  ✓ Added: ${repo.name}`);
      added++;
    } else {
      console.log(`  ⊘ Already exists: ${repo.name}`);
    }
  });

  if (added > 0) {
    fs.writeFileSync(projectPath, JSON.stringify(projectData, null, 2));
    console.log(`\n✅ Updated! New repos count: ${projectData.repos.length}`);
  } else {
    console.log(`\n⊘ No changes made`);
  }
}

// Usage: node manage-repos.js [project-file.json]
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node manage-repos.js <project-file.json>');
  console.log('\nExample:');
  console.log('  node manage-repos.js examples/empty.project.json');
  console.log('  node manage-repos.js my-exported-project.json');
  process.exit(1);
}

const projectPath = args[0];
addReposToProject(projectPath);
