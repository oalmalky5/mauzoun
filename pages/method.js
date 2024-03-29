import React, { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

import Menu from '../components/Menu';
import formatJsxMessage from '../utils/formatJsxMessage';
import ContactButton from '../components/ContactButton';

import { MotionLogo } from '../components/MotionLogo';
import Footer from '../components/Footer';
import Image from 'next/image';

const backgroundColor = '#f7f5f0';

export default function ({
  updatePageTransition,
  textAnimationControls,
  handleBgColorChange,
  history,
  handleOpenNav,
  isNavOpen,
  ...rest
}) {
  const { key, initial, animate, variants } = rest;
  const locale = useRouter().locale;

  const intl = useIntl();
  const f = (id, options) =>
    formatJsxMessage(intl, locale, id, {
      shouldFade: true,
      animationControls: textAnimationControls,
      ...options,
    });

  function CustomApp({ Component, pageProps }) {
    // Load Panelbear only once during the app lifecycle

    return <Component {...pageProps} />;
  }

  const [areServicesVisible, setAreServicesVisible] = useState(false);
  const [isApproachVisible, setIsApproachVisible] = useState(false);
  const [areProjectsVisible, setAreProjectsVisible] = useState(false);
  const [isWorkVisible, setIsWorkVisible] = useState(false);

  React.useEffect(() => handleBgColorChange(backgroundColor), []);

  const titleStyles = [
    { color: '#3C1053' },
    { color: '#69488E' },
    { color: '#C14729' },
    { color: '#CD9F26' },
    { color: '#41A99C' },
  ];

  return (
    <>
      <NextSeo
        title={locale !== 'ar' ? 'Mauzoun | Our Method' : 'مَوْزوْن | منهجيتنا'}
        description={f('pageTitle')}
      />
      <div className="background-animation" style={{ backgroundColor }} />

      <motion.div
        key={key}
        initial={initial}
        animate={animate}
        variants={variants}
      >
        {/* <ContactButton isNavOpen = {isNavOpen} history = {history}/> */}
        <div
          style={{
            position: 'fixed',
            display: 'flex',
            alignItems: 'stretch',
            width: '100%',
            height: '100%',
            overflowX: 'hidden',
          }}
        >
          <div
            className="bg-animation-home"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              zIndex: 8,
              overflow: isNavOpen ? 'hidden' : null,
            }}
          >
            <MotionLogo />
            <Menu
              backgroundColor={backgroundColor}
              textAnimationControls={textAnimationControls}
              isNavOpen={isNavOpen}
              handleOpenNav={handleOpenNav}
            />

            <div className="container">
              <div className="container-background" style={{ backgroundColor }}>
                {/*<img className="backgroundImg" src="/homeBgPicEn.png" />*/}
              </div>
              <div className="container-content"></div>
              {/*<div className='container-image'>
                <motion.img
                  width='800px'
                  height='400px'
                  layout='fixed'
                  priority='true'
                  src='/mainOffice 2.png'
                  alt='an image of an office'
                  transition={{ duration: 0.5 }}
                />
              </div>*/}
              <div className="container-content">
                <Link href="/story">
                  <h5 className="mb-0">{/*<u>{f("story.intro")}</u>*/}</h5>
                </Link>

                <div className="homeContainer">
                  {/*<div>
                  {<span className="homeTitle">{f("title")}</span> }
                </div>
                <div>
                  {<span className="homeSummary">{f("summary")}</span> }
                </div>
                <div>
                  {<span className="storyContent">{f("story.content")}</span> }
                  {<span className="servicesContent">{f("services.content")}</span> }
                </div>
                <div>
                  {<span className="approach">{f("approach.content")}</span> }
                  {<span className="projects">{f("projects.content")}</span> }
                </div>
                <div>
                  {<span className="partner">{f("work.content")}</span> }
                  {<span className="communicate">{f("work.content2")}</span> }
                 </div>*/}

                  <div>
                    <span className="title">{f('pageTitle')}</span>
                  </div>
                  <div>
                    <span className="mainBlock">{f('mainSection1')}</span>
                  </div>
                  <div>
                    <span className="mainBlock">{f('mainSection2')}</span>
                  </div>

                  <div>
                    <span className="title">{f('mainSubheader')}</span>
                  </div>

                  <div>
                    <span className="approachHeader">
                      {f('approach.header')}
                    </span>
                    {[
                      'approach.contact',
                      'approach.quotation',
                      'approach.timeline',
                      'approach.research',
                      'approach.writing',
                      'approach.delivery',
                      'approach.feedback',
                      'approach.adaptTimeline',
                      'approach.finished',
                    ].map((e, index) => (
                      <div className="content-block" key={e}>
                        <b style={titleStyles[index % titleStyles.length]}>
                          {f(`${e}.header`)}
                        </b>
                        {intl.formatMessage({ id: `${e}.content` }) !==
                          `${e}.content` && f(`${e}.content`)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* <p className="contentHome">{f("story.content")}</p> */}

                {/* Services */}
                {/*!areServicesVisible ? (
                  <div
                    className='content-wrapper'
                    onClick={() => setAreServicesVisible(true)}
                  >
                    <h5>{f("services.intro")}</h5>
                    <span className='reveal-icon'>
                      <BsChevronDown className='reveal-icon' />
                    </span>
                  </div>
                ) : (
                  <div className='inline unwrapped-content'>
                    <hr />
                    <Link href='/services'>
                      <h5 style={{ cursor: "pointer" }}>{f("services.intro")}</h5>
                    </Link>
                    {f("services.content")}
                    <hr />
                  </div>
                )*/}
                {/*<p className="servicesContent">{f("services.content")}</p>*/}
                {/* Approach */}
                {/*!isApproachVisible ? (
                  <div
                    className='content-wrapper'
                    onClick={() => setIsApproachVisible(true)}
                  >
                    <h5>{f("approach.intro")}</h5>
                    <span className='reveal-icon'>
                      <BsChevronDown className='reveal-icon' />
                    </span>
                  </div>
                ) : (
                  <div className='inline unwrapped-content'>
                    {!areServicesVisible && <hr />}
                    <h5>{f("approach.intro")}</h5>
                    {f("approach.content")}
                    <hr />
                  </div>
                )*/}

                {/*<p className="mt-1">{f("approach.content")}</p>*/}

                {/* Projects */}
                {/*!areProjectsVisible ? (
                  <div
                    className='content-wrapper'
                    onClick={() => setAreProjectsVisible(true)}
                  >
                    <h5>{f("projects.intro")}</h5>
                    <span className='reveal-icon'>
                      <BsChevronDown className='reveal-icon' />
                    </span>
                  </div>
                ) : (
                  <div className='inline unwrapped-content'>
                    {!isApproachVisible && <hr />}
                    <h5>{f("projects.intro")}</h5>
                    {f("projects.content")}
                    <hr />
                  </div>
                )*/}
                {/* <p className="homeProjects">{f("projects.content")}</p>*/}
                {/* Work */}
                {/*!isWorkVisible ? (
                  <div
                    className='content-wrapper'
                    onClick={() => setIsWorkVisible(true)}
                  >
                    <h5>{f("work.intro")}</h5>
                    <span className='reveal-icon'>
                      <BsChevronDown className='reveal-icon' />
                    </span>
                  </div>
                ) : (
                  <div className='inline unwrapped-content'>
                    {!areProjectsVisible && <hr />}
                    <h5>{f("work.intro")}</h5>
                    {f("work.content")}
                  </div>
                )*/}
                {/*<p className="work">{f("work.content")}</p> */}
                {/*<span className="homeWork">{f("work.content2")}</span>*/}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
