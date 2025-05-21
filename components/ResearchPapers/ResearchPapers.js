/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS, RESEARCH_PAPERS } from "../../constants";
import VanillaTilt from "vanilla-tilt";
import styles from "./ResearchPapers.module.scss";
import ResearchTile from "./ResearchTile/ResearchTile";

const ResearchPapers = ({ isDesktop, clientHeight }) => {
  const sectionRef = useRef(null);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    let papersScrollTrigger;
    let papersTimeline;

    if (isDesktop) {
      [papersTimeline, papersScrollTrigger] = getPapersSt();
    } else {
      const paperWrapper = sectionRef.current.querySelector(".paper-wrapper");
      paperWrapper.style.width = "calc(100vw - 1rem)";
      paperWrapper.style.overflowX = "scroll";
    }

    const [revealTimeline, revealScrollTrigger] = getRevealSt();

    return () => {
      papersScrollTrigger && papersScrollTrigger.kill();
      papersTimeline && papersTimeline.kill();
      revealScrollTrigger && revealScrollTrigger.kill();
      revealTimeline && revealTimeline.progress(1);
    };
  }, [sectionRef, sectionTitleRef, isDesktop]);

  const getRevealSt = () => {
    const revealTl = gsap.timeline({ defaults: { ease: "none" } });

    revealTl.from(
      sectionRef.current.querySelectorAll(".staggered-reveal"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0,
      animation: revealTl,
    });

    return [revealTl, scrollTrigger];
  };

  const getPapersSt = () => {
    const timeline = gsap.timeline({ defaults: { ease: "none" } });
    const sidePadding =
      document.body.clientWidth -
      sectionRef.current.querySelector(".inner-container").clientWidth;
    const elementWidth =
      sidePadding +
      sectionRef.current.querySelector(".paper-wrapper").clientWidth;
    sectionRef.current.style.width = `${elementWidth}px`;
    const width = window.innerWidth - elementWidth;
    const duration = `${(elementWidth / window.innerHeight) * 100}%`;
    timeline
      .to(sectionRef.current, { x: width })
      .to(sectionTitleRef.current, { x: -width }, "<");

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: duration,
      scrub: 0,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
    });

    return [timeline, scrollTrigger];
  };

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[3].ref}
      className={`${
        isDesktop && "min-h-screen"
      } w-full relative select-none section-container transform-gpu`}
    >
      <div className="flex flex-col py- justify-center h-full">
        <div
          className="flex flex-col inner-container transform-gpu"
          ref={sectionTitleRef}
        >
          <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
            RESEARCH
          </p>
          <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
            My Research Papers
          </h1>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg max-w-sm mt-2 staggered-reveal">
            Exploring the frontiers of AI and machine learning through rigorous research and innovation.
          </h2>
        </div>
        <div
          className={`${
            clientHeight > 650 ? "mt-12" : "mt-8"
          } flex paper-wrapper no-scrollbar w-fit staggered-reveal`}
        >
          {RESEARCH_PAPERS.map((paper, index) => (
            <ResearchTile
              key={paper.name}
              research={paper}
              classes={index === RESEARCH_PAPERS.length - 1 ? "" : "mr-10 xs:mr-12 sm:mr-16"}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPapers; 