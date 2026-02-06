import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} className={`card ${customClass || ''}`.trim()} {...rest} />
));
Card.displayName = 'Card';

const FRONT_Z = 10000; /* front card always on top of other layers */

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = forwardRef(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onFrontChange,
  skewAmount = 6,
  easing = 'elastic',
  children
}, ref) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 1.2,
          durMove: 1.2,
          durReturn: 1.2,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const swapRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const delayRef = useRef(delay);
  delayRef.current = delay;

  useImperativeHandle(ref, () => {
    return {
      next() {
        if (swapRef.current && !isAnimatingRef.current) {
          swapRef.current();
          clearInterval(intervalRef.current);
          intervalRef.current = window.setInterval(swapRef.current, delayRef.current);
        }
      }
    };
  }, []);

  useEffect(() => {
    const total = refs.length;
    const run = () => {
      refs.forEach((r, i) => {
        if (r.current) placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      });
      // Front card (index 0) gets highest z so it overlays everything
      if (refs[0]?.current) gsap.set(refs[0].current, { zIndex: FRONT_Z });

      const swap = () => {
        if (isAnimatingRef.current) return;
        if (order.current.length < 2) return;
        const [front, ...rest] = order.current;
        const elFront = refs[front]?.current;
        if (!elFront) return;

        isAnimatingRef.current = true;
        const newFrontIndex = rest[0];
        onFrontChange?.(newFrontIndex);

        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.set(elFront, { zIndex: FRONT_Z });
        tl.to(elFront, {
          y: '+=500',
          duration: config.durDrop,
          ease: config.ease
        });

        tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          if (!el) return;
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
          tl.set(el, { zIndex: slot.zIndex }, 'promote');
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durMove,
              ease: config.ease
            },
            `promote+=${i * 0.15}`
          );
        });

        const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
        tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
        tl.call(
          () => {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
          },
          undefined,
          'return'
        );
        tl.to(
          elFront,
          {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            duration: config.durReturn,
            ease: config.ease
          },
          'return'
        );

        tl.call(() => {
          order.current = [...rest, front];
          const newFrontEl = refs[rest[0]]?.current;
          if (newFrontEl) gsap.set(newFrontEl, { zIndex: FRONT_Z });
          isAnimatingRef.current = false;
        });
      };

      swapRef.current = swap;
      onFrontChange?.(0);
      intervalRef.current = window.setInterval(swap, delayRef.current);
    };

    const id = requestAnimationFrame(() => {
      run();
    });

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        if (swapRef.current) {
          intervalRef.current = window.setInterval(swapRef.current, delayRef.current);
        }
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        cancelAnimationFrame(id);
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => {
      cancelAnimationFrame(id);
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return <div ref={container} className="card-swap-container">{rendered}</div>;
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
