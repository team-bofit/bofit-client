# Changesets 사용 가이드

이 프로젝트는 [Changesets](https://github.com/changesets/changesets)를 사용하여 모노레포의 버전 관리를 자동화합니다.

## 🚀 워크플로우

### 1. 개발 중 Changeset 생성

변경사항이 있을 때마다 changeset을 생성합니다:

```bash
pnpm changeset
```

이 명령어를 실행하면:

1. 변경된 패키지 목록이 표시됩니다
2. 변경 유형을 선택합니다 (major/minor/patch)
3. 변경사항에 대한 설명을 작성합니다

### 2. Changeset 파일

`.changeset/` 폴더에 마크다운 파일이 생성됩니다:

```markdown
---
'@bofit/client': patch
'@bds/ui': minor
---

새로운 기능 추가 및 버그 수정
```

### 3. PR 생성 및 리뷰

develop 브랜치에서 main으로 PR을 생성하면:

1. **Changeset 검증**: PR에서 changeset 존재 여부 확인
2. **미리보기**: 어떤 패키지가 어떤 버전으로 업데이트될지 표시
3. **PR 리뷰**: 팀원들이 변경사항을 검토
4. **main 머지**: PR이 main에 머지되면 자동으로 배포

## 📦 패키지별 버전 관리

### 주요 패키지들

- `@bofit/client`: 클라이언트 애플리케이션
- `@bds/ui`: 디자인 시스템
- `@bds/icons`: 아이콘 패키지

### 버전 업데이트 규칙

- **patch**: 버그 수정, 문서 업데이트
- **minor**: 새로운 기능 추가 (하위 호환)
- **major**: 주요 변경사항 (하위 호환성 깨짐)

## 🔧 명령어

```bash
# Changeset 생성
pnpm changeset

# 버전 업데이트 (로컬에서만)
pnpm version

# 릴리스 (빌드 + 배포)
pnpm release

# Changeset 상태 확인
pnpm changeset status
```

## 📋 체크리스트

main 브랜치로 PR을 생성하기 전:

- [ ] Changeset 생성 (`pnpm changeset`)
- [ ] 변경사항 설명 작성
- [ ] develop 브랜치에 push
- [ ] main으로 PR 생성
- [ ] GitHub Actions에서 changeset 검증 확인
- [ ] PR 리뷰 및 머지

## 🚨 주의사항

1. **Changeset 필수**: 모든 변경사항은 changeset이 있어야 합니다
2. **명확한 설명**: 변경사항을 명확하게 설명하세요
3. **적절한 버전**: 변경 유형을 정확히 선택하세요
4. **PR 리뷰**: main으로의 PR을 꼭 리뷰하세요
5. **자동 배포**: main에 머지되면 자동으로 배포됩니다

## 🔗 관련 링크

- [Changesets 공식 문서](https://github.com/changesets/changesets)
- [GitHub Actions 설정](.github/workflows/release.yml)
- [Changesets 설정](.changeset/config.json)
