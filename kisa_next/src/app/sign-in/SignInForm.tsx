import { useState } from "react";
import { signIn } from "./signIn.action";
//커밋테스트

export default function SignInForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        console.log({ email, password });
        if (!email) {
          alert("이메일은 필수 입력 사항입니다.");
          return;
        }
        if (!password) {
          alert("비밀번호는 필수 입력 사항입니다.");
          return;
        }
        const response = await signIn(email, password);
        if (response.success) {
          alert("로그인 되었습니다.");
        } else {
          alert(response.message || "서버와 통신에 실패했습니다.");
        }
      }}
    >
      <div>
        <input
          type="email"
          className="border w-full"
          placeholder="이메일"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          className="border w-full"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button>로그인</button>
    </form>
  );
}
