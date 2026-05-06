# Taskify

<img width="1920" height="1080" alt="dashboard" src="https://github.com/user-attachments/assets/f4151371-e24f-4e8c-9659-b1915e2445fb" />

<br />

## 📌 프로젝트 소개

**Taskify**는 대시보드 기반의 일정 및 할 일 관리 웹 애플리케이션입니다.  
사용자는 대시보드를 생성하고 구성원을 초대해 함께 할 일을 관리할 수 있습니다. 카드 생성·수정·삭제, 댓글 작성, 이미지 업로드, 드래그 앤 드롭 기반 상태 변경 등을 통해 협업 흐름을 직관적으로 관리하는 것을 목표로 했습니다.

- **프로젝트 기간**: 2026.04.20 ~ 2026.05.08
- **프로젝트 주제**: Taskify
- **배포 주소**: https://taskify-drowning.vercel.app/

<br />

## ✨ 주요 기능

| 기능 | 설명 |
| --- | --- |
| 회원 인증 | 로그인, 회원가입, OAuth 기반 인증 기능을 제공합니다. |
| 대시보드 관리 | 대시보드 생성, 조회, 수정, 삭제 기능을 제공합니다. |
| 멤버 초대 | 대시보드에 멤버를 초대하고 초대 응답을 처리할 수 있습니다. |
| 컬럼 관리 | 할 일 상태를 구분하는 컬럼을 생성, 수정, 삭제할 수 있습니다. |
| 카드 관리 | 할 일 카드 생성, 상세 조회, 수정, 삭제 기능을 제공합니다. |
| Drag & Drop | 카드의 위치와 상태를 드래그 앤 드롭으로 변경할 수 있습니다. |
| 댓글 | 카드별 댓글 작성, 조회, 수정, 삭제 기능을 제공합니다. |
| 이미지 업로드 | 프로필 이미지와 카드 이미지를 업로드할 수 있습니다. |
| 반응형 UI | 모바일, 태블릿, 데스크톱 화면에 대응합니다. |

<br />

## 🛠️ 기술 스택

### Frontend

<img src="https://skillicons.dev/icons?i=html,js,ts,react,nextjs,tailwind" />

| 분류 | 기술 |
| --- | --- |
| 구조 | HTML |
| 언어 | JavaScript, TypeScript |
| 프레임워크 / 라이브러리 | Next.js, React |
| 스타일링 | Tailwind CSS |
| 인터랙션 | Drag & Drop UI |
| 인증 / 보안 | OAuth |

### Collaboration & Infra

<img src="https://skillicons.dev/icons?i=git,github,figma,notion,vercel" />

| 분류 | 기술 |
| --- | --- |
| 협업 / 버전 관리 | Git, GitHub |
| 협업 문서 / 디자인 | Notion, Figma |
| 배포 / 인프라 | Vercel|

<br />

## 🚀 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/your-org/your-repository.git

# 2. 프로젝트 폴더 이동
cd codeit-FE23-Team5-Taskify

# 3. 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

개발 서버 실행 후 `http://localhost:3000`에서 확인할 수 있습니다.

### 환경 변수

프로젝트 실행 시 필요한 환경 변수는 `.env.local`에 작성합니다.

```env
NEXT_PUBLIC_API_URL=
```

<br />

## 📁 프로젝트 구조

```text
codeit-FE23-Team5-Taskify
my-app/
├── .github/                     # GitHub 설정
├── app/                         # App Router 기반 라우팅
│   ├── (dashboard)/             # 대시보드 관련 라우트 그룹
│   │   ├── dashboard/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # 대시보드 상세 페이지
│   │   │   └── edit/
│   │   │       └── page.tsx     # 대시보드 수정 페이지
│   │   ├── mydashboard/
│   │   │   └── page.tsx         # 내 대시보드 페이지
│   │   ├── layout.tsx           # 대시보드 그룹 레이아웃
│   │   └── page.tsx             # 대시보드 메인 페이지
│   ├── dashboard/

│   ├── login/
│   │   └── page.tsx             # 로그인 페이지
│   ├── signup/
│   │   └── page.tsx             # 회원가입 페이지
│   ├── favicon.ico              # 파비콘
│   ├── layout.tsx               # 전역 레이아웃
│   └── page.tsx                 # 메인 페이지
├── assets/                      # 내부 정적 리소스
│   ├── icons/                   # 아이콘 파일
│   └── imgs/                    # 이미지 파일
├── components/
│   └── common/                  # 공통 UI 컴포넌트
├── libs/                        # 라이브러리 설정, 공통 모듈
├── .gitignore
├── .prettierrc
├── AGENTS.md
├── CLAUDE.md
├── LICENSE
├── README.md
├── eslint.config.mjs
├── next.config.ts               # Next.js 설정
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

<br />

## 👥 팀원 소개 및 역할

| 이수진 | 박승현 | 최유현 | 장현서 |
| --- | --- | --- | --- |
| <img width="100" height="100" alt="이수진" src="https://github.com/user-attachments/assets/331ebe7a-4c13-4c55-b0f3-387cd015fc87" /> | <img width="100" height="100" alt="박승현" src="https://github.com/user-attachments/assets/98104a99-74e3-4fe0-a19d-e28fc2ce401d" /> | <img width="100" height="100" alt="최유현" src="https://github.com/user-attachments/assets/40edafb6-2970-4e1c-8af1-3449db8e10cc" /> | <img width="100" height="100" alt="장현서" src="https://github.com/user-attachments/assets/05271d7c-d0bd-408a-97b5-260688ead424" /> |
| [@isuzzi](https://github.com/isuzzi) | [@hanpla](https://github.com/hanpla) | [@Choiyuhyeon](https://github.com/Choiyuhyeon) | [@hhhnseo](https://github.com/hhhnseo) |
| 나의 대시보드<br />디자인 총괄 | 기초 세팅<br />API<br />랜딩<br />로그인, 회원가입 | 대시보드 페이지 <br /> DnD UI<br />발표 | API <br />대시보드 수정, 관리<br />프로필 관리 |

<br />

## 🌿 Git 전략 및 협업 방식

### 브랜치 전략

| 브랜치 | 설명 |
| --- | --- |
| `main` | 제품으로 출시 가능한 안정 버전 브랜치 |
| `develop` | 다음 배포 버전을 통합 개발하는 브랜치 |
| `feat/#이슈번호` | 신규 기능 개발 브랜치 |
| `fix/#이슈번호` | 버그 수정 브랜치 |
| `refactor/#이슈번호` | 리팩토링 브랜치 |
| `design/#이슈번호` | UI 및 스타일 수정 브랜치 |
| `chore/#이슈번호` | 기타 설정 및 문서 작업 브랜치 |

### Issue / Branch / PR 흐름

1. GitHub Issue에서 작업 내용을 작성합니다.
2. 작업 담당자를 지정합니다.
3. 생성한 Issue 번호를 기준으로 브랜치를 생성합니다.
4. 작업 완료 후 Pull Request를 생성합니다.
5. 코드 리뷰와 approve 후 `develop` 브랜치에 병합합니다.

```text
feat/#3
fix/#10
refactor/#15
design/#21
chore/#28
```

### 작업 전 세팅

```bash
# 원격 브랜치 정보 가져오기
git fetch origin

# 작업 브랜치로 이동
git checkout feat/#3
```

또는 Git 버전에 따라 아래 명령어를 사용할 수 있습니다.

```bash
git switch feat/#3
```

### 커밋 컨벤션

| 타입 | 설명 |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 포맷팅, 세미콜론 누락 등 코드 동작 변경이 없는 수정 |
| refactor | 코드 리팩토링 |
| design | UI 디자인 및 스타일 수정 |
| test | 테스트 코드 추가 또는 수정 |
| chore | 빌드 업무, 패키지 매니저 설정, 기타 작업 |

<br />

## 🧾 코드 컨벤션

### 파일 / 폴더 네이밍

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 폴더명 | 소문자 사용 | `components`, `dashboard`, `common` |
| 컴포넌트 파일 | PascalCase | `DashboardCard.tsx` |
| 일반 변수 | camelCase | `dashboardList`, `accessToken` |
| 이미지 파일 | 소문자 + 언더바 | `img_profile.png` |
| 아이콘 파일 | `ic_` prefix + 소문자 + 언더바 | `ic_arrow_left.svg` |

### 코드 작성 규칙

- import 경로는 절대 경로를 사용합니다.

```tsx
import Button from '@/components/common/Button'
```

- 일반 함수는 화살표 함수를 우선 사용합니다.

```ts
const getDashboardList = async () => {
  // ...
}
```

- 컴포넌트는 명확한 이름을 사용하고, 기본 export 컴포넌트는 아래 형식을 사용합니다.

```tsx
export default function DashboardCard() {
  return <div>DashboardCard</div>
}
```

### 파일 내부 작성 순서

1. import
2. type / interface / 상수 정의
3. 함수 정의
4. 컴포넌트 정의
5. export

<br />

## 📄 라이선스

이 프로젝트는 학습 및 팀 프로젝트 목적으로 제작되었습니다.
