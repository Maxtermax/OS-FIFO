import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Button from './components/Button.jsx';
import Layout from './components/Layout.jsx';
import Input from './components/Input.jsx';
import AsideList from './components/AsideList.jsx';


import '../scss/planificacion.scss';

class FIFO extends React.Component {
  constructor(props) {
    super(props);
  }

	componentDidMount() {
		var elem = new Foundation.Tabs($("#example-tabs"));
		console.log("cargado", $("#example-tabs"))
	}

	render() {
		return (
			<div className="tabs-content" data-tabs-content="example-tabs">
			  <div className="tabs-panel is-active" id="panel1">
			    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
			  </div>
			  <div className="tabs-panel" id="panel2">
			    <p>Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
			  </div>
			  <div className="tabs-panel" id="panel3">
			    <p>panel 3</p>
			  </div>

			  <div className="tabs-panel" id="panel4">
			    <p>panel 4</p>
			  </div>

			</div>
		)
	}
}

$(document).ready(function() {
	ReactDOM.render(
	  <Layout content={[<FIFO/>]}  title={"ALGORITMOS DE PLANIFICACION"} lines={true} />,
	  document.getElementById('content-container')
	)	
})
