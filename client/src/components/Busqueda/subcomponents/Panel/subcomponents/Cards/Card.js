import React from 'react';
import styles from './Card.module.css';
import { connect } from 'react-redux';
export function Card (props){

    return(
        <div className={styles.div}>
            <h1 className={styles.name}>Title: {props.name.charAt(0).toUpperCase() +props.name.slice(1)} </h1>
            <img className={styles.img} alt={'SearchedImage'} src={props.img} style={{height: '250px'}}/>
        </div>
    )

}

export default connect(null, null)(Card);