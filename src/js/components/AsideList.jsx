import React from 'react';
import '../../scss/components/AsideList.scss';

export default class AsideList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className="section_options">
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
