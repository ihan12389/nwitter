import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";

// 인증의 모든 과정은 authService가 처리한다.
// 사용자가 제공하는 건 그저 form과 input 뿐이다.
// Submit을 통해 입력된 email과 password를 authService의 createWithEmailAndPassword를 통해 제출하면 firebase에서 회원가입 처리를 진행한다.
// newAccount를 통해 계정이 있는지 없는지 여부를 가려내고 계정이 있다면 singInwithEmailAndPassword를 통해 로그인 기능을 구현한다.
// SignWithPopup과 SignWithRedirect를 통해 google과 github를 통해 로그인 가능하다.
// 여기서는 SignWithPopup으로 구글과 깃허브 로그인을 구현했다. (제일 간편)
// 클릭한 버튼의 name을 통해 구글인가 깃허브인가를 판단한 후 거기에 맞춰 provider를 생성한다.
// provider 생성을 위해서는 authService가 아니라 firebase(firebaseInstance)가 필요하다.
// 그리고 authService의 signInWithPopup에 provider을 건네어 로그인을 시도할 수 있다.
// 로그인을 위한 popup 창도 전부 자동으로 생성되니 정말로 간편하다.
const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
