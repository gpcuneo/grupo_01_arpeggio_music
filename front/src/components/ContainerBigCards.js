import React from 'react';
import CardBigInfo from './CardBigInfo';

function ContainerBigCards({items}) {
    if(items){
        return (
        <>
            <div className="row">
                {
                    items.map((item,i)=>{
                        return <CardBigInfo {...item} key={i} />
                    })
                }
            </div>
        </>
        )
    }
}

export default ContainerBigCards