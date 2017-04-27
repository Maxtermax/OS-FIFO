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

	render() {
		return (
			<div>
				
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
