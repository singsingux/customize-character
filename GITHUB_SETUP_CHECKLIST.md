# 🚀 GitHub 버전 관리 시작 체크리스트

## 📋 전체 프로세스 요약
```
git init → .gitignore 설정 → 첫 커밋 → GitHub 저장소 생성 → remote 연결 → push → 태그 생성
```

---

## ✅ Step 1: Git 초기화 및 .gitignore 설정

### 1-1. Git 초기화
```bash
cd "/Users/sieunkim/Desktop/Projects/Customize Character"
git init
```

### 1-2. .gitignore 확인
이미 생성되어 있습니다! 내용 확인:
- ✅ node_modules
- ✅ .next/
- ✅ .env files
- ✅ terminals/
- ✅ *.backup.tsx

### 1-3. Git 사용자 정보 설정 (최초 1회만)
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## ✅ Step 2: 첫 커밋 생성

### 2-1. 모든 파일 스테이징
```bash
git add .
```

### 2-2. 첫 커밋 (추천 메시지)
```bash
git commit -m "🎨 Initial commit: Character Avatar Customization App v1.0.0

- Complete character customization system with 7 categories
- Skin tone, eyes, nose, mouth, hair, features, accessories
- Real-time preview with color customization
- Advanced sliders for precise positioning and sizing
- Save page with background selection and PNG export
- Smooth page transitions and animations
- Responsive UI with Tailwind CSS
- Built with Next.js 14 + TypeScript + React"
```

---

## ✅ Step 3: GitHub 저장소 생성 및 연결

### 3-1. GitHub에서 새 저장소 생성
1. GitHub 웹사이트 접속 (https://github.com)
2. 우측 상단 `+` 버튼 → `New repository` 클릭
3. 저장소 정보 입력:
   - **Repository name**: `customize-character` 또는 원하는 이름
   - **Description**: "🎨 Interactive character avatar customization web app"
   - **Visibility**: Public 또는 Private 선택
   - ⚠️ **중요**: "Initialize with README" 체크 해제 (이미 프로젝트 존재)
4. `Create repository` 클릭

### 3-2. Remote 저장소 연결
GitHub에서 생성한 저장소 URL을 사용하세요:

```bash
# HTTPS 방식 (추천 - 간단함)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 또는 SSH 방식 (SSH 키 설정 필요)
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 3-3. 연결 확인
```bash
git remote -v
```
출력 예시:
```
origin  https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git (push)
```

---

## ✅ Step 4: 첫 Push

### 4-1. Main 브랜치로 Push
```bash
git branch -M main
git push -u origin main
```

### 4-2. Push 성공 확인
GitHub 저장소 페이지에서 파일들이 업로드되었는지 확인

---

## ✅ Step 5: v1.0.0 태그 생성 및 릴리즈

### 5-1. 태그 생성 (로컬)
```bash
# Annotated 태그 (추천 - 메시지 포함)
git tag -a v1.0.0 -m "🎉 Release v1.0.0: Initial Production Release

Features:
- Complete character customization system
- 7 customization categories (Skin, Eyes, Nose, Mouth, Hair, Features, Accessories)
- Color picker with 16 presets for Eyes and Hair
- Real-time preview with smooth transitions
- Advanced positioning sliders for precise control
- PNG export with custom backgrounds
- Responsive design optimized for desktop

Tech Stack:
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- SVG-based character components"
```

### 5-2. 태그 Push
```bash
# 특정 태그 push
git push origin v1.0.0

# 또는 모든 태그 push
git push origin --tags
```

### 5-3. GitHub에서 Release 생성 (선택사항)
1. GitHub 저장소 → `Releases` 탭
2. `Create a new release` 클릭
3. Tag 선택: `v1.0.0`
4. Release title: `v1.0.0 - Initial Production Release`
5. 설명 추가 후 `Publish release` 클릭

---

## 🌿 Step 6: 개인용 브랜치 운영 전략 (추천)

### 브랜치 구조 (개인 프로젝트용)

```
main (production)
  ├── develop (개발 통합)
  ├── feature/새기능명
  ├── fix/버그수정명
  └── experiment/실험기능명
```

### 6-1. 기본 브랜치 생성
```bash
# 개발용 메인 브랜치
git checkout -b develop
git push -u origin develop
```

### 6-2. 새 기능 개발 시
```bash
# develop에서 feature 브랜치 생성
git checkout develop
git checkout -b feature/gallery-page

# 작업 후 커밋
git add .
git commit -m "✨ Add gallery page for saved avatars"

# develop으로 머지
git checkout develop
git merge feature/gallery-page

# 완료된 feature 브랜치 삭제
git branch -d feature/gallery-page
```

### 6-3. 버그 수정 시
```bash
# main 또는 develop에서 fix 브랜치 생성
git checkout main
git checkout -b fix/eye-spacing-export

# 수정 후 커밋
git add .
git commit -m "🐛 Fix eye spacing not applied in PNG export"

# main으로 머지
git checkout main
git merge fix/eye-spacing-export
git push origin main

# develop에도 반영
git checkout develop
git merge main
```

### 6-4. 실험적 기능 시
```bash
# 실험용 브랜치 (부담 없이 시도)
git checkout -b experiment/3d-rotation

# 성공하면 develop으로 머지, 실패하면 삭제
git branch -D experiment/3d-rotation
```

---

## 📊 커밋 메시지 규칙 (추천)

```
🎨 feat: 새 기능 추가
🐛 fix: 버그 수정
📝 docs: 문서 수정
💄 style: UI/스타일 변경
♻️ refactor: 코드 리팩토링
⚡️ perf: 성능 개선
✅ test: 테스트 추가/수정
🔧 chore: 빌드/설정 변경
```

예시:
```bash
git commit -m "🎨 feat: Add hair color gradient picker"
git commit -m "🐛 fix: Resolve accessories Y position issue"
git commit -m "💄 style: Update navigation bar design"
```

---

## 🏷️ 버전 태그 규칙

### Semantic Versioning (Major.Minor.Patch)
- **v1.0.0** → **v1.0.1**: 버그 수정
- **v1.0.0** → **v1.1.0**: 새 기능 추가 (하위 호환)
- **v1.0.0** → **v2.0.0**: 큰 변경 (하위 호환 X)

### 태그 생성 시점
```bash
# 버그 수정 후
git tag -a v1.0.1 -m "🐛 Hotfix: Eye spacing export issue"
git push origin v1.0.1

# 새 기능 추가 후
git tag -a v1.1.0 -m "✨ Feature: Add gallery page"
git push origin v1.1.0

# 큰 업데이트 후
git tag -a v2.0.0 -m "🚀 Major: Complete redesign with 3D avatars"
git push origin v2.0.0
```

---

## 🔄 일상적인 작업 플로우

### 매일 작업 시작
```bash
# 최신 코드 가져오기
git checkout develop
git pull origin develop

# 새 기능 브랜치 생성
git checkout -b feature/new-feature
```

### 작업 중 자주 커밋
```bash
git add .
git commit -m "🎨 feat: Work in progress on new feature"
```

### 작업 완료 후
```bash
# develop으로 머지
git checkout develop
git merge feature/new-feature
git push origin develop

# 브랜치 정리
git branch -d feature/new-feature
```

### production 배포 시
```bash
# main에 머지
git checkout main
git merge develop
git push origin main

# 태그 생성 (필요시)
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0
```

---

## 🛡️ 유용한 Git 명령어

```bash
# 현재 상태 확인
git status

# 변경 내역 확인
git diff

# 커밋 히스토리 보기
git log --oneline --graph --all

# 브랜치 목록
git branch -a

# 원격 저장소 확인
git remote -v

# 마지막 커밋 수정
git commit --amend

# 특정 파일만 스테이징
git add path/to/file

# 스테이징 취소
git restore --staged file

# 로컬 변경 취소
git restore file
```

---

## ⚠️ 주의사항

1. **.env 파일 절대 커밋하지 말 것**
   - API 키, 비밀번호 등 민감 정보 포함
   - `.gitignore`에 이미 추가되어 있음

2. **node_modules 커밋하지 말 것**
   - 이미 `.gitignore`에 포함됨
   - `package.json`만 있으면 `npm install`로 복구 가능

3. **큰 바이너리 파일 주의**
   - Git은 텍스트 파일 관리에 최적화됨
   - 큰 이미지/동영상은 Git LFS 사용 권장

4. **main 브랜치 직접 수정 최소화**
   - 항상 feature/fix 브랜치에서 작업
   - main은 안정적인 코드만 유지

---

## 📚 추가 학습 자료

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub 가이드](https://guides.github.com/)
- [Learn Git Branching (인터랙티브)](https://learngitbranching.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🎯 빠른 시작 명령어 모음

```bash
# 1. Git 초기화
git init

# 2. 첫 커밋
git add .
git commit -m "🎨 Initial commit: Character Avatar Customization App v1.0.0"

# 3. GitHub 연결 (URL 수정 필요)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 4. Push
git branch -M main
git push -u origin main

# 5. 태그 생성 및 Push
git tag -a v1.0.0 -m "🎉 Release v1.0.0: Initial Production Release"
git push origin v1.0.0

# 6. Develop 브랜치 생성
git checkout -b develop
git push -u origin develop
```

---

완료! 🎉 이제 체계적인 버전 관리를 시작할 수 있습니다!
