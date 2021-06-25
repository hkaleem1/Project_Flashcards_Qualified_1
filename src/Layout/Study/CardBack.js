import React from "react";
import { useHistory } from "react-router-dom";

function CardBack({currentCardData, initialCard, currentCard, setCurrentCard, flip, setFlip, deckSize}) {

    const history = useHistory();

    const nextClickHandler = () => {
        if (currentCard <= (deckSize -1)){
            setCurrentCard(currentCard += 1);
            setFlip(!flip);
        }
        if (currentCard === deckSize){
            if (window.confirm("Restart Cards?")){
                setCurrentCard(initialCard);
                setFlip(!flip);
            } else {
                history.push("/");
            }
        }
    }

    
    return (
        <>
            <p className="card-text">{currentCardData.back}</p>
            <div>
                <button 
                    className="btn btn-secondary" 
                    type="button"
                    onClick={() => setFlip(!flip)}>
                    Flip
                </button>
                <button 
                    className="btn btn-primary mx-4" 
                    type="button"
                    onClick={nextClickHandler}
                >
                    Next
                </button>
            </div>
        </>    
    );
}

export default CardBack;