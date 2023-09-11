import React from 'react';

function LastProductInDb(props) {
    const {name, count, price, img, type}=props;
    let textContent = {
        p1: '',
        p2: '',
        p3: ''
    }
    if(type === 'product') {
        textContent = {
            p1: `Precio unitario: ${price}`,
            p2: `Unidades vendidas: ${count}`,
            p3: `Total facturado: ${price * count}`
        }
    }
    if(type === 'user') {
        textContent = {
            p1: `Compras: ${count}`,
            p2: `Total facturado: ${price}`,
            p3: ''
        }
    }
    return (
        <>
            <div className="col-lg-3 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">{name}</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 100 + 'rem' }} src={img} alt=" imagen del ultimo item" />
                        </div>
                        <p>{textContent.p1}</p>
                        <p>{textContent.p2}</p>
                        <p>{textContent.p3}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LastProductInDb;