import React from 'react';

const BackToHome = () => {
    return (
        <div className="button align-self-center">
            <a title="Back to homepage" className="btn btn-link p-0 border-0 transform-scale-h" href={ process.env.PUBLIC_URL + "/" }><i className="icon-c icon-arrow-left" />Back to homepage</a>
        </div>
    );
};

export default BackToHome;
