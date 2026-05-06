# Taskify

<img width="1920" height="1080" alt="dashboard" src="https://github.com/user-attachments/assets/f4151371-e24f-4e8c-9659-b1915e2445fb" />

<br />

## 📌 프로젝트 소개

**Taskify**는 대시보드 기반의 일정 및 할 일 관리 웹 애플리케이션입니다.  
사용자는 대시보드를 생성하고 구성원을 초대해 함께 할 일을 관리할 수 있습니다. 카드 생성·수정·삭제, 댓글 작성, 이미지 업로드, 드래그 앤 드롭 기반 상태 변경 등을 통해 협업 흐름을 직관적으로 관리하는 것을 목표로 했습니다.

- **프로젝트 기간**: 2026.04.20 ~ 2026.05.08
- **프로젝트 주제**: Taskify
- **배포 주소**: https://taskify-drowning.vercel.app/
- **가이드 문서**: [Notion 가이드 문서](https://www.notion.so/1fc6fd228e8d812ba53be0c85e3c9e38?pvs=21)
- **세부 계획**: [Notion 세부 계획](https://www.notion.so/3435a644d0b08122af81c4f7631436e9?pvs=21)

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

<img src="https://skillicons.dev/icons?i=git,github,figma,notion,aws,vercel" />

| 분류 | 기술 |
| --- | --- |
| 협업 / 버전 관리 | Git, GitHub |
| 협업 문서 / 디자인 | Notion, Figma |
| 배포 / 인프라 | Vercel, AWS S3, CloudFront |

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
│   │   ├── mydashboard/
│   │   │   └── page.tsx         # 내 대시보드 페이지
│   │   ├── layout.tsx           # 대시보드 그룹 레이아웃
│   │   └── page.tsx             # 대시보드 메인 페이지
│   ├── dashboard/
│   │   └── edit/
│   │       └── page.tsx         # 대시보드 수정 페이지
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
| <img width="460" height="460" alt="이수진" src="https://github.com/user-attachments/assets/331ebe7a-4c13-4c55-b0f3-387cd015fc87" /> | <img width="420" height="420" alt="박승현" src="https://github.com/user-attachments/assets/98104a99-74e3-4fe0-a19d-e28fc2ce401d" /> | <img width="460" height="460" alt="최유현" src="https://github.com/user-attachments/assets/40edafb6-2970-4e1c-8af1-3449db8e10cc" /> | <img width="420" height="420" alt="장현서" src="https://github.com/user-attachments/assets/05271d7c-d0bd-408a-97b5-260688ead424" /> |
| [@isuzzi](https://github.com/isuzzi) | [@hanpla](https://github.com/hanpla) | [@Choiyuhyeon](https://github.com/Choiyuhyeon) | [@hhhnseo](https://github.com/hhhnseo) |
| 나의 대시보드<br />디자인 총괄 | 기초 세팅<br />글로벌 CSS<br />랜딩<br />로그인<br />회원가입 | 대시보드<br />발표 | 대시보드 수정 |

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

## 🧭 프로젝트 진행 과정
### 1. 기획 및 요구사항 정리

프로젝트 초반에는 Taskify의 핵심 사용 흐름을 기준으로 필요한 페이지와 기능을 정리했습니다. 사용자가 대시보드를 생성하고, 구성원을 초대하고, 컬럼과 카드를 통해 할 일을 관리하는 흐름을 중심으로 화면 구조와 데이터 흐름을 설계했습니다.

| 구분 | 내용 |
| --- | --- |
| 핵심 사용자 흐름 | 회원가입 / 로그인 → 대시보드 생성 → 멤버 초대 → 컬럼 생성 → 카드 관리 → 댓글 소통 |
| 주요 페이지 | 랜딩, 로그인, 회원가입, 나의 대시보드, 대시보드 상세, 대시보드 수정, 마이페이지 |
| 우선순위 | 인증, 대시보드 CRUD, 카드 CRUD, 초대, 댓글, 이미지 업로드, Drag & Drop |
| 협업 방식 | GitHub Issue 기반 작업 분배, 브랜치 단위 개발, PR 리뷰 후 병합 |

<img width="1323" height="283" alt="스크린샷 2026-05-06 오후 12 10 05" src="https://github.com/user-attachments/assets/a044aab7-3f8d-4dda-b3e6-949e27055e1a" />
<img width="943" height="447" alt="image" src="https://github.com/user-attachments/assets/21dc5845-7a61-45b2-910c-99d0e05ff363" />



<br />

### 2. 초기 세팅 및 공통 구조 구성

Next.js App Router를 기반으로 프로젝트 구조를 구성하고, 팀원들이 동일한 기준으로 작업할 수 있도록 공통 설정을 먼저 정리했습니다. Tailwind CSS 설정, 전역 스타일, 절대 경로, ESLint/Prettier 설정을 통해 작업 환경의 일관성을 맞췄습니다.

- Next.js App Router 기반 라우팅 구조 설계
- Tailwind CSS 기반 디자인 토큰 및 전역 스타일 구성
- `components`, `libs`, `assets` 등 역할 중심 폴더 구조 정리
- 공통 UI 컴포넌트 작성 기준 수립
- GitHub Issue, Branch, PR 흐름 정리

```text
app/          # 페이지 및 라우팅
components/   # 공통 컴포넌트와 도메인별 UI
libs/         # API, hooks, types 등 공통 로직
assets/       # 아이콘, 이미지 등 정적 리소스
```

[스크린샷] 프로젝트 폴더 구조 또는 초기 세팅 화면

<br />

### 3. UI 퍼블리싱 및 반응형 레이아웃 구현

기능 구현에 앞서 주요 페이지의 UI를 먼저 구성했습니다. 공통 컴포넌트는 재사용성을 고려해 분리했고, 페이지별 UI는 모바일, 태블릿, 데스크톱 화면에서 자연스럽게 보이도록 반응형 기준을 적용했습니다.

| 작업 영역 | 구현 내용 |
| --- | --- |
| 랜딩 / 인증 페이지 | 서비스 소개, 로그인, 회원가입 화면 구성 |
| 나의 대시보드 | 대시보드 목록, 초대 목록, 페이지네이션 UI 구현 |
| 대시보드 상세 | 컬럼, 카드, 카드 상세 모달 UI 구현 |
| 대시보드 수정 | 대시보드 정보 수정, 구성원 관리, 초대 내역 UI 구현 |
| 공통 컴포넌트 | Button, Input, Modal, Dropdown, Avatar 등 재사용 컴포넌트 구현 |

반응형 구현 과정에서는 고정된 화면 크기에만 맞추지 않고, 콘텐츠가 줄어들거나 길어지는 경우에도 레이아웃이 깨지지 않도록 `flex`, `grid`, `truncate`, `shrink-0`, `overflow` 속성을 조정했습니다.

[스크린샷] 랜딩 페이지  
[스크린샷] 나의 대시보드 페이지  
[스크린샷] 대시보드 상세 페이지  
[스크린샷] 모바일 반응형 화면

<br />

### 4. API 연동 및 데이터 흐름 구성

UI 구현 후에는 백엔드 API와 화면을 연결했습니다. 서버 응답 구조에 맞춰 TypeScript 타입을 정의하고, 각 페이지에서 필요한 데이터를 불러와 컴포넌트에 전달하는 방식으로 데이터 흐름을 구성했습니다.

- 인증 토큰 기반 API 요청 처리
- 대시보드 / 컬럼 / 카드 / 댓글 / 초대 API 연동
- 서버 응답 타입을 TypeScript 인터페이스로 관리
- Server Component와 Client Component의 역할 분리
- 요청 실패 시 에러 메시지와 예외 처리 흐름 정리

```ts
// 예시: API 응답을 공통 결과 타입으로 관리
interface ApiResult<T> {
  success: boolean
  data: T | null
  error: string | null
}
```

[스크린샷] API 연동 후 실제 데이터가 표시되는 대시보드 화면

<br />

### 5. 핵심 기능 구현

Taskify의 핵심 기능인 대시보드 관리, 컬럼 관리, 카드 관리, 초대, 댓글, 이미지 업로드 기능을 구현했습니다. 사용자가 페이지 이동 없이 모달 안에서 주요 작업을 처리할 수 있도록 구성해 작업 흐름을 간결하게 만들었습니다.

| 기능 | 구현 내용 |
| --- | --- |
| 대시보드 관리 | 대시보드 생성, 조회, 수정, 삭제 및 색상 선택 기능 |
| 초대 관리 | 대시보드 초대 목록 조회, 초대 수락 / 거절 처리 |
| 컬럼 관리 | 컬럼 생성, 수정, 삭제 및 컬럼별 카드 목록 조회 |
| 카드 관리 | 카드 생성, 상세 조회, 수정, 삭제, 태그, 담당자, 마감일 관리 |
| 댓글 기능 | 카드 상세 모달 내 댓글 작성, 수정, 삭제 |
| 이미지 업로드 | 프로필 이미지 및 카드 이미지 업로드 / 미리보기 처리 |
| Drag & Drop | 카드 위치 이동 및 상태 변경 인터랙션 구현 |

[스크린샷] 대시보드 생성 모달  
[스크린샷] 카드 생성 모달  
[스크린샷] 카드 상세 모달 및 댓글 영역  
[스크린샷] Drag & Drop 동작 화면

<br />

### 6. 배포 및 인프라 구성

기능 구현 후에는 배포 환경에서 정상적으로 동작하는지 확인했습니다. 프론트엔드는 Vercel을 통해 배포하고, 이미지 업로드와 정적 리소스 처리를 위해 AWS S3 및 CloudFront 설정을 함께 검토했습니다.

- Vercel 기반 프론트엔드 배포
- 환경 변수 설정 및 배포 환경 분리
- AWS S3 이미지 업로드 흐름 확인
- CloudFront를 통한 이미지 접근 경로 확인
- 배포 환경에서 API 요청, 인증, 이미지 표시 여부 점검

[스크린샷] Vercel 배포 화면  
[스크린샷] 배포된 서비스 메인 화면

<br />

### 7. 테스트 및 QA

배포된 사이트를 직접 사용하며 주요 기능이 정상적으로 동작하는지 점검했습니다. 단순히 기능 성공 여부만 확인하지 않고, 실제 사용자 흐름에서 어색한 UI, 반응형 깨짐, 예외 상황을 함께 확인했습니다.

| 점검 항목 | 확인 내용 |
| --- | --- |
| 인증 | 로그인, 회원가입, 로그아웃, 토큰 유지 여부 |
| 대시보드 | 생성, 수정, 삭제, 목록 갱신 여부 |
| 초대 | 초대 목록 조회, 수락 / 거절 후 화면 반영 여부 |
| 카드 | 생성, 수정, 삭제, 이미지 업로드, 태그 표시 여부 |
| 댓글 | 작성, 수정, 삭제 및 실시간 화면 반영 여부 |
| 반응형 | 모바일, 태블릿, 데스크톱 화면에서 레이아웃 유지 여부 |
| 배포 환경 | 새로고침, 라우팅, 환경 변수, 이미지 로딩 여부 |

QA 과정에서 발견한 문제는 GitHub Issue 또는 PR 코멘트로 공유하고, 우선순위에 따라 수정했습니다.

[스크린샷] QA 체크리스트 또는 수정 전/후 비교 화면

<br />

### 8. 개선 및 마무리

마지막 단계에서는 기능 구현 이후 남은 UI 디테일과 사용성을 개선했습니다. 공통 컴포넌트의 재사용성을 점검하고, 중복되는 로직을 정리하며 프로젝트 구조를 다듬었습니다.

- 버튼, 모달, 입력창 등 공통 컴포넌트 사용 방식 정리
- 페이지별 반응형 여백과 스크롤 영역 조정
- API 요청 로직과 타입 정의 정리
- 파일명, import 경로, 컴포넌트 네이밍 점검
- README 및 프로젝트 문서 정리

[스크린샷] 최종 완성 화면 또는 주요 페이지 모음


<br />

## 📄 라이선스

이 프로젝트는 학습 및 팀 프로젝트 목적으로 제작되었습니다.
