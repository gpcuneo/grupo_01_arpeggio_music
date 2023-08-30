import React from 'react'

function CardsList(props) {
    return (
        <>
            <div className="col-md-12 mb-4">
                <div className="card border-left-danger shadow h-100">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">{props.name}</div>
                                {/* <div className="h5 mb-0 font-weight-bold text-gray-800">{props.category.name}</div> */}
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-award fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsList;