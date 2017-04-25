import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Button from './components/Button.jsx';
import '../scss/planificacion.scss';

class FIFO extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
			<div className="row dashboard-container"> 
				<Button type="button" style="btn-loadmore"/>

				<table>
				  <thead>
				    <tr>
				      <th>PROCESOS</th>
				      <th>TIEMPO DE LLEGADA</th>
				      <th>RAFAGA DE CPU</th>
				    </tr>
				  </thead>
				  <tfoot>
				    <tr>
				      <td>Footer content 1</td>
				      <td>Footer content 2</td>
				    </tr>
				  </tfoot>
				  <tbody>
				    <tr>
				      <td>Body content 1</td>
				      <td>Body content 2</td>
				    </tr>
				  </tbody>
				</table>


			</div>	
		)
	}
}

$(document).ready(function() {
	ReactDOM.render(
	  <FIFO/>,
	  document.getElementById('content-container')
	)	
})
