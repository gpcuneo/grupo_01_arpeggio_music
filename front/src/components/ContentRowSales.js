import React from 'react'
import PanelTotal from './PanelTotal';
import LastProductInDb from './LastProductInDb';
import DataListInDB from './DataListInDB';
import ContainerBigCards from './ContainerBigCards';
import { useSalesContext } from '../context/sales';

const domain = process.env.REACT_APP_BACK_NAME
const port = process.env.REACT_APP_BACK_PORT

const urlImg = `http://${domain}:${port}/`;

function ContentRowTop() {
	const { sales, loadingSales, lastSales } = useSalesContext();
	let salesInfo = [
		{
			titulo:'Total ventas',
			cifra: loadingSales ? 'cargando' : sales.countInvoices,
			color:'success',
			icono:'user'
		},
		{
			titulo:'Total facturado',
			cifra: loadingSales ? 'cargando' : sales.totalInvoice,
			color:'success',
			icono:'user'
		},
		{
			titulo:'Factura mas alta',
			cifra: loadingSales ? 'cargando' : sales.maxInvoice,
			color:'success',
			icono:'user'
		},
		{
			titulo:'Productos vendidos',
			cifra: loadingSales ? 'cargando' : sales.productsCount,
			color:'success',
			icono:'user'
		},
	]

	// let lastItemsInDB = [
	// 	{
	// 		title: 'Last user',
	// 		name: loadingUser ? 'cargando' : lastUser.name,
	// 		img: loadingUser ? 'cargando' : lastUser.img,
	// 		detail: loadingUser ? 'cargando' : lastUser.detail,
	// 	},
	// 	{
	// 		title: 'Last product',
	// 		name: isLoadingPro ? 'cargando' : lastProduct.name,
	// 		img: isLoadingPro ? 'cargando' : lastProduct.img,
	// 		detail: isLoadingPro ? 'cargando' : lastProduct.detail,
	// 	},
	// ]

	let productsStatistics = null
	if(sales.topProducts) {
		productsStatistics = sales.topProducts.map( element => {
			const images = JSON.parse(element.product.image).map(imgName => `/images/productos/${imgName}`);
			return {
				name: element.product.name,
				count: element.count,
				price: element.product.price,
				img: urlImg + images[0],
			}
		})
	}


	return (
		<React.Fragment>
					<div className="container-fluid">
						<PanelTotal
							cardsInfo={salesInfo}
						/>
						<div className="row">
							<ContainerBigCards
								items={productsStatistics}
							/>
							{/* <DataListInDB/> */}
						</div>
						{/* <PanelTotal
							cardsInfo={listProductByCategory}
						/> */}
					</div>
		</React.Fragment>
  	)
}

export default ContentRowTop;