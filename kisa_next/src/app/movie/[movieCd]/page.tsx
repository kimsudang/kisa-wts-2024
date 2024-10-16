import { Metadata } from "next";
import Link from "next/link";

type IProps = {
  params: {
    movieCd: string;
  };
};

type ResponseType = {
  movieInfoResult: {
    movieInfo: {
      movieCd: string;
      movieNm: string;
      movieNmEn: string;
      movieNmOg: string;
      showTm: string;
      prdtYear: string;
      openDt: string;
      prdtStatNm: string;
      typeNm: string;
      nations: NationType[];
      genres: { genreNm: string }[];
      directors: {
        peopleNm: string;
        peopleNmEn: string;
      }[];
      actors: {
        peopleNm: string;
        peopleNmEn: string;
        cast: string;
        castEn: string;
      }[];
      showTypes: {
        showTypeGroupNm: string;
        showTypeNm: string;
      }[];
      companys: {
        companyCd: string;
        companyNm: string;
        companyNmEn: string;
        companyPartNm: string;
      }[];
      audits: {
        auditNo: string;
        watchGradeNm: string;
      }[];
      staffs: {
        peopleNm: string;
        peopleNmEn: string;
        staffRoleNm: string;
      }[];
    };
  };
};

type NationType = {
  nationNm: string;
};

/* 정적 사이트로 변경하기=> [] 동적 사이트니까...
  / 어제 박스 오피스
  /?targetDt=yyyymmdd 특정 날짜 오피스
  movie?movieCd=202021992 특정 영회에 대한 조회
*/

export const metadata: Metadata = {
  title: "영화 상세 정보: 영화 위키",
  description: "일별 박스 오피스를 확인하고 영화 정보와 영화인 정보를 조회할 수 있습니다.",
  openGraph: {
    title: "영화 상세 정보: 영화 위키",
    description: "일별 박스 오피스를 확인하고 영화 정보와 영화인 정보를 조회할 수 있습니다.",
    images: "",
  },
};

export default async function Page({ params: { movieCd } }: IProps) {
  const apiKey = "e82bb2f5f90d8d7922b6e26aa9852b33";
  const baseUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json";
  const url = `${baseUrl}?key=${apiKey}&movieCd=${movieCd}`;
  const response = await fetch(url);
  const json: ResponseType = await response.json();

  return (
    <div>
      <ul>
        <li>
          영화명 : {json.movieInfoResult.movieInfo.movieNm} ({json.movieInfoResult.movieInfo.movieNmEn})
        </li>
        <li>상영시간 : {json.movieInfoResult.movieInfo.showTm}분</li>
        <li>
          출연 :
          {json.movieInfoResult.movieInfo.actors.map((actor) => (
            <span className="inline-block mr-2" key={actor.peopleNm}>
              {actor.peopleNm}
            </span>
          ))}
        </li>
        <li>
          감독 :
          {json.movieInfoResult.movieInfo.directors.map((directors) => (
            <span className="inline-block mr-2" key={directors.peopleNm}>
              {directors.peopleNm}
            </span>
          ))}
        </li>
      </ul>
      {/* <pre>
        <code>{JSON.stringify(json, null, 2)}</code>
      </pre> */}
      <Link href="/">
        <p>박스오피스 목록으로</p>
      </Link>
    </div>
  );
}
