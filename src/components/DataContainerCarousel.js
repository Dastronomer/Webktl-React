// File DataContainerCarousel.js
// Last Modified: July 26, 2024 by aNakashima
// Description: This component enables users to create a carousel data container
// where they can display more features and data. The carousel will automate on
// its own if left untouched, but users can toggle between pages in the carousel by
// clicking on the far left or far right of its current contents.

import Carousel from 'react-bootstrap/Carousel';
import React from "react";

function DataContainerCarousel({header, contents}) {
    return (
        <div className='card' style={{margin: 10, padding: 5}}>

            {header ? <div className='header'>{header} </div> : " "}
            <Carousel style={{padding:10, overflow:"scroll"}} slide={false} >
                {contents.map((content, index) => (
                    <Carousel.Item key={index} style={{padding: 10}}>
                        {content}
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>

    );
}

export default DataContainerCarousel;