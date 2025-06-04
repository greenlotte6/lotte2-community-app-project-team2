import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <div className="headerLogo">
          <Link to="#">
            <img
              src="/images/linkON_logo_upscaled.png"
              alt="logo"
              className="logo"
            />
          </Link>
          <h2 className="logoText">LinkON</h2>
        </div>
        <div className="headerOthers">
          <img
            src="/images/DarkMode.svg"
            alt="DarkMode"
            className="headerIcon"
          />
          <Link to="#">
            <img
              src="/images/NotificationsNone.svg"
              alt="Alarm"
              className="headerIcon"
            />
          </Link>
          <Link to="#" className="profile">
            <img
              src="/images/Avatar.png"
              alt="Profile"
              className="headerIcon"
            />
            <img src="/images/Status.svg" alt="Status" className="Status" />
          </Link>
        </div>
      </header>
    </>
  );
};
