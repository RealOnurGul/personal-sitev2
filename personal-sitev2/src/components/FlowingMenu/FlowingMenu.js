import React, { Fragment, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#060010',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#060010',
  borderColor = '#fff',
  onItemClick,
  expandedIndex = null,
  renderDetail
}) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <ul className="menu">
        {items.map((item, idx) => (
          <Fragment key={idx}>
            <MenuItem
              link={item.link}
              text={item.text}
              image={item.image}
              speed={speed}
              textColor={textColor}
              marqueeBgColor={marqueeBgColor}
              marqueeTextColor={marqueeTextColor}
              borderColor={borderColor}
              onClick={onItemClick ? () => onItemClick(item, idx) : undefined}
              isExpanded={expandedIndex === idx}
            />
            {expandedIndex === idx && renderDetail && (
              <li className="menu__item-detail">
                {renderDetail(item, idx)}
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  onClick,
  isExpanded = false
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const lastHoverEdgeRef = useRef('bottom');
  const [repetitions, setRepetitions] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };
    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [text, image, repetitions, speed]);

  const active = isExpanded || isHovered;

  useEffect(() => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    const edge = lastHoverEdgeRef.current;
    if (active) {
      gsap
        .timeline({ defaults: animationDefaults })
        .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    } else {
      gsap
        .timeline({ defaults: animationDefaults })
        .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    }
  }, [active]);

  const handleMouseEnter = (ev) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    lastHoverEdgeRef.current = findClosestEdge(x, y, rect.width, rect.height);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <li
      ref={itemRef}
      className="menu__item"
      style={{ borderColor }}
    >
      <a
        href={link || '#'}
        className="menu__item-link"
        style={{ color: textColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {text}
      </a>
      <div
        ref={marqueeRef}
        className="marquee"
        style={{ backgroundColor: marqueeBgColor, color: marqueeTextColor }}
      >
        <div className="marquee__inner-wrap">
          <div ref={marqueeInnerRef} className="marquee__inner">
            {[...Array(repetitions)].map((_, idx) => (
              <div key={idx} className="marquee__part">
                <span>{text}</span>
                {image && (
                  <span
                    className="marquee__img"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default FlowingMenu;
