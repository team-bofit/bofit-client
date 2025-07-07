const fs = require('fs');

const commitMsgFilePath = process.argv[2];
const commitMessage = fs.readFileSync(commitMsgFilePath, 'utf8').trim();

const allowedTypes = [
  'feat',
  'fix',
  'bug',
  'refactor',
  'design',
  'style',
  'docs',
  'test',
  'settings',
  'chore',
  'init',
  'rename',
  'remove',
  'build',
  'deploy',
  'Merge',
  'merge',
];

const commitRegex = /^(\w+):\s{1,2}(.+)$/;
const match = commitMessage.match(commitRegex);

if (!match) {
  console.error(`
❌ 커밋 실패 !
❗ 형식은 반드시 "type: message" 형태여야 하며, type과 message 사이엔 공백이 1개 이상 있어야 합니다.
`);
  process.exit(1);
}

const type = match[1];

if (!allowedTypes.includes(type.toLowerCase())) {
  console.error(`
❌ 커밋 실패 !
❗ "${type}"는 허용되지 않은 커밋 타입입니다.
`);
  process.exit(1);
}

console.log('커밋 성공 !');
