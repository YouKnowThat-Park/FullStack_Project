
## ✍️ Tech Stack

### Front-End  
![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000?logo=Zustand&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-informational?logo=zod&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_React_Query-ff4154?logo=react-query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-purple?logo=eslint&logoColor=white)

### Back-End
![Python](https://img.shields.io/badge/Pytho-3776AB?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white)

### DB
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

---
## ⚠️ Security & Access
```md
- Middleware 사용하여 로그인 상태에서 Sign-in, Sign-up 페이지 접근 제한, 또한 Mypage는 로그인 정보가 있을 경우 이동 가능
- JWT Token에서 decodePayloadFromJWT를 사용해 staff권한 확인, 있을경우 Admin 페이지로 이동 
```
## 👤 Auth
```md
Django + DRF + SimpleJWT를 사용해 회원가입 및 로그인, 사용자 정보 시스템 구축.
- AbstractBaseUser, PermmissionsMixin을 사용하여 유저, 권한 필드 정의
- User Manager에서 일반 사용자(user) / 관리자(staff, superuser) 계정 생성 로직 분리 
- normalize_"?"  유틸 함수를 만들어 서버 측 입력값도 정규화
- RegisterSerializer로 회원가입 요청을 처리 및 비밀번호 해싱 저장
- EmailTokenObtainPairSerializer에서 username > email 필드 교체
- EmailTokenObtainPairView에서 로그인 요청 시 JWT 발급 후 HttpOnly 쿠키에 access, refresh 저장
- RegisterView(회원가입), UserDetailView(사용자 정보) API 구성
```
```md
Next.js + TypeScript + RHF + Zod를 사용해 회원가입 및 로그인 시스템 구축.
- Sign-up은 클라이언트에서 백엔드 직접 호출, Sign-in은 API Route를 사용해서 보안 강화
- React Hook Form + Zod를 사용해 클라이언트에서 입력값 검증 및 에러 메시지 처리
- <AuthInputField /> 컴포넌트로 공통 AuthInput 재사용하기 위해 forwarRef 사용해서 넘김
- JWT access, refresh 쿠니는 Django에서 HttpOnly 쿠키로 저장
```
```md
Tanstack Query의 Mutation을 사용하여 사용자 정보 수정
- <AuthInputField /> 컴포넌트로 공통 AuthInput 재사용
- name, password 변경 가능
```
## 💂🏻 Admin
```md
프론트엔드 관리자 페이지 구축.
- 로그인시 관리자(staff, superuser)권한을 JWT Token에 넣고 관리자 페이지에서 권한 확인
- PageNumberPagination을 적용하여 페이지당 10명의 데이터만 반환
- 클라이언트에서는 Tanstack Query를 사용해 서버로부터 유저 리스트를 페이지 단위로 요청
- 관리자 전용 페이지에서 사용자 정지/해제 기능 추가
  - suspend, suspend_days 파라미터를 받아 정지 설정 또는 해제 처리
  - 정지 시 suspended_until 계산, 해제 시 관련 필드 초기화
  - 1, 3, 7, 30일 정지 버튼 및 해제 버튼 제공
  - 정지 기간 후 자동 refetch처리 
```
## 🏬 Product
```md
일반 사용자들이 접근 가능한 상품 리스트 페이지 구축.
- PublicProductListView를 통해 공개 가능한 상품 정보만 GET으로 요청
  - name, description, price, discount_price, stok, rating, category
  - 민감 필드는 PublicProductListView에서 exclude 처리
  - 민감 필드 → admin_user, sold_count 등등

- 추후 상품 상세 페이지 제작 예정
```

```md
관리자 권한이 있는 사용자만 접근 가능한 상품 관리 페이지 구축.
- ProductListCreateView를 통해 관리자가 상품 목록 조회 및 상품 등록 가능 (GET, POST)
  - 상품 등록시 로그인된 관리자의 name을 admin_user로 자동 저장 (상품을 등록한 관리자가 누군지)
  - 일반 사용자가 볼수 없는 민감한 필드를 전부 보여줌
  - 이미지 등록은 ProductImageCreateView 에서 별도 처리
  - 상품 등록 페이지는 모달로 관리 (모달 상태는 Zustand로 관리)

- 이미지 저장은 ProductImage 모델로 분리 관리, 이미지 필드는 로컬 MEDIA_ROOT에 저장됨
  - 추후 Cloudinary, Supabase, AWS S3등 외부 이미지 스토리지와 통합 예정

- ProductRetrieveUpdateDestroyView를 통해 관리자가 상품 정보 수정 가능 (GET, FATCH)
  - name, price, diiscount_price, description 등 수정 가능
  - getProductById을 사용해 상품 수정 페이지에 기존 데이터 불러오기 (Input에 기존 값이 보이고 수정할 수 있게)
  - 상품 수정 페이지 또한 모달로 관리 (모달 상태는 Zustand로 관리)
```
