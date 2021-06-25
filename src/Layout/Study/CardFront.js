import React from "react";

function CardFront({currentCardData, flip, setFlip}) {


    return (
        <>
            <p className="card-text">{currentCardData.front}</p>
            <div>
                <button 
                    className="btn btn-secondary" 
                    type="button"
                    onClick={() => setFlip(!flip)}
                >
                    Flip
                </button>
            </div>   
        </>     
    );
}

export default CardFront;