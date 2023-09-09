import React from 'react';
//import imagenFondo from '../assets/images/profile-user.jpeg'

function LastProductInDb(props) {
    const {title, name, detail, img}=props;
    return (
        <>
            <div className="col-lg-4 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">{title}</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={img} alt=" imagen del ultimo item" />
                        </div>
                        <p>{name}</p>
                        <a className="btn bg-danger text-white"  rel="nofollow" href={detail} >View detail</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LastProductInDb;