import styles from '../styles/components/button.module.css'
import React, { useState } from 'react';

export default function Button({children, disabled}){
    return (
<<<<<<< HEAD
            <button className={styles.btn} disabled={disabled} >{children}</button>
     
=======
            <button className={styles.btn} name="button" disabled={disabled} type="submit" >{children}</button>
        
>>>>>>> origin/main
    )
    
}
