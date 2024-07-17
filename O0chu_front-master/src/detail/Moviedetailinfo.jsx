import React, { useEffect, useRef, useState } from "react";
import StarRating from "../etc/star/RatingStar";
import UserRatingBt from "./UserRatingBt";

import { useUserStore } from "./../store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Auth from "../hoc/auth";
import Loading from "../loading/Loading";
import Getstar from "./Getstar";
import ScrollToTopButton from "../scrolltop/ScrolltoptoButton";
import Addwish from "../wishlist/Addwish";
import ScrollToQuestion from "../scrolltop/ScrolltoQuestion";

const Moviedetailinfo = ({ movied }) => {
  const i = 0;
  const dispatch = useDispatch();

  const [movies, setmovie] = useState([]);
  const [load, setload] = useState(true);
  const [Rating, setRating] = useState(0);
  const [res, setres] = useState([]);

  const [modalopen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  // 날짜 형식 바꿔서

  const [pageReloaded, setPageReloaded] = useState(false);

  // useEffect(() => {
  //   if (!pageReloaded) {
  //     // 페이지가 로딩될 때 자동으로 새로 고침
  //     window.location.reload();
  //     setPageReloaded(true); // 한 번 실행 후 플래그 설정
  //   }
  // }, [pageReloaded]);

  const user = useSelector((state) => state.user);
  let email = "";
  if (user !== undefined && user.userData !== undefined) {
    email = user.userData.email;
  }

  useEffect(() => {
    // 페이지가 로드될 때 스크롤을 상단으로 이동
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setmovie(movied);
    setload(false);
  }, [movied]);

  const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = "visible";
  };

  let ott = [];
  let ott_name = [];

  if (movies.length > 0 && movies[0].ott_logos) {
    ott = movies[0].ott_logos.split(",");
    ott_name = movies[0].available_on_ott.split(",");
  }

  return (
    <div className="detailedPageWrap marT_20">
      <div className="posrtBox marR_20">
        {movies && movies.length > 0 && movies[0].poster_path !== "default_poster_url_here" ? (
          <img src={movies[i].poster_path} alt="영화 포스터" />
        ) : (
          <img src="/image/postrer.png" alt="영화 포스터" />
        )}
      </div>
      {movies.length > 0 ? (
        <div className="movieInfo">
          <h4 className="movie_title">
            {movies[0].kr_title}
            <Addwish movie_id={movies[i].movie_id} />
          </h4>

          <p>
            <span>감독 : </span>
            <span>{movies[i].directors}</span>
          </p>
          <p>
            <span>러닝타임 : </span>
            <span>{movies[i].runtime} 분</span>
          </p>
          <p>
            <span>장르 : </span>
            <span>{movies[i].genres}</span>
          </p>
          <p>
            <span>배우 : </span>
            <span>{movies[i].actors.slice(0, 100)}</span>
          </p>

          <p>
            <span>개봉일 : </span>
            <span>{movies[i].release_date}</span>
          </p>
          <p>
            <span>줄거리 : </span>
            <span>{movies[i].overview}</span>
          </p>

          <div className="marB_20">
            <h5>시청 가능한 OTT</h5>
            {ott.length > 0 ? (
              <p className="ottList">
                {ott.map((item, index) => {
                  return <img key={index} className="marR_5" src={item} alt="ott 로고" title={ott_name[index]} />;
                })}
              </p>
            ) : (
              <h3>지원하는 OTT 없음</h3>
            )}
            {/* <p className="ottList">{movies[i].ott_logos === "N/A" ? <h3>ott 지원 x</h3> : ott}</p> */}
          </div>
          <div className="marB_20">
            {movies[i].trailer_url === "" ? (
              <div></div>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  setModalOpen(true);
                  disableBodyScroll();
                }}
              >
                트레일러 보기
              </button>
            )}
          </div>
          {modalopen && (
            <div
              className="modal-container"
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
              }}
            >
              <div className="modar">
                <button
                  className="close-btn"
                  onClick={() => {
                    setModalOpen(false);
                    enableBodyScroll();
                  }}
                >
                  X
                </button>

                <iframe id="ytvideo" width="560" height="315" src={movies[i].trailer_url} frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          )}
          {/* <UserRatingBt user_id={email} movie_id={movies[i].movie_id} korean_title={movies[i].kr_title} /> */}
          <Getstar user_email={email} movie_id={movies[i].movie_id} />
          <div className="scroll-to-div">
            <ScrollToQuestion />
            <ScrollToTopButton />
          </div>
        </div>
      ) : (
        <h1>
          <Loading />
        </h1>
      )}
    </div>
  );
};

export default Moviedetailinfo;
