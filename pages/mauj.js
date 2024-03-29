import React from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { NextSeo } from "next-seo";
import Menu from "../components/Menu";
import formatJsxMessage from "../utils/formatJsxMessage";
import {MotionLogo} from "../components/MotionLogo"
import ContactButton from "../components/ContactButton";
import styles from "../styles/mauj.module.scss";
import WhiteBox from "../components/WhiteBox";
import * as locales from "../content/locale";
import Story from "./story";
import Image from "next/image"


const backgroundColor = "#f7f5f0";


export default function mauj({ textAnimationControls, handleBgColorChange, handleOpenNav,history, isNavOpen, ...rest }) {
  const locale = useRouter().locale;
  const { key, initial, animate, variants } = rest;

  const intl = useIntl();
  const f = (id, options) =>
    formatJsxMessage(intl, locale, id, {
      shouldFade: true,
      animationControls: textAnimationControls,
      ...options,
    });

  const whiteBoxDecoratorsPositions = {
    fromTop: [
      {
        preferredMargin: "520px",
      },
      {
        preferredMargin: "537px",
      },
      {
        marginTop: "10px",
        preferredMargin: "550px",
      },
      {
        marginTop: "15px",
      },
      {
        marginTop: "32px",
      },
      {
        marginTop: "49px",
      },
    ],
    fromBottom: [
      {
        preferredMargin: "300px",
      },
      {
        marginTop: "-50px",
        preferredMargin: "735px",
      },
      {
        marginTop: "-67px",
        preferredMargin: "735px",
      },
    ],
  };

  React.useEffect(() => handleBgColorChange(backgroundColor), []);

  return (
    <>
      <NextSeo
        title={locale !== "ar" ? "Mauzoun | Portfolio | Mauj" : "مَوْزوْن | أعمالنا | موج"}
        description={locale !== "ar" ? "Mauzoun | Portfolio | Mauj" : "مَوْزوْن | أعمالنا| موج "}
      />
      <div className="background-animation" style={{ backgroundColor }} />

      <motion.div
        key={key}
        initial={initial}
        animate={animate}
        variants={variants}
        
        
      >
         {/* <ContactButton isNavOpen = {isNavOpen} history = {history}/> */}
        <div>
        <MotionLogo />
          <Menu
            backgroundColor={backgroundColor}
            textAnimationControls={textAnimationControls}
            isNavOpen={isNavOpen}
            handleOpenNav = {handleOpenNav}
          />

          <div className="container">
            <div className="container-background" style={{ backgroundColor }}></div>
            <div className="container-content">
              <div className="intro">
                <span className="mainTitle">{f("intro.title")}</span>
                <p className="introPara">{f("intro.para")}</p>
              </div>

              <div className="meeting">
                <span className="meetingTitle">{f("meeting.title")}</span>
                <span className="meetingPara1">{f("meeting.para1")}</span>
                <span className="meetingPara2">{f("meeting.para2")}</span>
              </div>

              <div className={styles.tone}>
                <span className="toneTitle">{f("tone.title")}</span>
                <span className="maujPic">{locale === "en-US" ? <Image src="/Mauj-02.png" width={890} height={324}/> : null}</span>
                <span className="maujPic">{locale === "ar" ? <Image src="/Mauj-01.png" width={600} height={350}/> : null}</span>
                <span className="tonePara1">{f("tone.para1")}</span>
                <span className="tonePara2">{f("tone.para2")}</span>

                {/* <div class={styles.instaGrid}>
                  <div className={styles.cell1}>
                    <InstagramEmbed
                      url="https://www.instagram.com/p/CKqoCo5FZHM"
                      width="250"
                      height="300"
                    ></InstagramEmbed>
                  </div>
                  <div className={styles.cell2}>
                    <InstagramEmbed
                      width="250"
                      height="300"
                      url="https://www.instagram.com/p/CEyWFKnJtrl"
                    ></InstagramEmbed>
                  </div>
                  <div className={styles.cell3}>
                    <InstagramEmbed
                      width="250"
                      height="300"
                      url="https://www.instagram.com/p/CEyT727pKDG"
                    ></InstagramEmbed>
                  </div>
                  <div className={styles.cell4}>
                    <InstagramEmbed
                      width="250"
                      height="300"
                      url="https://www.instagram.com/p/CNsRmqQlVFI"
                      
                    ></InstagramEmbed>
                  </div>
                  <div className={styles.cell5}>
                    <InstagramEmbed
                      width="250"
                      height="300"
                      url="https://www.instagram.com/p/COUt156lh35"
                    ></InstagramEmbed>
                  </div>
                  <div className={styles.cell6}>
                    <InstagramEmbed
                      width="250"
                      height="300"
                      url="https://www.instagram.com/p/CNaVfcWFIJm"
                    ></InstagramEmbed>
                  </div>
                </div> */}
              </div>

              <div className={styles.brand}>
                <span className="brandTitle">{f("brand.title")}</span>
                <span className="brandPara1">{f("brand.para1")}</span>
                <span className="brandPara2">{f("brand.para2")}</span>
              </div>

              <div className="testimony">
                <span className="testTitle" >
                  {f("testimony.title")}
                </span>
                <div className="totalWhiteBox" >
                  <WhiteBox decoratorsPositions={whiteBoxDecoratorsPositions}>
                    <span className="testPara1" >
                      {f("testimony.para1")}
                    </span>
                    
                    <span className="testPara2" >
                      {f("testimony.para2")}
                    </span>
                
                    <span className="testPara3" >
                      {f("testimony.para3")}
                    </span>
                  </WhiteBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
