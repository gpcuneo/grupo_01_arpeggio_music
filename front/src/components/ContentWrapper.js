import React from 'react';
import Footer from './Footer';
import TopBar from './TopBar';

function ContentWrapper() {
  return (
    <React.Fragment>
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <TopBar/>
                <Footer/>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ContentWrapper