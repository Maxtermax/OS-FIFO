import React from 'react';
import Header from './Header.jsx';
import Feed from './Feed.jsx';
import AsideList from './AsideList.jsx';
import Button from './Button.jsx';


export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <Header title={this.props.title} right={this.props.right} left={this.props.left} lines={this.props.lines} narrow={this.props.narrow} />
        <div className="columns large-3">
          <AsideList data={[
            <li>
              <Button type="button" style="btn-confirm" data="FIFO"/>
            </li>,
            <li>
              <Button type="button" style="btn-confirm" data="SFJ"/>
            </li>,
            <li>
              <Button type="button" style="btn-confirm" data="ROUND ROBIN"/>
            </li>
          ]}/>
        </div>

        <div className="columns large-9"> 
          <Feed content={this.props.content} />
        </div>
      </div>
    )
  }
};
