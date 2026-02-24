import React, { useEffect, useRef } from 'react';
import './AnimatedCursor.css';

const AnimatedCursor = () => {
    const cursorFollower = useRef(null);
    const cursorArrow = useRef(null);

    // This new useEffect adds a class to the body when the component mounts
    // and removes it when it unmounts.
    useEffect(() => {
        document.body.classList.add('has-custom-cursor');

        return () => {
            document.body.classList.remove('has-custom-cursor');
        };
    }, []); // Empty array means this runs only on mount and unmount

    useEffect(() => {
        const follower = cursorFollower.current;
        const arrow = cursorArrow.current;
        if (!follower || !arrow) return;

        let followerX = 0, followerY = 0;
        let targetX = 0, targetY = 0;
        const speed = 0.1;

        const animateFollower = () => {
            followerX += (targetX - followerX) * speed;
            followerY += (targetY - followerY) * speed;
            
            arrow.style.left = `${targetX}px`;
            arrow.style.top = `${targetY}px`;
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        const moveListener = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };
        window.addEventListener('mousemove', moveListener);

        return () => window.removeEventListener('mousemove', moveListener);
    }, []);

    return (
        <>
            <div ref={cursorArrow} className="cursor-arrow"></div>
            <div ref={cursorFollower} className="cursor-follower"></div>
        </>
    );
};

export default AnimatedCursor;