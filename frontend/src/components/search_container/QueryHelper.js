import React, { useContext } from "react";
import { MetaContext } from '../../hook/DataManger'
import { ArtistName, ClickTypo, TagRecommedDiv } from "../../styles/component";


const QueryHelper = () => {
	const mainContext = useContext(MetaContext);
	const {tagdata, tagQuery} = mainContext;
    let Tag = tagdata.map((tag, index) => (<ClickTypo key={index} id={tag} data-tag={tag} onClick={tagQuery}>{tag}</ClickTypo>))
	return (
		<TagRecommedDiv>
            <ArtistName>{"추천검색어"} | {Tag} </ArtistName>
		</TagRecommedDiv>
	);
};

export default QueryHelper;