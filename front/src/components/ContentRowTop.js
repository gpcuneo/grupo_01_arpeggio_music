import React from 'react'
import PanelTotal from './PanelTotal'

function ContentRowTop(props) {
  return (
    <React.Fragment>
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Arpeggio Music Dashboard</h1>
					</div>
					<PanelTotal
						countProduct={props.countProduct}
					/>
				</div>
    </React.Fragment>
  )
}

export default ContentRowTop