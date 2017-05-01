import React from 'react';
import '../../scss/components/Header.scss';
import Title from './Title.jsx';
import $ from 'jquery';
import 'foundation-sites/dist/js/plugins/foundation.core.js';
import 'foundation-sites/dist/js/plugins/foundation.tabs.js';
import 'foundation-sites/dist/js/plugins/foundation.util.keyboard.js';
import 'foundation-sites/dist/js/plugins/foundation.util.timerAndImageLoader.js';



export default class Header extends React.Component {
  render() {
    return (
    	<div className="wrap-header">
    		<header>
			    <Title data={this.props.title} lines={this.props.lines} narrow={this.props.narrow} left={this.props.left} right={this.props.right}/>
			    <nav>

						<ul className="tabs row wrap-options" data-tabs id="tabs-container">
						  <li className="tabs-title is-active">
			    			<a href="#panel1">
			    				<i className="material-icons">&#xE915;</i> Fifo 
			    			</a>
						  </li>

						  <li className="tabs-title">
			    			<a href="#panel2"> 	
				    			<i className="material-icons">&#xE8D5;</i> Sjf
				    		</a>
						  </li>


						  <li className="tabs-title">
			    			<a href="#panel3"> 	
				    			<i className="material-icons">&#xE422;</i> Prioridad
				    		</a>
						  </li>


						  <li className="tabs-title">
			    			<a href="#panel4"> 	
				    			<i className="material-icons">&#xE8E5;</i> Round robin
				    		</a>
						  </li>

						</ul>

			    </nav>
			  </header>
    	</div>
    )
  }
};
