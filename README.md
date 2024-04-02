# svelte-simple-chat
http://13.209.167.16:4173/first

## 개요: ChatterBox

"Chatter" (속삭이다)와 "Box"를 결합하여 비밀스럽고 친밀한 대화 공간임을 연상시키도록 하였다.

참고 Gemini

### **프로젝트 목적**

이 프로젝트는 실시간 채팅 웹 애플리케이션을 구현합니다. 사용자들은 웹 브라우저를 통해 채팅방에 접속하여 메시지를 주고받을 수 있습니다.

- Svelte 프레임워크 활용
- Node.js 서버 구축
- Socket.IO를 통한 실시간 통신

### **주요 기능**

- 실시간 메시지 전송 및 수신
- 입장한 사용자 목록 관리 (인원 수 표시)
- 채팅방 입장 및 퇴장 알림

### 참고하면 좋아요🙋‍♀️
 
- 웹 개발 초보자 및 중급 개발자
- Svelte 프레임워크 학습자
- 실시간 웹 애플리케이션 개발에 관심 있는 개발자

## 기술스택 ⚙
### ✔️Frond-end
<img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white"><img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/SocketIO-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
### ✔️Back-end
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"><img src="https://img.shields.io/badge/SocketIO-010101?style=for-the-badge&logo=socketdotio&logoColor=white">

## **설치 및 실행**

### 필요한 환경

- Node.js v18 이상
- npm

### 환경변수

server, front 각각 하나씩 .env 파일이 필요하며 필드명과 내용은 아래와 같다.

1. server/.env
    1. CORS 허용을 위해 필요
    2. FRONT_URL=[Svelte Web 서버 url]
    
    ```powershell
    FRONT_URL=http://localhost:5173
    ```
    
2. front/.env
    1. Socket 연결과 사용자 수 조회 API 등을 위해 필요
    2. PUBLIC_SERVER=[Node.js 서버 url]
    
    ```powershell
    PUBLIC_SERVER=http://localhost:3000
    ```
    

### 실행

1. 소스 다운
    
    ```powershell
    git clone https://github.com/chaelin1211/svelte-simple-chat.git
    ```
    
2. Node.js 서버 실행 — localhost:3000
    
    ```powershell
    cd server
    npm install
    npm run start
    ```
    
3. Svelte web 실행 — localhost:5173
    
    ```powershell
    cd ..
    cd front
    npm install
    npm run dev
    ```
    
4. http://localhost:5173 접속 / 이름 입력 → ENTER
        ![image](https://github.com/chaelin1211/svelte-simple-chat/assets/48509225/6be7779e-5873-441e-a831-86b0a092ed92)
        ![image](https://github.com/chaelin1211/svelte-simple-chat/assets/48509225/399f339a-5d70-4bde-a222-f086a06fb445)

        

### 오류 발생 시

1. 위처럼 입장 안내가 표시되지 않을 경우, Node.js 서버와 연결되지 않은 것이므로 개발자 도구를 통해 연결이 제대로 이루어지는지 확인
    1. 환경변수 누락 시, CORS 정책에 의해 응답을 수신하지 못했거나 서버로 요청 자체가 이루어지지 않았을 수 있다.

## 추가될 기능 

1. 도메인 구매/등록
2. 채팅방 개설
3. 채팅방 별 비밀번호
4. 닉네임 중복 방지
5. 입장/퇴장 안내 중간 정렬
