import React from 'react';
import styles from './Cards.module.css';
import { connect } from 'react-redux';
import Card from './Card.js';
export function Cards (props){

    const[show,setShow]=React.useState([])
    React.useEffect( ()=>{
        async function showPhotos()
        {
            if (props.panel==='empty')
            {
                setShow([])
            }
            else if (props.panel === 'loading')
            {
                setShow(<div style={{margin: '100px'} }>
                    
                    <h1>Cargando...</h1>
                    </div>)
            }
            else if (props.panel==='loaded')
            {
                var currentPage = props.pagination.current
                var indexStartPhoto = currentPage * 6 - 6;
                var i=0
                var cardsShowing=[] 
                while (i < 6)
                {
                    let card1,card2
                    if ((i+indexStartPhoto)<props.photos.total)
                    {
                        card1=<Card key={props.photos.photos[i+indexStartPhoto].id} name={props.photos.photos[i+indexStartPhoto].title} img={props.photos.photos[i+indexStartPhoto].url} id={props.photos.photos[i+indexStartPhoto].id} height={props.photos.photos[i+indexStartPhoto].height} width= {props.photos.photos[i+indexStartPhoto].width}/>
                        if ((i+1+indexStartPhoto)<props.photos.total)
                        {
                            card2=<Card key={props.photos.photos[i+1+indexStartPhoto].id} name={props.photos.photos[i+1+indexStartPhoto].title} img={props.photos.photos[i+1+indexStartPhoto].url} id={props.photos.photos[i+1+indexStartPhoto].url} height={props.photos.photos[i+indexStartPhoto].height} width= {props.photos.photos[i+indexStartPhoto].width}/>
                        }
                        else if ((i+1+indexStartPhoto)>props.photos.total)
                        {
                            card2=<Card key={'undefined'}/>
                        }
                        cardsShowing.push(<div className={styles.flexcontainer} key={i}>
                        {[card1,card2]}
                            </div>)
                    }
                    i=i+2
                }
                setShow(cardsShowing)
            }
        }  
        showPhotos()      
    },[props.panel, props.pagination, props.photos])

    
    return(
        
        <div className={styles.div}>
            {show}  
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
      pagination: state.pagination,
      panel: state.panel,
      photos: state.photoResponse,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
  
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cards);