# Changesets 팀 가이드

이 프로젝트는 [Changesets](https://github.com/changesets/changesets)를 사용하여 모노레포의 버전 관리를 자동화합니다.

## 🚀 일일 개발 워크플로우

### 1단계: 기능 개발

```bash
# develop 브랜치에서 작업
git checkout develop
git pull origin develop

# 새 기능 브랜치 생성
git checkout -b feature/새로운-기능
```

### 2단계: 변경사항 작업

코드를 수정한 후:

```bash
# 변경사항 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# develop에 push
git push origin feature/새로운-기능
```

### 3단계: develop에 PR 생성

**develop에 PR을 올릴 때는 changeset이 필요하지 않습니다!**

```bash
# GitHub에서 feature/새로운-기능 → develop으로 PR 생성
# 팀원들이 리뷰 후 develop에 머지
```

### 4단계: main으로 PR 생성 시 Changeset 생성 ⭐ 중요!

**develop에서 main으로 PR을 생성할 때만 changeset이 필요합니다:**

```bash
# develop에서 main으로 PR 생성 전에 changeset 생성
pnpm changeset
```

#### Changeset 생성 과정:

1. **패키지 선택**: 스페이스바로 변경된 패키지 선택

   ```
   🦋 Which packages would you like to include?
   ◯ @bofit/client
   ◯ @bds/ui
   ```

2. **버전 타입 선택**:
   - `major`: 하위 호환성 깨짐 (breaking changes)
   - `minor`: 새로운 기능 추가 (하위 호환)
   - `patch`: 버그 수정, 문서 업데이트

3. **변경사항 설명 작성**:
   ```
   🦋 Please enter a summary for this change:
   새로운 로그인 기능 추가 및 UI 개선
   ```

### 5단계: main PR 생성 및 배포

```bash
# changeset 생성 후 develop에서 main으로 PR 생성
# GitHub Actions에서 changeset 검증
# PR 리뷰 후 main에 머지
# 자동으로 버전 업데이트 및 배포
```

## 📦 패키지별 버전 관리 가이드

### 주요 패키지들

| 패키지          | 설명                    | 버전 규칙                                    |
| --------------- | ----------------------- | -------------------------------------------- |
| `@bofit/client` | 클라이언트 애플리케이션 | 기능 추가 시 minor, breaking change 시 major |
| `@bds/ui`       | 디자인 시스템           | 컴포넌트 추가 시 minor, API 변경 시 major    |
| `@bds/icons`    | 아이콘 패키지           | 아이콘 추가 시 minor                         |

### 버전 업데이트 규칙

#### 🟢 Patch (0.0.x)

- 버그 수정
- 문서 업데이트
- 타입 정의 수정
- 성능 개선

#### 🟡 Minor (0.x.0)

- 새로운 기능 추가
- 새로운 컴포넌트 추가
- 새로운 API 엔드포인트 추가
- 하위 호환되는 변경사항

#### 🔴 Major (x.0.0)

- Breaking changes
- API 변경
- 컴포넌트 props 변경
- 하위 호환성 깨짐

## 🔧 유용한 명령어들

```bash
# Changeset 생성 (main PR 생성 시에만)
pnpm changeset

# Changeset 상태 확인
pnpm changeset status

# 버전 업데이트 (로컬에서만)
pnpm version

# 릴리스 (빌드 + 배포)
pnpm release

# Changeset 파일들 확인
ls .changeset/*.md
```

## 📋 PR 체크리스트

### develop → develop PR (changeset 불필요)

- [ ] 코드 리뷰 완료
- [ ] 테스트 통과
- [ ] develop에 머지

### develop → main PR (changeset 필수)

- [ ] Changeset 생성 완료 (`pnpm changeset`)
- [ ] Changeset 파일이 `.changeset/` 폴더에 존재
- [ ] 변경사항 설명이 명확하게 작성됨
- [ ] 적절한 버전 타입 선택 (major/minor/patch)
- [ ] 코드 리뷰 완료
- [ ] 테스트 통과
- [ ] GitHub Actions에서 changeset 검증 확인

## 🚨 자주 발생하는 실수들

### ❌ 잘못된 예시들:

1. **develop PR에서 changeset 검증 실패**

   ```
   ❌ Error: No changesets found! Please create a changeset using 'pnpm changeset'
   ```

   → develop PR에서는 changeset이 필요하지 않습니다!

2. **main PR에서 changeset 없이 생성**

   ```
   ❌ Error: No changesets found! Please create a changeset using 'pnpm changeset'
   ```

   → main PR에서는 changeset이 필수입니다!

3. **부적절한 버전 타입**
   ```markdown
   # 버그 수정인데 major로 설정

   ---

   ## '@bofit/client': major

   버그 수정
   ```

### ✅ 올바른 예시들:

1. **적절한 버전 타입**

   ```markdown
   ---
   '@bofit/client': minor
   '@bds/ui': patch
   ---

   새로운 로그인 기능 추가 및 버튼 컴포넌트 버그 수정
   ```

2. **명확한 설명**
   ```markdown
   ---
   '@bofit/client': patch
   ---

   로그인 페이지에서 발생하는 500 에러 수정
   ```

## 🔄 워크플로우 예시

### 시나리오 1: 새로운 기능 추가

```bash
# 1. 개발
git checkout -b feature/new-login
# ... 코드 작성 ...

# 2. develop에 PR 생성 (changeset 불필요)
git add .
git commit -m "feat: 소셜 로그인 기능 추가"
git push origin feature/new-login
# GitHub에서 feature/new-login → develop으로 PR 생성

# 3. develop에 머지 후, main으로 PR 생성 시 changeset 생성
pnpm changeset
# @bofit/client 선택, minor 선택
# "새로운 소셜 로그인 기능 추가" 입력

# 4. main으로 PR 생성
# GitHub에서 develop → main으로 PR 생성
```

### 시나리오 2: 버그 수정

```bash
# 1. 개발
git checkout -b fix/login-error
# ... 버그 수정 ...

# 2. develop에 PR 생성 (changeset 불필요)
git add .
git commit -m "fix: 로그인 500 에러 수정"
git push origin fix/login-error
# GitHub에서 fix/login-error → develop으로 PR 생성

# 3. develop에 머지 후, main으로 PR 생성 시 changeset 생성
pnpm changeset
# @bofit/client 선택, patch 선택
# "로그인 시 발생하는 500 에러 수정" 입력

# 4. main으로 PR 생성
# GitHub에서 develop → main으로 PR 생성
```

## 🆘 문제 해결

### Changeset 생성 시 오류

```bash
# 패키지가 선택되지 않음
🦋 Which packages would you like to include? · No items were selected
🦋 error You must select at least one package to release

# 해결: 스페이스바로 패키지 선택 후 엔터
```

### Changeset 파일 삭제

```bash
# 실수로 잘못된 changeset 생성 시
rm .changeset/파일명.md
```

### Changeset 상태 확인

```bash
# 현재 changeset 상태 확인
pnpm changeset status
```

## 📞 도움말

- **Changesets 공식 문서**: https://github.com/changesets/changesets
- **GitHub Actions 로그**: PR의 Actions 탭에서 확인
- **팀 리드에게 문의**: 복잡한 버전 관리 상황

## 🎯 핵심 포인트

1. **develop PR**: changeset 불필요
2. **main PR**: changeset 필수
3. **적절한 버전 타입 선택**
4. **명확한 변경사항 설명**
5. **PR에서 GitHub Actions 확인**

---

**💡 팁**: develop에서 자유롭게 개발하고, main 배포 시에만 버전 관리를 하면 됩니다!
