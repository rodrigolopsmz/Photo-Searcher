import React from 'react';
import styles from './Buscar.module.css';
import { connect } from 'react-redux';
import { SET_PAGINATION,SET_SEARCH, SET_PANEL, SET_PHOTO_RESPONSE } from '../../../../../src/actions/index.js';
const axios = require("axios");

export function Buscar (props)
{
  const [input, setInput] = React.useState('');

  const handleInputChange = function(e) {
   
    setInput(e.target.value);   
  }
  const handleClick=  async function (e){
    e.preventDefault();
    if (input!=='')
    {
      if (props.panel!=='loading')
        {
          props.setSearch(input.toLowerCase())
          props.setPanel('loading')
          var response= await axios(`http://localhost:3001/getPhoto?text=${input.toLowerCase()}`).then(r => r.data)
          props.setPhotoResponse(response)
          props.setPanel('loaded')
          props.setPagination({
            current:1,
            pagesTotal:Math.ceil(response.total/6),
            pagesLoaded: Math.ceil(response.photos.length/6)
          })
        }
    }
    else if(input==='')
    {
      props.setSearch('')
      props.setPanel('empty')
      props.setPhotoResponse({})
      props.setPagination({})
    } 
    
    
  }
    return (
        <div>
        <form className={styles.form}>
            <div>
              <label>Busca la imagen, ingresando palabras claves:</label>
              <input type="text" onChange={handleInputChange} />
            </div>
            <button onClick={handleClick}>Cargar</button>
        </form>
      </div>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {

    setPagination: (obj) => dispatch(SET_PAGINATION(obj)),
    setSearch: (obj) => dispatch(SET_SEARCH(obj)),
    setPanel: (code) => dispatch(SET_PANEL(code)),
    setPhotoResponse: (obj) => dispatch(SET_PHOTO_RESPONSE(obj)),

  }
}
const mapStateToProps = (state) => {
  return {
    photos: state.photoResponse,
    panel: state.panel,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buscar);