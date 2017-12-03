# 스마일게이트 서버개발캠프 과제 : URL 단축 서비스 만들기

![main](./0.png)

요구사항 : URL 을 입력 받아 짧게 줄이고, 생성된 짧은 URL을 입력하면 원래의 URL로 리다이렉트 해주는 URL 단축 (URL shortening) 서비스를 개발하세요.

### 구현된 기능
- URL 입력 폼 제공
- 단축 후 결과 출력
- 동일한 URL을 입력 할 경우 항상 동일한 shortening 결과 값 출력
- shortening 의 결과 값은 8문자 이내로 생성
- 브라우저에서 shortening URL을 입력하면 원래 URL로 리다이렉트
- 도메인은 localhost 로 처리(소스코드는 localhost 기반. 실제 구동 확인은 아래의 캡쳐 및 링크를 참조)

AWS 클라우드 서버 배포 완료 : [ http://smile.heeham.com ](http://smile.heeham.com)

### 추가한 기능
- URL 입력시 정상적인 URL 이 아니면 잘못된 URL 이라고 표시(잘못된 URL인 경우 & 등록되지 않은 단축 URL을 입력한 경우)
- QR 코드 구현

### 추가 캡쳐화면
![error1](./1.png)

![error2](./2.png)

![default](./3.png)

![custom](./4.png)
