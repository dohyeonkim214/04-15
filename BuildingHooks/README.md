# 🎣 React Hooks Learning

React의 주요 Hooks를 학습하고 실습하는 프로젝트입니다.

## 📁 프로젝트 구조

```
BuildingHooks/
├── index.html          # 메인 HTML 파일
├── vite.config.js      # Vite 설정
├── package.json        # 의존성 관리
├── src/
│   ├── main.jsx       # 진입점
│   ├── App.jsx        # 메인 앱 컴포넌트
│   ├── style.css      # 전역 스타일
│   └── hooks/         # Hook 예제 파일들
│       ├── UseStateExample.jsx
│       ├── UseEffectExample.jsx
│       ├── UseContextExample.jsx
│       └── UseReducerExample.jsx
```

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

### 3. 빌드
```bash
npm run build
```

## 📚 학습 내용

### useState
상태(state)를 함수 컴포넌트에서 사용합니다.
- 카운터 예제
- Todo 리스트 예제

### useEffect
컴포넌트의 생명주기에서 작업을 수행합니다.
- 마운트/언마운트 실행
- 특정 의존성으로 실행
- 데이터 페칭
- 이벤트 리스너 등록/제거

### useContext
Props drilling 없이 전역 상태를 전달합니다.
- 테마 전환
- 사용자 정보 관리

### useReducer
복잡한 상태 로직을 체계적으로 관리합니다.
- 여러 액션 처리
- 상태 업데이트 로직 분리
- Redux와 유사한 패턴

## 💡 학습 팁

1. 각 탭을 클릭하여 다른 Hook 예제를 살펴보세요
2. 브라우저 개발자 도구 콘솔을 열어서 로그를 확인하세요
3. 코드를 수정하고 결과를 즉시 확인하세요 (Hot Module Replacement)
4. 각 Hook의 사용 시나리오를 이해하고, 실제 프로젝트에 적용해보세요

## 🎯 다음 단계

다음 hooks도 학습해보세요:
- `useRef` - DOM 요소나 값의 참조 유지
- `useMemo` - 계산 결과 메모이제이션
- `useCallback` - 함수 메모이제이션
- `useCustomHook` - 커스텀 Hook 만들기

## 📝 참고 자료

- [React Hooks 공식 문서](https://react.dev/reference/react)
- [React Hooks API](https://react.dev/reference/react/hooks)
