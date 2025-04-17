import React, { useState, useEffect, useRef } from 'react';
import './ScrollButtonStyles.css';

const ScrollButton = () => {
    const [scroll, setScroll] = useState(0);
    const clickToTopRef = useRef<HTMLAnchorElement>(null);

    const updateScroll = () => {
        setScroll(window.scrollY);
    };

    const onClickScrollToTop = () => {
        window.scrollTo(0, 0);
        setScroll(0);
    };

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        clickToTopRef.current?.addEventListener('click', onClickScrollToTop);

        return () => {
            window.removeEventListener('scroll', updateScroll);
            clickToTopRef.current?.removeEventListener(
                'click',
                onClickScrollToTop
            );
        };
    }, []);

    return (
        <aside aria-label="Back to Top">
            <a
                ref={clickToTopRef}
                id="stt"
                className={scroll < 200 ? 'hidden' : 'visisble'}
                style={{ cursor: 'pointer' }}
            >
                <span id="stt-span">BACK TO TOP</span>
            </a>
        </aside>
    );
};

export default ScrollButton;
