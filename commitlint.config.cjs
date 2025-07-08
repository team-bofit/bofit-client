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
  'merge',  // 소문자 merge도 허용
  'Merge',  // 대문자 Merge도 허용
];

const mergeCommitRegex = /^(merge|Merge)\s.+$/; // Merge로 시작하는 문장 전체 허용
const colonFormatRegex = /^(\w+):\s{1,2}(.+)$/; // type: message 형식

if (mergeCommitRegex.test(commitMessage)) {
  // Merge 커밋은 무조건 통과
  console.log('✅ Merge 커밋 - 통과');
  process.exit(0);
}

const match = commitMessage.match(colonFormatRegex);

if (!match) {
  console.error(`
❌ 커밋 실패 !
❗ 커밋 메시지는 "type: message" 형식이어야 하며, type과 message 사이에는 콜론(:)과 공백이 있어야 합니다.
예시: "feat: 로그인 기능 추가"
`);
  process.exit(1);
}

const type = match[1];

if (!allowedTypes.includes(type)) {
  console.error(`
❌ 커밋 실패 !
❗ "${type}"는 허용되지 않은 커밋 타입입니다.
허용 타입: ${allowedTypes.join(', ')}
`);
  process.exit(1);
}

console.log('✅ 커밋 성공 !');