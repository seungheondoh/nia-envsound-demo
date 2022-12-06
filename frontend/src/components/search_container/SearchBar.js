import React, { useContext } from "react";
import { Form, Input, PreviewDiv } from '../../styles/component';
import { MetaContext } from '../../hook/DataManger';
import SearchPreview from './SearchPreview'
const SearchBar = () => {
	const mainContext = useContext(MetaContext);
	const {keyword,searchpreview, previewRender, updateField,onSearchSubmit} = mainContext;
	if (previewRender === true){
		var Preview = searchpreview.map((previewData, index) => {
			return (
				<SearchPreview 
					key={index} 
					index={index} 
					previewData = {previewData}
				/>);
			}
		);
	}
	return (
		<Form onSubmit={onSearchSubmit}>
			<Input
				placeholder="세상의 모든 소리를 검색해보세요"
				autoFocus={true}
				value={keyword}
				onChange={e => updateField(e)}
			/>
			<PreviewDiv>{Preview}</PreviewDiv>
		</Form>
	);
};

export default SearchBar;