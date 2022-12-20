import React from 'react';
import Card from 'react-bootstrap/Card';
import "./Fiche.css";

function Fiche({title, contents=[], subtitle, image}) {
    return (
        <Card className='Fiche'>
            {image 
                ? <Card.Img variant="top" src="holder.js/100px160" />
                : <Card.Header><Card.Title>{title}</Card.Title></Card.Header>
            }
            <Card.Body>
                {image && <Card.Title>{title}</Card.Title>}
                {subtitle && <Card.Subtitle className="mb-2 text-muted"><small>{subtitle}</small></Card.Subtitle>}
                <Card.Text className="Fiche-content">
                    {contents.map(content => (
                        <span key={content.title}>
                            {content.title} : {content.text}
                        </span>
                    ))}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Fiche;