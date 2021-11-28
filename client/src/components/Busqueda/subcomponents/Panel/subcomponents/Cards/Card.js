import React from 'react';
import styles from './Card.module.css';
import { connect } from 'react-redux';
export function Card (props){
    var widthEstimated = 200*(props.width/props.height)
    var heightEstimated = 200
    if (widthEstimated>400) {
        widthEstimated = 200
        heightEstimated = 200*(props.height/props.width)
    }

    return(
        <div className={styles.div}>
            <h1 className={styles.name}>Title: {props.name.charAt(0).toUpperCase() +props.name.slice(1)} </h1>
            <img className={styles.img} alt={'SearchedImage'} src={props.img} style={{width:widthEstimated+'px', height: heightEstimated+'px'} }/>
        </div>
    )

}

export default connect(null, null)(Card);