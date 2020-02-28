import "./string-polyfill";
import React, { useState, useEffect } from "react";

import StopwatchContainer from "./components/StopwatchContainer";
import NumVal from "./components/NumVal";
import BottomContainer from "./components/BottomContainer";
import SmallNum from "./components/SmallNum";
import NumContainer from "./components/NumContainer";
import TopContainer from "./components/TopContainer";
import NumLabel from "./components/NumLabel";
import StartButton from "./components/StartButton";
import ResetButton from "./components/ResetButton";

function App() {
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timeoutReference = setTimeout(() => {
      setTime(Date.now());
    }, 100);

    return () => {
      clearTimeout(timeoutReference);
    };
  }, [time]);

  let timeDiff = Math.max(0, time - startTime);
  let milliseconds = 0;
  let seconds = 0;
  let minutes = 0;

  if (timerIsRunning) {
    milliseconds = Math.floor((timeDiff / 10) % 100);
    seconds = Math.floor((timeDiff / 1000) % 60);
    minutes = Math.floor(timeDiff / 1000 / 60);
  }

  return (
    <div className="App">
      <StopwatchContainer>
        <TopContainer>
          <NumContainer>
            <NumLabel>minutes</NumLabel>
            <NumVal>{(minutes + "").padStart(2, "0")}</NumVal>
          </NumContainer>

          <NumContainer>
            <NumLabel>seconds</NumLabel>
            <NumVal>{(seconds + "").padStart(2, "0")}</NumVal>
          </NumContainer>

          <SmallNum>{(milliseconds + "").padStart(2, "0")}</SmallNum>
        </TopContainer>

        <BottomContainer>
          <StartButton
            onClick={() => {
              setStartTime(Date.now());
              setTimerIsRunning(true);
            }}
          >
            Start
          </StartButton>
          <ResetButton
            onClick={() => {
              setTimerIsRunning(false);
              setTime(0);
            }}
          >
            Reset
          </ResetButton>
        </BottomContainer>
      </StopwatchContainer>
    </div>
  );
}

export default App;
