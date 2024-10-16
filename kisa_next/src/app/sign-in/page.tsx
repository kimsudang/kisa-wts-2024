"use client";

import SignInForm from "./SignInForm";

export default function Page() {
  return (
    <div className="w-[500px] mx-auto">
      <div className="font-bold text-center">로그인</div>

      <SignInForm />
    </div>
  );
}
