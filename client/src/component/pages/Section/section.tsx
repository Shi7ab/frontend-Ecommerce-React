import React from 'react';
import './section.css';
import collectionImage from '../../../assets/template images/banner-image.png';

function CollectionSection() {
    return (
        <div className='sect-row'>
            <img src={collectionImage} alt="" />
            <div className='text'>
                <h1>The base collection - Ideal every day.</h1>
                <button>SHOP</button>
            </div>
        </div>
    );
}

export default CollectionSection;