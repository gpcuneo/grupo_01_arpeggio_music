import React from 'react';
import Cards from './Cards';
import { useUserContext } from '../context/user';


function PanelTotal(props) {
    const { users, isLoading } = useUserContext();
    console.log(users)
    console.log(isLoading)

    const Products = {
        titulo:'Total de Productos',
        cifra: props.countProduct,
        color:'primary',
        icono:'film'
    }
    const Users = {
        titulo:'Total de Usuarios',
        cifra: isLoading ? 'cargando' : users.count,
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