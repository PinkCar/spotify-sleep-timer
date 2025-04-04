import { useState, useEffect } from 'react'

const Timer = () => {
  
  const [isRunning, setIsRunning] = useState(null)
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(0)
  const [second, setSecond] = useState(0)
  const [waitTime, setWaitTime] = useState('Sleep Timer not set!')

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  ); 

useEffect(() => {
  let interval;
  if (isRunning) {
    interval = setInterval(() => {
      if (second > 0){
        setSecond((second) => second - 1);
      }
      else if (minute > 0){
        setMinute((minute) => minute - 1);
        setSecond((second) => second = 59);
      }
      else if (hour > 0){
        setMinute((hour) => hour - 1);
        setMinute((minute) => minute = 59);
        setSecond((second) => second = 59);
      }
    }, 1000);
  }

  return () => {
    clearInterval(interval);
  };
}, [second, minute, hour, isRunning])


  function Submit() {
    setIsRunning(true);
    setWaitTime(`Sleep Timer set for ${hour} hours, ${minute} minutes and ${second} seconds.`)





   
  }

  return (
    <div>
      <h1 className="title">Spotify Sleep Timer</h1>
    </div>
  )

  
}

export default Timer