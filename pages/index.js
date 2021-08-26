import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { NextSeo } from "next-seo";
import useWindowSize from '../utils/useWidth'
import styles from "../styles/landingPage.module.scss";

const kashidas = [
  { top: "15%", left: "11%" },
  { top: "14%", right: "11%" },
  { top: "25%", left: "35%" },
  { top: "30%", right: "24%" },
  { top: "65%", left: "18%" },
  { top: "65%", right: "20%" },
  { top: "80%", left: "6%" },
  { top: "85%", right: "32%" },
];

export default function LandingPage({ updatePageTransition, textAnimationControls }) {
  const router = useRouter();

  const {width} = useWindowSize()

  React.useEffect(() => {
    router.prefetch("/en-US/home");
    router.prefetch("/ar/home");
  }, []);

  const changeLocale = (locale) => {
    Cookies.set("NEXT_LOCALE", locale);
    router.push(`/${locale}/home`);
    textAnimationControls.set("instantlyHidden");
  };

  const [kashidaRefs, setKashidaRefs] = React.useState([]);

  React.useEffect(() => {
    // add or remove refs
    setKashidaRefs((kashidaRefs) =>
      Array(kashidas.length)
        .fill()
        .map((_, i) => kashidaRefs[i] || React.createRef())
    );
  }, [kashidas.length]);

  const updateKashidaHoverState = (e, isHovered) => {
    const id = e.target?.id;
    if (!id) return;

    if (isHovered) {
      e.target.src = `/landingPage/${id}.png`;
      e.target.style.marginTop = ((e.target.clientHeight / 2) * -0.25).toString() + "px";

      if (e.target.style.left) {
        e.target.style.marginLeft = ((e.target.clientWidth / 2) * -0.25).toString() + "px";
      } else {
        e.target.style.marginRight = ((e.target.clientWidth / 2) * -0.25).toString() + "px";
      }
    } else {
      e.target.src = `/landingPage/Kashida ${id}.png`;
      e.target.style.marginTop = 0;
      e.target.style.marginLeft = 0;
      e.target.style.marginRight = 0;
    }
  };

  const buildKashida = (id, position) => {
    return (
      <div key={id}>
        <img src={`/landingPage/${id}.png`} style={{ display: "none", position: "absolute" }} />
        <img
          id={id}
          ref={kashidaRefs[id - 1]}
          className={styles.kashida}
          style={{
            transformOrigin: position.left ? "left top" : "right top",
            ...position,
          }}
          src={`/landingPage/Kashida ${id}.png`}
          onMouseEnter={(e) => updateKashidaHoverState(e, true)}
          onMouseLeave={(e) => updateKashidaHoverState(e, false)}
        />
      </div>
    );
  };

  const handleMovePage = (click) => {
    gsap.to(".background", {
      duration: 0.75,
      width: "100%",
      justifyContent: "flex-start",
      textAlign: "left",
    });

    gsap.to(click === 2 ? ".background-left" : ".background-right", {
      duration: 0,
      width: "0%",
    });

    gsap.to(".main", {
      duration: 0.75,
      left: click === 2 ? "100%" : "-100%",
      opacity: 0,
    });

    gsap.fromTo(
      ".transition_dot",
      { opacity: 1 },
      { opacity: 0, x: click === 2 ? 1200 : -1200, duration: 0.75 }
    );

    if (width < 768) {

      gsap.to(".logo", {
        [click === 1 ? "right" : "left"]: "0%",
        opacity: 1,
        duration: 0.75,
        y: -28,
        width: 143,
        height: 110,
        onComplete: () => {
          if (click === 1) {
            changeLocale("ar");
          } else if (click === 2) {
            changeLocale("en-US");
          }
        },
      });
    } else{

      gsap.to(".logo", {
        [click === 1 ? "right" : "left"]: "0%",
        opacity: 1,
        duration: 0.75,
        width: 175,
        height: 150,
        y: -10,
        x: click === 1 ? (width <= 1240 ? -5 : -35) : (width <= 1240 ? 5 : 35),
        onComplete: () => {
          if (click === 1) {
            changeLocale("ar");
          } else if (click === 2) {
            changeLocale("en-US");
          }
        },
      });
    } 
  };

  return (
    <>
      <NextSeo
        title="Welcome to Mauzoun | أهلًا بكم في مَوْزوْن"
        description="Mauzoun is a creative writing studio based in Jeddah, Saudi Arabia, specializing in copywriting, translation, scriptwriting, and book editing in both the Arabic and English."
      />

      <div className={styles.pageContainer}>
        {/* Kashidas organized from top left to bottom right */}
        <div
          className={"transition_dot"}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "stretch",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          {kashidas.map((e, i) => buildKashida(i + 1, e))}
        </div>

        <div />

        <div className={styles.bgAnimation + " background-left"} style={{ left: 0 }}></div>
        <div className={styles.bgAnimation + " background-right"} style={{ right: 0 }}></div>

        <div className={styles.mainPanel + " background"}>
          <img
            className={styles.logo + " logo"}
            src="https://i.imgur.com/HjDbXtR.png"
            alt="Mauzoun logo"
          />
          <div
            className="main"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              height: "calc(100vh - 150px)",
              bottom: 0,
              padding: "0 10px",
              justifyContent: "center",
            }}
          >
            <div dir="rtl" style={{ zIndex: 3 }}>
              <p style={{ fontFamily: "GE Dinar Two" }}>
                عشق للكلمات وفريق شغوف:
                <br />
                <b>أهلاً بكم في موزون.</b>
              </p>
              <button
                className={styles.languageButton}
                style={{ fontFamily: "GE Dinar One", marginBottom: "30px" }}
                onClick={() => {
                  handleMovePage(1);
                }}
              >
                <b>اضغطوا هنا</b> لبدء قصتكم بالعربية.
              </button>
            </div>

            <div dir="ltr" style={{ zIndex: 3 }}>
              <p style = {{fontFamily: "Alegreya"}}>
              A love for words and a team with fervor:
              <br />
              <b>welcome to Mauzoun.</b>
              </p>
              <button
                className = {styles.languageButton}
                style = {{fontFamily: 'Alegreya Sans'}}
                onClick = {() => {
                  handleMovePage(2);
                }}
              >
                <b>Click here</b> to begin your story in English.
              </button>
            </div>

            <img
              className={styles.bottomKashida}
              src={`/landingPage/Kashida bottom.png`}
              width="270px"
            />
          </div>
        </div>
        <div />
      </div>
    </>
  );
}
