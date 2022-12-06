import React, {useContext} from "react"
import { MetaContext } from '../../hook/DataManger';
import useMusicPlayer from '../../hook/useMusicPlayer';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Bar from "./Bar";
import {faPause, faPlay, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {InfoBar, InfoDiv, CenterDiv,ButtonDiv, SongButton, ArtistName, Title} from "../../styles/component";

function PlayerControls() {
  const mainContext = useContext(MetaContext)
  const { currentTrackData,
          togglePlay,
          isPlaying,
          playPreviousTrack,
          playNextTrack} = mainContext
  const {
    curTime,
    duration,
    setClickedTime
  } = useMusicPlayer();
  
  return (
    <InfoBar>
        <InfoDiv>
          <Title>{currentTrackData.title}</Title>
          <ArtistName>{currentTrackData.artist_name}</ArtistName>
        </InfoDiv>
        <CenterDiv>
          <ButtonDiv>
            <SongButton onClick={playPreviousTrack} disabled={!currentTrackData.msd_id}>
                <FontAwesomeIcon icon={faStepBackward} size="lg"/>
            </SongButton>

            <SongButton onClick={togglePlay} disabled={!currentTrackData.msd_id}>
                {isPlaying ? <FontAwesomeIcon icon={faPause} size="lg"/> : <FontAwesomeIcon icon={faPlay} size="lg"/>}
            </SongButton>

            <SongButton onClick={playNextTrack} disabled={!currentTrackData.msd_id}>
                <FontAwesomeIcon icon={faStepForward} size="lg"/>
            </SongButton>
          </ButtonDiv>
          <Bar
            curTime={curTime}
            duration={duration}
            onTimeUpdate={time => setClickedTime(time)}
          />
        </CenterDiv>
    </InfoBar>
  )
}

export default PlayerControls
