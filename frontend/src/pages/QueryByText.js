import React from 'react';
import { useContext } from 'react';
import { MetaContext } from '../hook/DataManger'
import { Wrapper } from '../styles/page';
import SearchBar from '../components/search_container/SearchBar'
import QueryHelper from '../components/search_container/QueryHelper'
import Loading from '../components/loading/Loading'
import MusicTable from '../components/music_container/music_table'

const QueryByText = () => {
    const mainContext = useContext(MetaContext);
    const {loading} = mainContext;
    return (    
        <Wrapper>
            <p>NIA-Env Sound Search 🔊🔊🔊</p>
            <SearchBar/>
            <QueryHelper/>
            {loading ? (
                <Loading />
            ) : ( 
                <MusicTable/>
            )
            }
        </Wrapper>
    );
};

export default QueryByText;