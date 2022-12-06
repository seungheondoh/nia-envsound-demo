import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {BarStyle, BarTime, BarProgress, BarProgressKnob} from "../../styles/component";
momentDurationFormatSetup(moment)

export default function Bar(props) {
  const { duration, curTime, onTimeUpdate } = props;
  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
      <BarStyle>
          <BarTime>{formatDuration(curTime)}</BarTime>
          <BarProgress className="bar__progress"
            style={{
                background: `linear-gradient(to right, darkgray ${curPercentage}%, black 0)`
            }}
            onMouseDown={e => handleTimeDrag(e)}>
            <BarProgressKnob style={{ left: `${curPercentage-0.5}%` }}/>
          </BarProgress>
          <BarTime>{formatDuration(duration)}</BarTime>
      </BarStyle>
  );
}
