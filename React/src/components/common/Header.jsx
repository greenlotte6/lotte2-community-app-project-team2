import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
        <header>
            <div class="headerLogo">
                <Link to="#">
                    <img src="/images/linkON_logo_upscaled.png" alt="logo" class="logo"/>
                </Link>
                <h2 class="logoText">LinkON</h2>
            </div>
            <div class="headerOthers">
                <img src="/images/DarkMode.svg" alt="DarkMode" class="headerIcon"/>
                <Link to="#">
                    <img src="/images/NotificationsNone.svg" alt="Alarm" class="headerIcon"/>
                </Link>
                <Link to="#" class="profile">
                    <img src="/images/Avatar.png" alt="Profile" class="headerIcon"/>
                    <img src="/images/Status.svg" alt="Status" class="Status"/>
                </Link>
            </div>
        </header>
    </>
  )
}
