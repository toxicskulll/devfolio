/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS, SKILLS } from "../../constants";
import styles from "./Skills.module.scss";

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Initial reveal animation with optimized stagger
      const tl = gsap
        .timeline({ 
          defaults: { 
            ease: "power3.out",
            duration: 0.6
          } 
        })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { 
            opacity: 0, 
            y: 20,
            stagger: {
              amount: 0.6,
              from: "start",
              grid: "auto"
            }
          }
        );

      // Optimize hover animations
      const skillItems = sectionRef.current.querySelectorAll(".skill-item");
      skillItems.forEach((item) => {
        const name = item.querySelector(".skill-name");
        const icon = item.querySelector(".skill-icon");
        
        // Create reusable animations
        const hoverIn = gsap.timeline({ paused: true });
        const hoverOut = gsap.timeline({ paused: true });

        // Hover in animation
        hoverIn
          .to(name, {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
          })
          .to(icon, {
            scale: 1.15,
            duration: 0.3,
            ease: "back.out(1.7)"
          }, "<");

        // Hover out animation
        hoverOut
          .to(name, {
            y: 10,
            opacity: 0,
            duration: 0.15,
            ease: "power2.in"
          })
          .to(icon, {
            scale: 1,
            duration: 0.2,
            ease: "power2.in"
          }, "<");

        // Add event listeners with debounce
        let timeout;
        item.addEventListener("mouseenter", () => {
          clearTimeout(timeout);
          hoverOut.pause();
          hoverIn.play(0);
        });

        item.addEventListener("mouseleave", () => {
          timeout = setTimeout(() => {
            hoverIn.pause();
            hoverOut.play(0);
          }, 50);
        });
      });

      // Optimized scroll trigger
      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".skills-wrapper"),
        start: "top bottom-=100",
        end: "center center",
        scrub: 0.5,
        animation: tl,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(sectionRef.current.querySelectorAll(".skill-item"), {
            y: progress * -15,
            rotationX: progress * 3,
            stagger: 0.01,
            ease: "none",
            duration: 0.1
          });
        }
      });

      // Cleanup function
      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[1].ref}
      className="w-full relative select-none mt-44"
    >
      <div className="section-container py-16 flex flex-col justify-center">
        <img
          src="/right-pattern.svg"
          alt=""
          className="absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block"
          loading="lazy"
          height={700}
          width={320}
        />
        <div className="flex flex-col skills-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
              SKILLS
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
              My Skills
            </h1>
            <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
              Crafting AI experiences that feel like magic—but are really just math, 
              code, and midnight coffee.{" "}
            </h2>
          </div>
          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal">
              LANGUAGES AND TOOLS
            </h3>
            <div className="flex items-center flex-wrap gap-6 staggered-reveal">
              {SKILLS.languagesAndTools.map((skill) => (
                <div key={skill} className={`skill-item ${styles.skillItem}`}>
                  <Image
                    className={`skill-icon ${styles.skillIcon}`}
                    src={`/skills/${skill}.svg`}
                    alt={skill}
                    width={50}
                    height={50}
                  />
                  <span className={`skill-name ${styles.skillName}`}>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal">
              LIBRARIES AND FRAMEWORKS
            </h3>
            <div className="flex flex-wrap gap-6 transform-gpu staggered-reveal">
              {SKILLS.librariesAndFrameworks.map((skill) => (
                <div key={skill} className={`skill-item ${styles.skillItem}`}>
                  <Image
                    className={`skill-icon ${styles.skillIcon}`}
                    src={`/skills/${skill}.svg`}
                    alt={skill}
                    width={50}
                    height={50}
                  />
                  <span className={`skill-name ${styles.skillName}`}>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap mt-10">
            <div className="mr-16 xs:mr-20 mb-6 staggered-reveal">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4">
                DATABASES
              </h3>
              <div className="flex flex-wrap gap-6 transform-gpu">
                {SKILLS.databases.map((skill) => (
                  <div key={skill} className={`skill-item ${styles.skillItem}`}>
                    <Image
                      className={`skill-icon ${styles.skillIcon}`}
                      src={`/skills/${skill}.svg`}
                      alt={skill}
                      width={50}
                      height={50}
                    />
                    <span className={`skill-name ${styles.skillName}`}>
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="staggered-reveal">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4">
                Other
              </h3>
              <div className="flex flex-wrap gap-6 transform-gpu">
                {SKILLS.other.map((skill) => (
                  <div key={skill} className={`skill-item ${styles.skillItem}`}>
                    <Image
                      className={`skill-icon ${styles.skillIcon}`}
                      src={`/skills/${skill}.svg`}
                      alt={skill}
                      width={50}
                      height={50}
                    />
                    <span className={`skill-name ${styles.skillName}`}>
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
