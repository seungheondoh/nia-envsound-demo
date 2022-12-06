import React, { useContext, Fragment } from 'react';
import { MetaContext } from '../../hook/DataManger'

import MusicContainer from './music_item'
const MusicTable = () => {
    const mainContext = useContext(MetaContext);
    const {songdata} = mainContext;
    return (
        <>
            {songdata.map((song,index) => (
                <>
                    <MusicContainer
                        index = {index}
                        songAttribute ={song}
                    />
                </>
            ))}
        </>
    );
};

export default MusicTable;