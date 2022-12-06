import { useState, useEffect, useContext } from "react";
import {MetaContext} from "./DataManger"

function useMusicPlayer() {
  const mainContext = useContext(MetaContext)
  const {audioPlayer} = mainContext
  const [duration, setDuration] = useState(30);
  const [curTime, setCurTime] = useState(0);
  const [clickedTime, setClickedTime] = useState(0);

  useEffect(() => {
	const audio = audioPlayer;
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const setAudioTime = () => setCurTime(audio.currentTime);

	// DOM listeners: update React state on DOM events
	if (audio){
		audio.addEventListener("loadeddata", setAudioData);
    	audio.addEventListener("timeupdate", setAudioTime);
	}


    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    } 

    // effect cleanup
    return () => {
		if(audio){
			audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
		}
    }
  });

  return {
    curTime,
    duration,
    setClickedTime
  }
}

export default useMusicPlayer;