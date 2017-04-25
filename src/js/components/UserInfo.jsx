import React from 'react';
import '../../scss/components/UserInfo.scss';


export default class userList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row container-user-header">
        <div className="columns large-8 wrap-user-header">
          <h1 className="container-user-header_title">Esneyder</h1>
          <div className="container-user-header_attributes">
            <div className="wrap_header_rol">
              <i className="material-icons">&#xE0DA;</i>
              <span className="container-user-header_location">Admin</span>
            </div>{/* end wrap_header_rol */}
          </div>{/* end wrap-user-header */}
        </div>{/* end container-user-header */}

        <div className="columns large-4 container-user-options">
          <div className="wrap-user-options">
             <div className="wrap-user-options_delete">
                <i className="material-icons">&#xE872;</i>
               <span>Eliminar</span>
             </div>

              <div className="wrap-user-options_edit">
                <i className="material-icons">&#xE22B;</i>
               <a href="/user/update">
                 <span>Editar</span>
               </a>

              </div>
          </div>{/* end wrap-user-options */}
        </div>{/* end container-user-options */}
      </div>
    )
  }

};//end userList
