// 동적 주소 처리 방식
// query string / search params : 주소?key=value&key2=value2 .... (url encoded / encoded url)
// url params

import dayjs from "dayjs";
import PrevButton from "./component/button/prevButton";
import NextButton from "./component/button/nextButton";
import Link from "next/link";

// localhost:3000/?targetDT=20241010

type IProps = {
  searchParams: {
    targetDt?: string;
  };
};

type ResponseType = {
  boxOfficeResult: {
    boxofficeType: string;
    showRange: string;
    dailyBoxOfficeList: ItemType[];
  };
};

type ItemType = {
  rnum: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  salesAmt: string;
  salesShare: string;
  salesInten: string;
  salesChange: string;
  salesAcc: string;
  audiCnt: string;
  audiInten: string;
  audiChange: string;
  audiAcc: string;
  scrnCnt: string;
  showCnt: string;
};

// const today = dayjs().format("YYYYMMDD"); // 오늘
const today = dayjs().subtract(1, "day").format("YYYYMMDD"); // 오늘보다 하루 전

export default async function Home({ searchParams: { targetDt = today } }: IProps) {
  const apiKey = "e82bb2f5f90d8d7922b6e26aa9852b33";
  const baseUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
  console.log(`targetDt: ${targetDt}`);

  const url = `${baseUrl}?key=${apiKey}&targetDt=${targetDt}`;

  // 요청
  const response = await fetch(url);
  // json 파싱
  const json: ResponseType = await response.json();

  console.log(JSON.stringify(json, null, 2));

  // return 할 수 있는 유형
  // 1. Primitive 타입 데이터 (원시타입: number, string, boolean)
  // 2. JSX Node
  // 3. 1 또는 2로 구성된 배열

  return (
    <div className="w-[500px] mx-auto">
      <div className="flex justify-between">
        <PrevButton targetDt={targetDt} />
        {/* <p>{today} 박스오피스</p> */}
        {dayjs(targetDt).format("YYYY년 MM월 DD일").padEnd(2, "0")}
        <NextButton targetDt={targetDt} today={today} />
      </div>
      <div className="flex justify-center mt-5">
        {Number(today) + 1 === Number(targetDt) ? (
          <p>오늘 박스오피스 목록은 내일 공개됩니다.</p>
        ) : (
          <ol>
            {json.boxOfficeResult.dailyBoxOfficeList.map((item: ItemType) => (
              <li key={item.rank}>
                {item.rank}위 :<Link href={`/movie/${item.movieCd}`}>{item.movieNm}</Link>
                {item.rankOldAndNew === "NEW" && <span className="text-xs text-red-500">New!</span>}
              </li>
            ))}
          </ol>
        )}
      </div>
      {/* <pre>
        <code>{JSON.stringify(json, null, 2)}</code>
      </pre> */}
    </div>
  );
}

// Tip : 자바스크립트 값 할당 팁
// const key = condition || "value" // condition이 거짓이면 "value" 할당
// const key = condition && "value" // condition이 참이면 "value" 할당
// 삼항연산자 사용
// react-if library
