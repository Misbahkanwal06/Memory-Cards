import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomModal from './Modal';
import { Container } from 'react-bootstrap';

function CardComponent() {
    const images = [
        '/Images/apple.jpg',
        '/Images/banana.jpg',
        '/Images/diamond.jpg',
        '/Images/peach.jpg',
    ];
    const quesImg = '/Images/ques.jpg';
    const ImagesArr = [...images, ...images];
    const [hiddenImages, setHiddenImages] = useState(Array(ImagesArr.length).fill(false));
    const [clickedImg, setClickedImg] = useState([]);
    const [suffledImg, setShuffledImg] = useState(ImagesArr);
    const [showModal, setShowModal] = useState(false);
    console.log("clickedImg", hiddenImages);

    const handleClick = (index, img) => {
        if (hiddenImages[index] || clickedImg.length === 2) return;

        const newArr = [...hiddenImages];
        newArr[index] = true;
        setHiddenImages(newArr);

        const newSelectedIndices = [...clickedImg, { index, img }];
        setClickedImg(newSelectedIndices);

    };

    const shuffledHiddenImages = () => {
        const hiddenCards = suffledImg.filter((_, index) => !hiddenImages[index]);

        for (let i = hiddenCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [hiddenCards[i], hiddenCards[j]] = [hiddenCards[j], hiddenCards[i]];
        }
        const newShuffledImages = suffledImg.map((img, index) => hiddenImages[index] ? img : hiddenCards.shift());
        setShuffledImg(newShuffledImages);
    };

    useEffect(() => {
        if (clickedImg.length === 2) {
            const [first, second] = clickedImg;
            if (first.img !== second.img) {
                setTimeout(() => {
                    const flipped = [...hiddenImages];
                    flipped[first.index] = false;
                    flipped[second.index] = false;
                    setHiddenImages(flipped);
                }, 1000);
            }
            setTimeout(() => {
                setClickedImg([]);
                shuffledHiddenImages();
            }, 1000);
        }
    }, [clickedImg]);

    useEffect(() => {
        if (hiddenImages.every(image => image)) {
            setShowModal(true);
        }
    }, [hiddenImages]);

    const handleRestart = () => {
        window.location.reload();
    }

    return (
        <>
            <h1 className='text-center'>Memory Cards</h1>

            <Container>
                <Row className="g-1 mt-3">
                    {suffledImg.map((img, index) => (
                        <Col md={4} key={index}>
                            <Card style={{ width: '100%' }} onClick={() => handleClick(index, img)}>
                                <Card.Img
                                    variant="top"
                                    src={hiddenImages[index] ? img : quesImg}
                                    style={{ objectFit: 'cover', height: '140px' }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <CustomModal show={showModal} text="Congratulations!" handleRestart={handleRestart} onClose={() => setShowModal(false)} />
        </>
    );
}

export default CardComponent;
