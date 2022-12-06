import React, { useContext } from "react";
import { TypeCell, EntityCell, SearchDiv, PreviewContainer, Types, Entity } from '../../styles/component';
import { MetaContext } from '../../hook/DataManger'
const SearchPreview = ({previewData}) => {
	const mainContext = useContext(MetaContext);
	const {previewClick} = mainContext;
	return (
		<SearchDiv onClick={() => previewClick(previewData.name, previewData.msd_id, previewData.type)}>
			<tbody>
				<PreviewContainer>
					<TypeCell>
						<Types>{"유사 단어"}</Types>
					</TypeCell>
					<EntityCell>
						<Entity>{previewData}</Entity>
					</EntityCell>
				</PreviewContainer>
			</tbody>
		</SearchDiv>
	  );
};

export default SearchPreview;