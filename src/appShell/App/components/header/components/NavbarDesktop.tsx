import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import {
    navMobileList,
    navbarSublists,
} from '../../../config/globalHeaderData';

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);
    z-index: 2;
    position: relative;

    .dropdownContainer {
        // outline: none;
        // visibility: hidden;
        // opacity: 0;
        margin: 0 auto;
        position: relative;
        width: 1400px;
    }

    .invisible {
        visibility: hidden;
    }
`;

const NavContainer = styled.div`
    margin: 0 auto;
    max-width: 1400px;
    text-align: left;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

const UlContainer = styled.ul`
    margin-bottom: 0 !important;
    list-style: none;
    margin: 0;
    padding-top: 17px;
    padding-left: 11px;
`;

const LiSection = styled.li`
    font-family: 'Open Sans';
    // font-style: normal;
    // font-weight: 400;
    display: inline-block;
    position: relative;
    line-height: 50px;
    letter-spacing: 1px;
    text-align: center;
    transition: all 0.3s ease-in-out;

    a {
        color: #585c65;
        text-decoration: none !important;
    }

    .navTitle {
        display: block;
        color: #585c65;
        font-family: poppins;
        font-size: 17px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: normal;
        text-decoration: none;
        margin: 0 45px 0 5px;
        padding: 0 15px;
        user-select: none;
        border-top: 4px solid transparent;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
    }

    .navTitle:hover {
        cursor: pointer;
    }

    .navText {
        border-bottom: 4px solid transparent;
    }

    .navText:hover {
        cursor: pointer;
        color: #3a75bd;
        border-bottom: 4px solid #3a75bd;

        ::after {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-bottom: 1px solid #298085;
            border-left: 1px solid #298085;
            margin: 0 0 4px 8px;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
        }
    }

    .navText::after {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-bottom: 1px solid #585c65;
        border-left: 1px solid #585c65;
        margin: 0 0 4px 8px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .clicked {
        color: #ffffff;
        background: #1f4671;
    }

    .clicked::after {
        border-top: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        border-bottom: 0;
        border-left: 0;
        margin: 0 0 0 8px;
    }

    .clicked:hover {
        border-bottom: 4px solid #1f4671;
        color: #ffffff;

        ::after {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-top: 1px solid #ffffff;
            border-right: 1px solid #ffffff;
            border-bottom: 0;
            border-left: 0;
            margin: 0 0 0 8px;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
        }
    }

    .directLink::after {
        display: none;
    }

    .directLink:hover {
        ::after {
            display: none;
        }
    }

    .shouldBeUnderlined {
        border-bottom: 4px solid #3a75bd;
    }

    .navTitleClicked {
        display: block;
        color: #ffffff;
        font-family: poppins;
        font-size: 17px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: normal;
        text-decoration: none;
        margin: 0 45px 0 5px;
        padding: 0 15px;
        user-select: none;
        background: #1f4671;
        border-top: 4px solid #5786ff;
        border-left: 4px solid #5786ff;
        border-right: 4px solid #5786ff;
    }
`;

const Dropdown = styled.div`
    top: 60.5px;
    left: 0;
    width: 100%;
    background: #1f4671;
    z-index: 2;
    position: absolute;
    // visibility: hidden;
    // outline: none;
    // opacity: 0;
`;

const DropdownContainer = styled.div`
    margin: 0 auto;
    text-align: left;
    position: relative;
    max-width: 1400px;

    .dropdownList {
        background: #1f4671;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        padding: 32px 32px 0 32px;
    }

    .dropdownItem {
        padding: 0 10px 52px 10px;
        text-align: left;
        font-family: 'Poppins';
        font-weight: 600;
        font-style: normal;
        font-size: 20px;
        line-height: 110%;
        color: #ffffff;
        text-decoration: none;
    }

    .dropdownItem:hover {
        text-decoration: underline;
    }

    .dropdownItemText {
        margin-top: 5px;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 16.16px;
        line-height: 22px;
    }
`;

const StyledLoginLink = styled(Link)`
    color: #007bbd;
    text-align: right;
    font-size: 14px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.42px;
    text-decoration: none;
    text-transform: uppercase;
    padding: 10px 0 10px 0;
    margin-bottom: 4.5px;
    margin-right: 32px;
`;

const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                !event.target ||
                (event.target.getAttribute('class') !== 'dropdownList' &&
                    ref.current &&
                    !ref.current.contains(event.target))
            ) {
                const toggle = document.getElementsByClassName(
                    'navText clicked'
                );
                if (
                    toggle[0] &&
                    event.target.getAttribute('class') !== 'navText clicked' &&
                    event.target.getAttribute('class') !== 'navText clicked'
                ) {
                    const temp: HTMLElement = toggle[0] as HTMLElement;
                    temp.click();
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
};

const NavBar = () => {
    const [clickedTitle, setClickedTitle] = useState('');
    const dropdownSelection = useRef(null);
    // Exclude Login from Navbar
    // const filteredNavMobileList = navMobileList.filter((item) => !item.notExistInNav);
    const clickableObject = navMobileList.filter(
        item => item.className === 'navMobileItem clickable'
    );
    const clickableTitle = clickableObject.map(item => item.name);
    useOutsideAlerter(dropdownSelection);

    const handleMenuClick = (e: any) => {
        if (
            e.target.innerText === clickedTitle ||
            !clickableTitle.includes(e.target.innerText)
        ) {
            setClickedTitle('');
        } else {
            setClickedTitle(e.target.innerText);
        }
    };

    const onKeyPressHandler = (e: any) => {
        if (e.key === 'Enter') {
            handleMenuClick(e);
        }
    };
    type NavSubLinkData = {
        name: string;
        link: string;
        className: string;
    };

    function shouldBeUnderlined(item: any) {
        const linkName = item.name;
        const correctPath = window.location.href.slice(
            window.location.href.lastIndexOf(window.location.host) +
                window.location.host.length
        );
        if (item.className === 'navMobileItem') {
            return correctPath === item.link;
        }
        // @ts-ignore
        if (navbarSublists[linkName] === undefined) {
            return false;
        }
        // @ts-ignore
        const linkNames = Object.values(navbarSublists[linkName]).map(
            (e: NavSubLinkData) => e.link
        );
        return linkNames.includes(correctPath);
    }

    useEffect(() => {
        setClickedTitle('');
    }, []);

    return (
        <Nav>
            <NavContainer>
                <UlContainer>
                    {navMobileList.map((navMobileItem, idx) => {
                        const navkey = `nav_${idx}`;
                        return navMobileItem.className === 'navMobileItem' ? (
                            // @ts-ignore
                            <LiSection key={navkey}>
                                <div className="navTitle directLink">
                                    <NavLink
                                        to={navMobileItem.link}
                                        target={
                                            navMobileItem.external
                                                ? '_blank'
                                                : undefined
                                        }
                                    >
                                        <div
                                            id={navMobileItem.id}
                                            onKeyDown={onKeyPressHandler}
                                            role="button"
                                            tabIndex={0}
                                            className={`navText directLink ${
                                                shouldBeUnderlined(
                                                    navMobileItem
                                                )
                                                    ? 'shouldBeUnderlined'
                                                    : ''
                                            }`}
                                            onClick={handleMenuClick}
                                        >
                                            {navMobileItem.name}
                                        </div>
                                    </NavLink>
                                </div>
                            </LiSection>
                        ) : (
                            // @ts-ignore
                            <LiSection key={navkey}>
                                <div
                                    className={
                                        clickedTitle === navMobileItem.name
                                            ? 'navTitleClicked'
                                            : 'navTitle'
                                    }
                                >
                                    <div
                                        id={navMobileItem.id}
                                        onKeyDown={onKeyPressHandler}
                                        role="button"
                                        tabIndex={0}
                                        className={`${
                                            clickedTitle === navMobileItem.name
                                                ? 'navText clicked'
                                                : 'navText'
                                        } ${
                                            shouldBeUnderlined(navMobileItem)
                                                ? 'shouldBeUnderlined'
                                                : ''
                                        }`}
                                        onClick={handleMenuClick}
                                    >
                                        {navMobileItem.name}
                                    </div>
                                </div>
                            </LiSection>
                        );
                    })}
                </UlContainer>
                {/* <StyledLoginLink id="header-navbar-login-button" to="/login">
          Login
        </StyledLoginLink> */}
            </NavContainer>
            {/* @ts-ignore */}
            <Dropdown
                ref={dropdownSelection}
                className={clickedTitle === '' ? 'invisible' : ''}
            >
                <DropdownContainer>
                    <div className="dropdownList">
                        {clickedTitle !== ''
                            ? // @ts-ignore
                              navbarSublists[clickedTitle].map(
                                  (dropItem: any, idx: number) => {
                                      const dropkey = `drop_${idx}`;
                                      return (
                                          dropItem.link && (
                                              <Link
                                                  id={dropItem.id}
                                                  to={dropItem.link}
                                                  target={
                                                      dropItem.external
                                                          ? '_blank'
                                                          : undefined
                                                  }
                                                  className="dropdownItem"
                                                  key={dropkey}
                                                  onClick={() =>
                                                      setClickedTitle('')
                                                  }
                                              >
                                                  {dropItem.name}
                                                  <div className="dropdownItemText">
                                                      {dropItem.text}
                                                  </div>
                                              </Link>
                                          )
                                      );
                                  }
                              )
                            : null}
                    </div>
                </DropdownContainer>
            </Dropdown>
        </Nav>
    );
};

export default NavBar;
