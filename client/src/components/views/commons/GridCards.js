import React from 'react'
import { Col } from 'antd'; 

function GridCards({image, id, title}) {
    console.log(image, id, title);
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{ position : 'relative' }}>
                <a href ={`/movie/${id}`}> 
                    <img style={{width:'100%', height:'320px'}}src={image} alt={title}/>
                </a>
            </div>
        </Col>
    )
}

export default GridCards
