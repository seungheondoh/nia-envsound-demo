import React, {useContext} from "react";
import { MetaContext } from "../../hook/DataManger";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import { SongButton } from '../../styles/block';
import { AudioCell, Cell, RowDiv, ColumnsDiv, ArtistName, Title, ClickTypoGary} from "../../styles/component";

function MusicContainer({ index, songAttribute }){
    const mainContext = useContext(MetaContext)
    const {playTrack, currentTrackData ,isPlaying, artistQuery} = mainContext
    const filename = songAttribute['filename']
    const tag_info = `${songAttribute['H2'] + ", " + songAttribute['H1'] + ", " + songAttribute['H0']}`
    return (
        <div>
            <RowDiv>
                <AudioCell>
                    <SongButton onClick={() => playTrack(index)}>
                        {currentTrackData.filename === filename && isPlaying ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
                    </SongButton>
                </AudioCell>

                <ColumnsDiv>
                    <Cell>
                        <Title id={filename} data-tag={filename} onClick={artistQuery}>{filename}</Title>
                        <ArtistName id={tag_info} data-tag={tag_info} onClick={artistQuery}>{tag_info}</ArtistName>
                    </Cell>
                </ColumnsDiv> 
            </RowDiv>
        </div>
    );
}

export default MusicContainer;