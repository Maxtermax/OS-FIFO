import React from 'react';
import '../../scss/components/AsideList.scss';
import Button from './Button.jsx';


export default class AsideList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="columns large-3 medium-12 small-12 section_options">
        <article>
          <nav>
            <ul>
              {
                this.props.data.map((data, index)=>{
                 return (<div key={index}> {data}</div>)
               })
              }
            </ul>
          </nav>
        </article>
      </aside>
    )
  }
};
