import React from "react";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { GrFacebookOption } from "react-icons/gr";
import { useIntl, createIntl, createIntlCache } from "react-intl";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import Cookies from "js-cookie";

import styles from "../styles/menu.module.scss";
import * as locales from "../content/locale";
import formatJsxMessage from "../utils/formatJsxMessage";

const intlCache = createIntlCache();

export default function Menu({ backgroundColor }) {
  const router = useRouter();
  const { locale, pathname } = router;

  const otherLocale = locale === "en-US" ? "ar" : "en-US";

  const intl = useIntl();
  const [otherIntl, setOtherIntl] = React.useState();

  React.useEffect(() => {
    const localeCopy = locales[otherLocale];
    setOtherIntl(
      createIntl(
        {
          locale: otherLocale,
          messages: Object.assign(localeCopy["shared"], localeCopy[pathname]),
        },
        intlCache
      )
    );
  }, [locale]);

  const f = (id, options) => formatJsxMessage(intl, id, options);
  const otherF = (id, options) => formatJsxMessage(otherIntl, id, options);

  const [hoveredLink, setHoveredLink] = React.useState("");

  const buildTiltedSquare = (linkName) => {
    let filter;
    if (router.pathname === "/services")
      filter =
        "invert(92%) sepia(72%) saturate(682%) hue-rotate(329deg) brightness(96%) contrast(103%)";
    else
      filter =
        "invert(99%) sepia(59%) saturate(426%) hue-rotate(169deg) brightness(112%) contrast(100%)";

    return (
      <object
        data="/Tilted Square.svg"
        className={styles.tiltedSquare}
        style={{ filter }}
        hidden={hoveredLink !== linkName && `/${linkName}` !== router.pathname}
      />
    );
  };

  return (
    <div className={styles.sidenav} style={{ backgroundColor }}>
      <Link href="/">
        <motion.img
          src="https://i.imgur.com/HjDbXtR.png"
          alt="Mauzoun logo"
          className={styles.logo}
          layoutId="logo"
        />
      </Link>

      <motion.div className={styles.menu} layout>
        <div>
          {["home", "story", "services", "portfolio", "blog", "job"].map(
            (e, i) => (
              <div key={e}>
                {!(i % 2) && buildTiltedSquare(e)}

                <Link href={"/" + e}>
                  <a
                    className={styles.navLink}
                    onMouseEnter={() => setHoveredLink(e)}
                    onMouseLeave={() => setHoveredLink("")}
                  >
                    <div className={styles.itemTitle}>
                      {f(e + "Link")}
                      {i % 2 ? buildTiltedSquare(e) : null}
                    </div>

                    <span
                      className={styles.otherLocaleLink + " " + otherLocale}
                    >
                      {otherF(e + "Link")}
                    </span>
                  </a>
                </Link>
              </div>
            )
          )}
        </div>

        <div className={styles.languageSwitch}>
          <p className={locale}>
            <b>{locale === "en-US" ? "English" : "عربــي"}</b>
          </p>

          <Link href={pathname} locale={otherLocale}>
            <a onClick={() => Cookies.set("NEXT_LOCALE", otherLocale)}>
              <label className={styles.switch}>
                <input type="checkbox" checked={locale === "ar"} readOnly />
                <span className={styles.slider} />
              </label>
            </a>
          </Link>

          <p className={otherLocale}>
            {locale === "ar" ? "English" : "عربــي"}
          </p>
        </div>

        <div className={styles.complementaryInfo}>
          <div className={styles.bottomNavIcons}>
            <a target="_blank" href="https://twitter.com/mauzoun_?lang=en">
              <IoLogoTwitter size="30px" />
            </a>
            <a target="_blank" href="https://www.instagram.com/mauzoun/?hl=en">
              <IoLogoInstagram size="30px" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/mauzoun/about/"
            >
              <GrFacebookOption size="30px" />
            </a>
          </div>

          {f("email")}
          <b>{f("location")}</b>
        </div>
      </motion.div>
    </div>
  );
}
