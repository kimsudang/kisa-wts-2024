"use server";
// client로 절대 노출되지 않는 값, 서버단에서만 확인 가능
// 서버사이드레이어에서 동작

// next.js가 임의로 이 서버 액션에 대한 post 요청 생성
// CSRF 방어 처리가 기본으로 포함 - API를 외부에서 호출하기가 더 어려워진다.
export async function signIn(email: string, password: string) {
  // prisma, sequelize, drizzle ORM 사용 가능
  console.log({ email, password });
  if (email === "admin@admin.com" && password === "admin") {
    return { success: true, message: "인증에 성공했습니다." };
  } else {
    return { success: false, message: "인증 정보를 확인해주세요" };
  }
}
