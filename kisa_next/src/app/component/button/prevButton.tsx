"use client";

import dayjs from "dayjs";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router"; // pages router 용
import { useRouter } from "next/navigation"; // app router 용

type IProps = {
  targetDt: string;
};

export default function PrevButton({ targetDt }: IProps) {
  // const params = useSearchParams();
  const router = useRouter();
  return (
    <button
      onClick={() => {
        // const date = searchParams.get("targetDt");
        router.push(`/?targetDt=${dayjs(targetDt).subtract(1, "day").format("YYYYMMDD")}`);
      }}
    >
      이전
    </button>
  );
}
