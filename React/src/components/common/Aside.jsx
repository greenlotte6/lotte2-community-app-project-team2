import React from "react";
import { Link } from "react-router-dom";

export const Aside = () => {
  return (
    <>
      <aside>
        <ul>
          <Link to="#">
            <li>
              <img src="/images/Home.svg" className="asideIcon" />
              <p>홈</p>
            </li>
          </Link>
          <li className="ListSubheader">
            <img src="/images/ListSubheader.png" />
          </li>
          <Link to="#">
            <li>
              <img src="/images/Message.svg" className="asideIcon" />
              <p>채팅</p>
            </li>
          </Link>
          <Link to="#">
            <li>
              <img src="/images/User.svg" className="asideIcon" />
              <p>내 정보</p>
            </li>
          </Link>
          <Link to="#">
            <li>
              <img src="/images/File.svg" className="asideIcon" />
              <p>페이지</p>
            </li>
          </Link>
          <Link to="#">
            <li>
              <img src="/images/Clipboard.svg" className="asideIcon" />
              <p>프로젝트</p>
            </li>
          </Link>
          <Link to="#" className="dropdown-toggle">
            <li>
              <img src="/images/Edit.svg" className="asideIcon" />
              <p>게시판</p>
            </li>
            <img
              src="/images/RightArrow.svg"
              alt="RightArrow"
              className="rightArrow"
            />
          </Link>

          <div className="dropdown displayNone dropdown-false">
            <ul className="dropItem">
              <Link to="#">
                <li>공지사항</li>
              </Link>
              <Link to="#">
                <li>고객문의</li>
              </Link>
            </ul>
          </div>
          <Link to="#" className="dropdown-toggle">
            <li>
              <img src="/images/Folder.svg" className="asideIcon" />
              <p>드라이브</p>
            </li>
            <img
              src="/images/RightArrow.svg"
              alt="RightArrow"
              className="rightArrow"
            />
          </Link>

          <div className="dropdown displayNone dropdown-false">
            <ul className="dropItem">
              <Link to="#">
                <li>공지사항</li>
              </Link>
              <Link to="#">
                <li>고객문의</li>
              </Link>
            </ul>
          </div>
          <Link to="#">
            <li>
              <img src="/images/CreditCard.svg" className="asideIcon" />
              <p>멤버십</p>
            </li>
          </Link>
          <Link to="#" className="dropdown-toggle">
            <li>
              <img src="/images/Tool.svg" className="asideIcon" />
              <p>관리자</p>
            </li>
            <img
              src="/images/RightArrow.svg"
              alt="RightArrow"
              className="rightArrow"
            />
          </Link>

          <div className="dropdown displayNone dropdown-false">
            <ul className="dropItem">
              <Link to="#">
                <li>공지사항</li>
              </Link>
              <Link to="#">
                <li>고객문의</li>
              </Link>
            </ul>
          </div>
          <Link to="#" className="dropdown-toggle">
            <li>
              <img src="/images/Settings.svg" className="asideIcon" />
              <p>환경설정</p>
            </li>
            <img
              src="/images/RightArrow.svg"
              alt="RightArrow"
              className="rightArrow"
            />
          </Link>

          <div className="dropdown displayNone dropdown-false">
            <ul className="dropItem">
              <Link to="#">
                <li>공지사항</li>
              </Link>
              <Link to="#">
                <li>고객문의</li>
              </Link>
            </ul>
          </div>
          <Link to="#" className="dropdown-toggle">
            <li>
              <img src="/images/Help.svg" className="asideIcon" />
              <p>고객센터</p>
            </li>
            <img
              src="/images/RightArrow.svg"
              alt="RightArrow"
              className="rightArrow"
            />
          </Link>

          <div className="dropdown displayNone dropdown-false">
            <ul className="dropItem">
              <Link to="#">
                <li>공지사항</li>
              </Link>
              <Link to="#">
                <li>고객문의</li>
              </Link>
            </ul>
          </div>
        </ul>
        <p className="copyright">Copyright @ LinkON. All rights reserved.</p>
      </aside>
    </>
  );
};
