import React from 'react'
import { useEffect, useState } from 'react';

export const Countdown = () => {
    const [counter, setCounter] = useState(60);
    useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
  
    return (
        <div>Henter ny data om: {counter === 1 ? "Henter ny data" : counter}</div>
    );
  }
