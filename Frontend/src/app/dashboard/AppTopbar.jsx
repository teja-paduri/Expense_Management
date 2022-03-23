import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToolsSidebar from './../common/ToolsSidebar';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';

const AppTopbar = (props) => {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const history = useHistory();
  function logOut()
  {
    localStorage.clear();
    history.push('/register');
  }

  return (
    <div>
      <ToolsSidebar visible={sidebarVisible} position="right" onHide={() => setSidebarVisible(false)}/>
      <div className="layout-topbar clearfix">
        <a className="layout-menu-button" onClick={props.onToggleMenu}>
          <span className="pi pi-bars" />
        </a>
        <div className="layout-topbar-icons">
          <Button label = "Logout" icon="pi pi-fw pi-power-off" onClick={logOut}></Button> 
          <a onClick={() => setSidebarVisible(true)}>
            <span className="layout-topbar-item-text">Tools</span>
            <span className="layout-topbar-icon pi pi-briefcase" />
          </a>
        </div>
      </div>
    </div>
  );
}

AppTopbar.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
};

export default React.memo(AppTopbar);
