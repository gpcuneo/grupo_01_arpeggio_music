import React from 'react'
import PanelTotal from './PanelTotal';
import ContainerBigCards from './ContainerBigCards';
import { useSalesContext } from '../context/sales';

const domain = process.env.REACT_APP_BACK_NAME
const port = process.env.REACT_APP_BACK_PORT

const baseUrl = `http://${domain}:${port}/`;

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

	let productsStatistics = null
	if(sales.topProducts) {
		productsStatistics = sales.topProducts.map( element => {
			const images = JSON.parse(element.product.image).map(imgName => `/images/productos/${imgName}`);
			return {
				name: element.product.name,
				count: element.count,
				price: element.product.price,
				img: baseUrl + images[0],
				type: 'product'
			}
		})
	}

	let topUsers = null
	if(sales.topUsers) {
		topUsers = sales.topUsers.map( item => {
			const urlImg = `${baseUrl}/images/userProfile/${item.user.image}`
			return {
				name: item.user.userName,
				count: item.count,
				price: item.totalPayment,
				img: urlImg,
				type: 'user'
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
						</div>
						<div className="row">
							<ContainerBigCards
								items={topUsers}
							/>
						</div>
					</div>
		</React.Fragment>
  	)
}

export default ContentRowTop;