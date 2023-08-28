import React from 'react';
import Footer from './Footer';
import TopBar from './TopBar';
import ContentRowTop from './ContentRowTop';

function ContentWrapper() {
  return (
    <React.Fragment>
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <TopBar/>
                <ContentRowTop/>
                <Footer/>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ContentWrapper;