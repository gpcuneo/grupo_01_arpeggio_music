import React from 'react';
import Cards from './Cards';

function PanelTotal(props) {
    
    const Products = {
        titulo:'Total de Productos',
        cifra:props.countProduct,
        color:'primary',
        icono:'film'
    }
    const Users = {
        titulo:'Total de Usuarios',
        cifra:79,
        color:'success',
        icono:'user'
    }
    const Categories = {
        titulo:'Total de Categorias',
        cifra:49,
        color:'warning',
        icono:'award'
    }
    let array = [Products,Users,Categories]
    return (
    <>
        <div className="row">
            {
                array.map((item,i)=>{
                    return <Cards {...item} key={i} />
                })
            }
        </div>
    </>
  )
}

export default PanelTotal