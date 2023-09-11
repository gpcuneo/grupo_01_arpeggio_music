import React from 'react'
import PanelTotal from './PanelTotal';
import LastProductInDb from './LastProductInDb';
import DataListInDB from './DataListInDB';
import ContainerLastItems from './ContainerLastItems';
import { useUserContext } from '../context/user';
import { useProductContext } from '../context/product';
import { useCategoryContext } from '../context/category';

function ContentRowTop() {
	const { users, loadingUser, lastUser } = useUserContext();
	const {products,isLoadingPro,lastProduct}= useProductContext();
	const { category, countProductsByCategory, lastCategory, loadingCategories } = useCategoryContext();
	//category, lastCategory, countProductsByCategory, loadingCategories
	let cardsInfo = [
		{
			titulo:'Total de Usuarios',
			cifra: loadingUser ? 'cargando' : users.count,
			color:'success',
			icono:'user'
		},
		{
			titulo:'Total de Productos',
			cifra:isLoadingPro?'cargando..':products.count,
			color:'primary',
			icono:'film'
		},
		{
			titulo:'Total de Categorias',
			cifra: loadingCategories ? 'cargando' : category.count,
			color:'warning',
			icono:'award'
		},
	]

	let lastItemsInDB = [
		{
			title: 'Ultimo usuario',
			name: loadingUser ? 'cargando' : lastUser.name,
			img: loadingUser ? 'cargando' : lastUser.img,
			detail: loadingUser ? 'cargando' : lastUser.detail,
		},
		{
			title: 'Ultimo producto',
			name: isLoadingPro ? 'cargando' : lastProduct.name,
			img: isLoadingPro ? 'cargando' : lastProduct.img,
			detail: isLoadingPro ? 'cargando' : lastProduct.detail,
		},
		{
			title: 'Ultima categoria',
			name: loadingCategories ? 'cargando' : lastCategory.name,
			img: loadingCategories ? 'cargando' : lastCategory.imageURL,
			detail: loadingCategories ? 'cargando' : lastCategory.detail,
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
							<ContainerLastItems
								lastItemsInDB={lastItemsInDB}
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