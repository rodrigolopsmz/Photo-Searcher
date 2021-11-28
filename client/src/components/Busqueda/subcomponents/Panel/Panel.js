import React from 'react';
import styles from './Panel.module.css';
import { connect } from 'react-redux';
import Cards from './subcomponents/Cards/Cards.js';
import {SET_PAGINATION,SET_PHOTO_RESPONSE, SET_PANEL } from '../../../../actions/index.js';
const axios = require('axios');
export function Panel (props)
{
  const handleClick=  async function (e){
    e.preventDefault();
    if (props.panel==='loaded')
    {

      if (e.target.name==='next')
      { 
        if (props.pagination.current + 1 === props.pagination.pagesLoaded)
        {
          if (props.pagination.pagesLoaded===props.pagination.pagesTotal)
          {
            props.setPagination({
              ...props.pagination,
              current:1,
            })
          }
          else if (props.pagination.pagesLoaded<props.pagination.pagesTotal)
          {
            props.setPanel('loading')
            var pageSearch=props.photoResponse.page+1
            console.log(pageSearch)
            var response= await axios(`http://localhost:3001/getPhoto?text=${props.text}&page=${pageSearch}`).then(r => r.data)
            var newPhotoResponse = {...props.photoResponse,page: pageSearch,photos:[...props.photoResponse.photos,...response.photos]}
            props.setPhoto(newPhotoResponse)
            props.setPagination({
              ...props.pagination,
              current:props.pagination.current+1,
              pagesLoaded: Math.ceil(newPhotoResponse.photos.length/6)
            })
            props.setPanel('loaded')

          }
        }
        else if (props.pagination.current + 1< props.pagination.pagesLoaded)
        {
          props.setPagination({
            ...props.pagination,
            current:props.pagination.current+1,
          })
        }
      }
      else if (e.target.name==='previous') 
      {
        if (props.pagination.current>1)
        {
          props.setPagination({
            ...props.pagination,
            current:props.pagination.current-1,
          })
        }
      }
    
    }

   }
    return(<div>
            
            <div className={styles.flexcontainer}>
            <button name={'previous'} className={`${styles.button}`}  onClick={handleClick} >{String.fromCharCode(60)}</button>
            <Cards />
            <button name={'next'} className={`  ${styles.button}`}  onClick={handleClick} >{String.fromCharCode(62)}</button>
          </div>
    </div>);


}
const mapStateToProps = (state) => {
  return {
    panel: state.panel,
    pagination: state.pagination,
    photoResponse: state.photoResponse,
    text: state.keyText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPanel: (text) => dispatch(SET_PANEL(text)),
    setPagination: (payload) => dispatch(SET_PAGINATION(payload)),
    setPhoto: (payload)=> dispatch(SET_PHOTO_RESPONSE(payload)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);