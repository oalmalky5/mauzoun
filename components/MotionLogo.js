import {useState, useEffect} from 'react'
import { motion } from "framer-motion";
import styles from "../styles/menu.module.scss";
import Link from "next/link";

export const MotionLogo = () => {

  const [position, setPosition] = useState('absolute')

  useEffect(() => {
    setTimeout(()=> setPosition('fixed'), 500)
  }, [])

    return (
      <>
          <Link href="/en-US/story">
            <motion.img
              src="https://i.ibb.co/28W6QH5/mainLogo.png"
              alt="Mauzoun logo"
              className={styles.motionLogo}
              transition={{ duration: 0.5, delay:0 }}
              layoutId="motionLogo"
              style={{opacity:1, zIndex:2, position}}
            />
          </Link>
        </>
    );
}