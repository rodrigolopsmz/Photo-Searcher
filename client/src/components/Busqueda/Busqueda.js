import React from 'react';
import Buscar from './subcomponents/Buscar/Buscar.js';
import Panel from './subcomponents/Panel/Panel.js';
import background from "./images/photo.jpg";
import styles from './Busqueda.module.css';
import { connect } from 'react-redux';


export function Busqueda(props) {
  

  return (
    <div className={styles.sizediv} style={{ backgroundImage: `url(${background})`,
    backgroundPosition: 'center center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat' }}>
      
      <Buscar/>
      <Panel/>
      
      
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    state: state
    
  };
};



export default connect(mapStateToProps, null)(Busqueda);
