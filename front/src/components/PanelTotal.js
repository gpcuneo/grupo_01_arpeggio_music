import React from 'react';
import Cards from './Cards';
//import { useUserContext } from '../context/user';


function PanelTotal(cardsInfo) {
    console.log('cardsInfo')
    console.log(cardsInfo)
    return (
    <>
        <div className="row">
            { console.log(`LAS CARDS SON: ${cardsInfo[0]}`)
            
            }
        </div>
    </>
    )
}

export default PanelTotal