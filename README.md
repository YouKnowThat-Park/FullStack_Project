
## ✍️ Tech Stack

### Front-End  
![Next.js](https://img.shields.io/badge/Next.js-14.2.20-black?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.6-000?logo=Zustand&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.25.74-informational?logo=zod&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_React_Query-5.82.0-ff4154?logo=react-query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.60.0-EC5990?logo=reacthookform&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8-purple?logo=eslint&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8-DD3A0A?logo=postcss&logoColor=white)
### Back-End
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.x-092E20?logo=django&logoColor=white)

### DB
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)

---
## 👤 Auth
Django + DRF + SimpleJWT를 사용해 회원가입 및 로그인 시스템 구축.
- AbstractBaseUser, PermmissionsMixin을 사용하여 유저, 권한 필드 정의
- User Manager에서 일반 사용자(user) / 관리자(staff, superuser) 계정 생성 로직 분리 
- normalize_"?"  유틸 함수를 만들어 서버 측 입력값도 정규화
- RegisterSerializer로 회원가입 요청을 처리 및 비밀번호 해싱 저장
- EmailTokenObtainPairSerializer에서 username > email 필드 교체
- EmailTokenObtainPairView에서 로그인 요청 시 JWT 발급 후 HttpOnly 쿠키에 access, refresh 저장
- RegisterView(회원가입), UserDetailView(사용자 정보) API 구성

Next.js + TypeScript + RHF + Zod를 사용해 회원가입 및 로그인 시스템 구축.
