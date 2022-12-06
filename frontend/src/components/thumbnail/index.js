import React, {useContext} from "react";
import { MetaContext } from '../../hook/useMetaData';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";

import { Genrediv, AVdiv, RowDiv,ColumnsDiv, SongContainer, ImageContainer, Image, ArtistName, Title, Bpmdiv, Vocaldiv, Durationdiv,DefaultButton } from '../../styles';
import Circle from "./Circle";

function SongThumbnail({ index, songAttribute }){
  const mainContext = useContext(MetaContext)
  const {playTrack, currentTrackData ,isPlaying} = mainContext
  const {_id, genre, arousal, valence,hex_list, artist, title, tempo_radi, tempo, duration, rms_cordinnate, vocal_radi ,vocal, url, bgUrl} = songAttribute
  return (
    <SongContainer>
      <ImageContainer>
        <Circle
          id={`d3${_id}`}
          innerRadius={80-rms_cordinnate}
          outerRadius={80}
          backgroundColor={hex_list}
          bpmParameter = {tempo_radi}
          vocalParameter = {vocal_radi}
        />
        {/* <Image bgUrl={bgUrl}/> */}
        <Image>
          <Genrediv>
              {genre}
          </Genrediv>
        </Image>
        <AVdiv>
          Arsoual:{Math.round(arousal*100)/100}
          <br/>
          Valence:{Math.round(valence*100)/100}
        </AVdiv>
        <Bpmdiv>
          BPM:{tempo}
        </Bpmdiv>
        <Vocaldiv>
          Vocal:{vocal}
        </Vocaldiv>
        <Durationdiv>
          Energy:{Math.round(rms_cordinnate*100)/100}
        </Durationdiv>
      </ImageContainer>

    <RowDiv>
      <DefaultButton onClick={() => playTrack(index)}>
        {currentTrackData._id === _id && isPlaying ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
      </DefaultButton>
      <ColumnsDiv>
        <Title>
          {title}
        </Title>
        <ArtistName>{artist}</ArtistName>
      </ColumnsDiv>
    </RowDiv>

    </SongContainer>
  );
}

export default SongThumbnail;