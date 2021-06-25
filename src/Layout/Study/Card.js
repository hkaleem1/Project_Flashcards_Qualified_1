import React, { useState } from "react";
import CardFront from "./CardFront.js";
import CardBack from "./CardBack.js";

function Card({ cards }) {

    const initialCard = 0;
    const [currentCard, setCurrentCard] = useState(initialCard);
    const [flip, setFlip] = useState(true);
    return (
        <div className="card my-3">
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">Card {currentCard + 1} of {cards.length}</h5>
            {flip ? (
                <CardFront 
                    currentCardData={cards[currentCard]} 
                    flip={flip}
                    setFlip={setFlip} 
                />) : (
                <CardBack 
                    initialCard={initialCard}
                    deckSize={cards.length}
                    currentCardData={cards[currentCard]} 
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard} 
                    flip={flip}
                    setFlip={setFlip}
                />)
            }
        </div>
    </div>
    );
}

export default Card;