import React from 'react';

const LandingLayout = (props) => {
  return (
    <div className="layout-main" style= {{backgroundColor:'#8DC1ED'}}>
      {props.children}
      <footer>  
</footer>
    </div>
    
  );
}

export default LandingLayout;
