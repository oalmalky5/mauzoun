import React, { useState, useEffect} from "react";
import { useIntl } from "react-intl";
import router, { useRouter } from "next/router";

import styles from "../styles/contact.module.scss";
import Contact from "../components/Contact";
import formatJsxMessage from "../utils/formatJsxMessage";
import { motion } from "framer-motion";
import useWidth from '../utils/useWidth'
import Link from "next/link";

export default function ContactButton({
  messageId = "contactPrompt",
  backgroundColor = "#ffffff",
  isNavOpen,
  history
}) {  

  const {oneVW} = useWidth()
  const {locale} = useRouter();


  const intl = useIntl();
  const f = (id, options) => formatJsxMessage(intl, locale, id, options);
  const [circleParams, setCircleParams] = useState({cx: null, cy: null, r: null})
  const [isHovered, setIsHovered] = useState(false);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isWithAnimation, setIsWithAnimation] = useState(true);
  const { asPath, pathname } = useRouter();


  
  useEffect(()=>{
    const maxSize = 210;
    const minSize = 150;
    let currentSize; 
    if (20 * oneVW >= maxSize){
      currentSize = maxSize;
    } else if (20 * oneVW <= minSize){
      currentSize = minSize;
    } else {
      currentSize = 20 * oneVW
    }
    
    setCircleParams({cx: currentSize / 2, cy: currentSize / 2, r: currentSize / 2 - 2})
  }, [oneVW])

  useEffect(()=>{
    if ( history && history[history?.length - 2] === '/'){
      return setIsWithAnimation(true)
    } else {
      setIsWithAnimation(false)
    }
  }, [history])

  if (isNavOpen) return null;
  
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.buttonSpacer} />
        <div className={styles.buttonContainer}>
          <div className = {styles.contactWrapper}>

          <motion.button
            className={`${styles.contactButton} ${styles.spin}` + " heading"}
            onClick={() => {
              setIsHovered(false);
              // setIsContactFormVisible(true);
            }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: isHovered & asPath === '/story' ? "#69488E" : 
                                      isHovered & asPath === '/team' ? '#C14729' : 
                                      isHovered & asPath === '/culture' ? '#CD9F26' :
                                      isHovered & asPath === '/method' ? '#F8D952' :
                                      isHovered & asPath === '/contentwriting' ? '#34A798' :
                                      isHovered & asPath === '/bookcommissions' ? '#A0D1CA' :
                                      isHovered & asPath === '/boutiquepublishing' ? "#69488E" :
                                      isHovered & asPath === '/portfolio' ? '#C14729' :
                                      isHovered & asPath === '/mauj' ? '#C14729' :
                                      isHovered & asPath === '/sta' ? '#C14729' :
                                      isHovered & asPath === '/musaandpalm' ? '#C14729' :
                                      isHovered & asPath === '/shafra' ? '#C14729' : "#ffffff"
                                    }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layout='position'
          >
            <div className = {styles.circleContainer}>
              <Link href="mailto:hello@mauzoun.com">
                <svg height="100%" width="100%">
                    <circle className={isWithAnimation ? styles.circleAnimation : ''} cx={circleParams.cx} cy={circleParams.cy} r={circleParams.r} stroke="#231f20" strokeWidth="2" fillOpacity="0" />
                </svg>
              </Link>
          </div>
            <span className = "contact-button">
            {isHovered ? f(messageId + ".hovered") : f(messageId)}
            </span>
          </motion.button>
          </div>
        </div>
      </div>

      <Contact
        isOpen={isContactFormVisible}
        onClose={() => setIsContactFormVisible(false)}
      />
    </>
  );
}
