import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

// 어플리케이션이 로드되면 파이어베이스는 로그인 되어있는지 아닌지 확인할 시간이 없다
// 그래서 어플리케이션이 로드되면 반드시 로그아웃을 시켜줘야 한다(isLoggedIn이 false여야)
// 다시 말하지만 그 이유는 파이어베이스가 초기화되고 모든 걸 로드할 때까지 기다려줄 시간이 없어서...
// authService의 onAuthStateChanged를 사용하여 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킨다
// onAuthStateChanged는 event Listener이기 때문에 user 정보에 변화가 생기면 바로 함수를 실행한다.
// init이 처음에 false인 이유는 파이어베이스의 초기화가 이루어지지 않은 상태에서 Router 컴포넌트를 숨기기 위함이다.
// 만일 로그인이 된다면 userObj에 계정 정보인 user을 담아준다.
// 계정 정보인 user은 정말 많은 계정 정보를 포함하고 있다. 물론, phtourl도 있다.
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserobj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserobj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserobj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
