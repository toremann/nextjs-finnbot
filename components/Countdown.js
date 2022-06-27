import React from 'react'
import { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css";

export const Countdown = () => {
    const [counter, setCounter] = useState(60);
    useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
  
    return (
        <div className={styles.countdown}>Henter ny data om: <b>{counter === 1 ? "Henter ny data" : counter}</b></div>
    );
  }
