import React from 'react';
import {Link} from 'react-router-dom';
import {Searchbutton} from '../../styles/component';
const LinkButton = ({keyword, link}) => {
    return (
        <Searchbutton>
            <Link to = {link}>
                {keyword}
            </Link>
        </Searchbutton>
    );
};

export default LinkButton;
