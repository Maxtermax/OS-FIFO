import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Button from './components/Button.jsx';
import Layout from './components/Layout.jsx';
import Input from './components/Input.jsx';
import Content from './components/Content.jsx';

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
			  	<Content data={[]} algorithm={'Fifo'} currentPanel="#panel1"/>
			  </div>
			  <div className="tabs-panel" id="panel2">
			    <Content data={[]} algorithm={'Sfj'} currentPanel="#panel2"/>
			  </div>
			  <div className="tabs-panel" id="panel3">
					<Content data={[]} algorithm={'Prioridad'} currentPanel="#panel3"/>
			  </div>

			  <div className="tabs-panel" id="panel4">
					<Content data={[]} algorithm={'Round Robin'} currentPanel="#panel4"/>
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
