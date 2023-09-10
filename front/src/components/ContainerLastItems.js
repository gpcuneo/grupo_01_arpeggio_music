import React from 'react';
import LastProductInDb from './LastProductInDb';

function ContainerLastItems({lastItemsInDB}) {
    return (
    <>
        <div className="row">
            {
                lastItemsInDB.map((item,i)=>{
                    return <LastProductInDb {...item} key={i} />
                })
            }
        </div>
    </>
    )
}

export default ContainerLastItems