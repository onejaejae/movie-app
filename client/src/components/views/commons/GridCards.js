import React from 'react'
import { Col } from 'antd'; 
import { Link } from 'react-router-dom';

function GridCards(props) {
    // LandingPage.js에서의 grid와 movieDetail에서의 grid와 구별하기 위해서
    // LandingPage.js에서 GridCards component를 호출할때 props로 landingpage를 줌
    if(props.landingpage){
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position : 'relative' }}>
                    <Link to = {`/movie/${props.id}`}>
                        <img style={{width:'100%', height:'320px'}}src={props.image} alt={props.title}/>
                    </Link>
                </div>
            </Col>
        )
    }else{
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position : 'relative' }}>
                        <img style={{width:'100%', height:'320px'}}src={props.image} alt={props.name}/>
                </div>
            </Col>
        )
    }
    
}

export default GridCards
