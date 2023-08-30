import React from 'react'
import PanelTotal from './PanelTotal';
import LastProductInDb from './LastProductInDb';
import DataListInDB from './DataListInDB';
import { useUserContext } from '../context/user';
import { useProductContext } from '../context/product';
import { useCategoryContext } from '../context/category';

function ContentRowTop() {
	const { users, loadingUser } = useUserContext();
	const {products,isLoadingPro,lastProduct}= useProductContext();
	const { category, countProductsByCategory, loadingCategories } = useCategoryContext();
	let cardsInfo = [
		{
			titulo:'Total de Productos',
			cifra:isLoadingPro?'cargando..':products.count,
			color:'primary',
			icono:'film'
		},
		{
			titulo:'Total de Usuarios',
			cifra: loadingUser ? 'cargando' : users.count,
			color:'success',
			icono:'user'
		},
		{
			titulo:'Total de Categorias',
			cifra: loadingCategories ? 'cargando' : category.count,
			color:'warning',
			icono:'award'
		},
	]

	const listProductByCategory = countProductsByCategory.map( element => {
		return {
			titulo: element['category.name'],
			cifra: element['count'],
			color: 'warning',
			icono: 'award'
		}
	})

	return (
		<React.Fragment>
					<div className="container-fluid">
						<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
							<h1 className="h3 mb-0 text-gray-800">Arpeggio Music Dashboard</h1>
						</div>
						<PanelTotal
							cardsInfo={cardsInfo}
						/>
						<div className="row">
							<LastProductInDb
								detailData={lastProduct}
							/>
							<DataListInDB/>
						</div>
						<PanelTotal
							cardsInfo={listProductByCategory}
						/>
					</div>
		</React.Fragment>
  	)
}

export default ContentRowTop;