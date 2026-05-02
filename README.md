# Taskify

<img width="1920" height="1080" alt="dashboard" src="https://github.com/user-attachments/assets/f4151371-e24f-4e8c-9659-b1915e2445fb" />

## 소개 및 개요

- 📅**프로젝트 기간** : 2026.04.20 ~ 2026.05.08
- 🔗**배포 주소** : https://taskify-drowning.vercel.app/
<br>

### [프로젝트 설명]

[Taskify]는 커뮤니티 기반의 일정 및 할 일 관리 웹 애플리케이션입니다. TypeScript를 기반으로 안정성을 높였으며, 가족이나 직장 등 다양한 그룹을 생성해 멤버 초대부터 일정 공유, 실시간 댓글 소통까지 유기적인 협업 환경을 제공합니다.

특히 드래그 앤 드랍과 모달 등 외부 라이브러리를 적극 활용한 직관적인 UI/UX를 통해, 일정의 생성·수정·삭제(CRUD)를 누구나 쉽게 관리할 수 있도록 구현했습니다. 협업 툴과 시스템 아키텍처 설계에 관심 있는 개발자들에게 최적화된 프로젝트입니다.

<br><br>

## 🛠️ 기술 스택

**Frontend**

<img src="https://skillicons.dev/icons?i=nextjs,ts,tailwind" />

**Development**

<img src="https://skillicons.dev/icons?i=nodejs,npm" />

**Collaboration**

<img src="https://skillicons.dev/icons?i=git,github,discord,figma,notion" />

**Deployment**

<img src="https://skillicons.dev/icons?i=vercel" />

<br><br>

## 📁 프로젝트 구조

```
src/
├─ app/
│  ├─ page.tsx
│  ├─ login/page.tsx
│  ├─ signup/page.tsx
│  ├─ mypage/page.tsx
│  ├─ dashboard/page.tsx
│  ├─ dashboard/new/page.tsx
│  ├─ dashboard/[dashboardId]/page.tsx
│  ├─ dashboard/[dashboardId]/edit/page.tsx
│  └─ tasks/[taskId]/page.tsx
│
├─ components/
│  ├─ common/
│  │  ├─ Button.tsx
│  │  ├─ Input.tsx
│  │  ├─ TextArea.tsx
│  │  ├─ Modal.tsx
│  │  ├─ Dropdown.tsx
│  │  ├─ Badge.tsx
│  │  ├─ Avatar.tsx
│  │  ├─ ToggleSwitch.tsx
│  │  ├─ Logo.tsx
│  │  └─ ImageUploader.tsx
│  │
│  ├─ layout/
│  │  ├─ TopNavigation.tsx
│  │  ├─ DashboardHeader.tsx
│  │  ├─ AuthHeader.tsx
│  │  └─ PageContainer.tsx
│  │
│  ├─ auth/
│  │  ├─ LoginForm.tsx
│  │  └─ SignupForm.tsx
│  │
│  ├─ dashboard/
│  │  ├─ DashboardCard.tsx
│  │  ├─ DashboardList.tsx
│  │  ├─ DashboardSelector.tsx
│  │  ├─ DashboardForm.tsx
│  │  ├─ DashboardInfoSection.tsx
│  │  ├─ MemberList.tsx
│  │  ├─ InviteList.tsx
│  │  └─ InviteDashboardModal.tsx
│  │
│  ├─ column/
│  │  ├─ ColumnList.tsx
│  │  ├─ ColumnCard.tsx
│  │  ├─ ColumnHeader.tsx
│  │  ├─ AddColumnButton.tsx
│  │  ├─ CreateColumnModal.tsx
│  │  └─ ManageColumnModal.tsx
│  │
│  ├─ task/
│  │  ├─ TaskCard.tsx
│  │  ├─ TaskDetail.tsx
│  │  ├─ TaskForm.tsx
│  │  ├─ TaskMetaInfo.tsx
│  │  ├─ TagList.tsx
│  │  ├─ AssigneeInfo.tsx
│  │  └─ TaskImagePreview.tsx
│  │
│  ├─ comment/
│  │  ├─ CommentForm.tsx
│  │  ├─ CommentList.tsx
│  │  └─ CommentItem.tsx
│  │
│  └─ profile/
│     ├─ ProfileImageSection.tsx
│     ├─ NicknameForm.tsx
│     └─ PasswordChangeForm.tsx
│
├─ hooks/
│  ├─ useModal.ts
│  ├─ useDashboard.ts
│  ├─ useTask.ts
│  └─ useComment.ts
│
├─ services/
│  ├─ auth.ts
│  ├─ dashboard.ts
│  ├─ column.ts
│  ├─ task.ts
│  ├─ comment.ts
│  └─ user.ts
│
├─ types/
│  ├─ auth.ts
│  ├─ dashboard.ts
│  ├─ task.ts
│  └─ user.ts
│
└─ utils/
   ├─ formatDate.ts
   ├─ getInitial.ts
   └─ validators.ts
```

<br><br>

## 🌿 브랜치 전략 및 커밋 컨벤션

### [브랜치 전략]

- **main**: 제품으로 출시될 수 있는 브랜치
- **develop**: 다음 출시 버전을 개발하는 브랜치
---

<br>

### [커밋 컨벤션]

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없는 경우)
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드 추가
- **chore**: 빌드 업무 수정, 패키지 매니저 설정 등

<br><br>

## 🧭 일정 및 프로젝트 수행 과정

### 1. UI개발 퍼블리싱

- 담당 페이지, 공통 컴포넌트 퍼블리싱 작업 진행

### 2. 1차 점검 및 배포

- UI 개발 후 vercel 배포를 위한 1차 점검 진행

### 3. API 개발

- 엔드포인트 별 담당을 정해 api 개발 진행

### 4. 기능 구현

- 페이지 별 상세 기획을 확인하며 각 기능 구현

### 5. 테스트 및 QA

- 직접 배포된 사이트를 사용해보며 미흡한 부분, 추가할 점 등을 찾고 보완 후 2차 배포 진행

<br><br>

## 👨‍👩‍👧‍👦 팀원 소개 - 코드잇 23기 3팀

| 이수진 | 박승현 | 최유현 | 장현서 |
| --- | --- | --- | --- |
| <img width="460" height="460" alt="1" src="https://github.com/user-attachments/assets/331ebe7a-4c13-4c55-b0f3-387cd015fc87" /> | <img width="420" height="420" alt="2" src="https://github.com/user-attachments/assets/98104a99-74e3-4fe0-a19d-e28fc2ce401d" /> | <img width="460" height="460" alt="4" src="https://github.com/user-attachments/assets/40edafb6-2970-4e1c-8af1-3449db8e10cc" /> | <img width="420" height="420" alt="3" src="https://github.com/user-attachments/assets/05271d7c-d0bd-408a-97b5-260688ead424" /> |
| **github**: [isuzzi](https://github.com/isuzzi) | **github**: [hanpla](https://github.com/hanpla) | **github**: [Choiyuhyeon](https://github.com/Choiyuhyeon) | **github**: [hhhnseo](https://github.com/hhhnseo) |
