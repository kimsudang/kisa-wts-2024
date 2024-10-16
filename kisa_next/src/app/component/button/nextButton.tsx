"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation"; // app router 용

type IProps = {
  targetDt: string;
  today: string;
};

export default function NextButton({ targetDt, today }: IProps) {
  const router = useRouter();
  const nextDate = Number(today) < Number(targetDt);

  return (
    <>
      {!nextDate ? (
        <button
          onClick={() => {
            router.push(`/?targetDt=${dayjs(targetDt).add(1, "day").format("YYYYMMDD")}`);
          }}
        >
          다음
        </button>
      ) : (
        <button></button>
      )}
    </>
  );
}
