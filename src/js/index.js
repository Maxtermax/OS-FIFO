import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Button from './components/Button.jsx';
import Layout from './components/Layout.jsx';
import Input from './components/Input.jsx';
import Fifo from './components/Fifo.jsx';

import AsideList from './components/AsideList.jsx';
import '../scss/planificacion.scss';



class Planification extends React.Component {
  constructor(props) {
    super(props);
  }

	componentDidMount() {
		let tabs = new Foundation.Tabs($("#tabs-container"));
	}

	render() {
		return (
			<div className="tabs-content" data-tabs-content="tabs-container">
			  <div className="tabs-panel is-active" id="panel1">
			  	<Fifo data={[]} algorithm={'Fifo'} currentPanel="#panel1"/>
			  </div>
			  <div className="tabs-panel" id="panel2">
			    <Fifo data={[]} algorithm={'Sfj'} currentPanel="#panel2" />
			  </div>
			  <div className="tabs-panel" id="panel3">
					<Fifo data={[]} algorithm={'Prioridad'} currentPanel="#panel3"/>
			  </div>

			  <div className="tabs-panel" id="panel4">
					<Fifo data={[]} algorithm={'Round Robin'} currentPanel="#panel4"/>
			  </div>

			</div>
		)
	}
}

$(document).ready(function() {
	ReactDOM.render(
	  <Layout content={[<Planification/>]}  title={"ALGORITMOS DE PLANIFICACION"} lines={true} />,
	  document.getElementById('content-container')
	)	
})
