import React from 'react';
import Cards from './Cards';

function PanelTotal({cardsInfo}) {
    return (
    <>
        <div className="row">
            {
                cardsInfo.map((item,i)=>{
                    return <Cards {...item} key={i} />
                })
            }
        </div>
    </>
    )
}

export default PanelTotal