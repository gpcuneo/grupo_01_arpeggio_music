import React from 'react';
import CardsList from './CardsList';
import { useProductContext } from '../context/product';

function DataListInDB() {
    const { productsFirst, next, back, productPage, setProductPage, setProductsFirst } = useProductContext();
    const handleNextClick = async () => {
        const nextPageData = await next(productPage, productsFirst.totalPages)
        setProductPage(nextPageData.currentPage)
        setProductsFirst(nextPageData)
    }
    const handleBackClick = async () => {
        const backPageData = await back(productPage)
        setProductPage(backPageData.currentPage)
        setProductsFirst(backPageData)
    }

    return (
        <>
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Listado de Productos</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {productsFirst.products ?
                                (
                                    productsFirst.products.map((product, i) => {
                                        return <CardsList {...product} key={i} />;
                                    })
                                ) : (
                                    <p>Cargando...</p>
                                )
                            }
                        </div>
                        <div className='row'>
                            <button onClick={handleBackClick} className="btn bg-danger text-white">back</button>
                            {productsFirst ?
                                (<p className='m-2'>{productsFirst.currentPage}</p>)
                                :
                                (<p>Cargando..</p>)
                            }
                            <button onClick={handleNextClick} className="btn bg-danger text-white">Next</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DataListInDB;