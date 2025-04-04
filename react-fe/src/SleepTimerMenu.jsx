import { useState, useEffect } from 'react'
import { SERVER_URL } from './const';
var accessToken = window.localStorage.getItem('access_token');
var refreshToken = window.localStorage.getItem('refresh_token');

const SleepTimerTest = () => {
  const hours = []
  for (let i = 0; i < 11; i++) {
    hours.push(i)
  }
  const minutes = []
  for (let i = 0; i < 60; i++) {
    minutes.push(i)
  }
  const seconds = []
  for (let i = 0; i < 60; i++) {
    seconds.push(i)
  }

  // Timer function
  const [isRunning, setIsRunning] = useState(null)
    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(0)
    const [second, setSecond] = useState(0)
    const [submittedMinute, setSubmittedMinute] = useState(0)
    const [submittedHour, setSubmittedHour] = useState(0)
    const [submittedSecond, setSubmittedSecond] = useState(0)
    const [waitTime, setWaitTime] = useState('Sleep Timer not set!')
    const [clock, setClock] = useState(-1)

  
  useEffect(() => {
    let interval;
    if (clock == -1){
    setHour((hour) => hour = submittedHour)
    setMinute((minute) => minute = submittedMinute)
    setSecond((second) => second = submittedSecond)
    }
    if (isRunning) {
      interval = setInterval(() => {
        if (clock == 0 || clock == -1){
          setClock((clock) => clock = 1)
      }
      else if (clock == 1 || clock == -1){
        setClock((clock) => clock = 0)
      }
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
      setWaitTime(`Playback will pause in ${hour} hours, ${minute} minutes and ${second} seconds.`)
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [clock, isRunning, submittedHour, submittedMinute, submittedSecond])


  const submit = () => {
    setClock(-1);
    setIsRunning(true);
  }

  const cancel = () => {
    setIsRunning(false);
    setMinute((hour) => hour = 0);
    setMinute((minute) => minute = 0);
    setSecond((second) => second = 0);
    setClock(-1);
    setWaitTime(`Timer not set!`)
  }

  // pause after submitted amount of time
  useEffect(() => {
    if (isRunning && second == 0 && minute == 0 && hour == 0){
      const response = fetch(`${SERVER_URL}/pause`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        },
      })
        .then(
          res => {res.json();
          cancel();
          if (res.status == 200){
            setWaitTime(`Playback successfully paused`)
          }
          else{setWaitTime(`Playback cannot be paused. An unknown error occured.`)}
        }
      )
    }
  },[isRunning,second,minute,hour])

// refresh
const refresh = () => {
  const response = fetch(`${SERVER_URL}/refresh`, {
    method: 'POST',
    headers: {
      "refresh-token": refreshToken,
    },
  })
  .then(res => res.json())
  .then(data => {
    refreshToken = data.refresh_token
    accessToken = data.access_token
    window.localStorage.setItem('access_token', data.access_token) 
    window.localStorage.setItem('refresh_token', refreshToken) 
  })
}


// constantly refresh token every 57 minutes, under 7 seconds will cause error
var id = setInterval(() => {refresh()}, 57*60*1000)


return (
  <div>
    <h1>SleepTimerMenu</h1>
    <form>
      <label>Hours:
        <select name="hours" onChange={(e) => setSubmittedHour(Number(e.target.value))}>
          {hours.map((hour, i) => {
            return <option key={i} value={hour}>{hour}</option>
          })}
        </select>
      </label>
      <br />

      <label>Minutes:
        <select name="minutes" onChange={(e) => setSubmittedMinute(Number(e.target.value))}>
          {minutes.map((minute, i) => {
            return <option key={i} value={minute}>{minute}</option>
          })}
        </select>
      </label>
      <br />

      <label>Seconds:
        <select name="seconds" onChange={(e) => setSubmittedSecond(Number(e.target.value))}>
          {minutes.map((seconds, i) => {
            return <option key={i} value={seconds}>{seconds}</option>
          })}
        </select>
      </label>
      <br />

      <button type="button" onClick={submit}>Set Sleep Timer!</button>
      <button type="button" onClick={cancel}>Cancel the Timer!</button>
    </form>
    <p>{waitTime}</p>
  </div>
)
}
export default SleepTimerTest