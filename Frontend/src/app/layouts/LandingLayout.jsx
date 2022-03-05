import React from 'react';

const LandingLayout = (props) => {
  return (
    
    <div className="layout-main" style= {{backgroundColor:'black'}}>
      {props.children}
      <footer>
  <p>Author: Hege Refsnes</p>
  <p><a href="mailto:hege@example.com">hege@example.com</a></p>
</footer>
    </div>
    
  );
}

export default LandingLayout;
