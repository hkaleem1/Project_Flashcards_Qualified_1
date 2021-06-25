import React from "react";
import { Link, useParams } from "react-router-dom";

function NotEnoughCards({count}) {

    const { deckId } = useParams();

    return (
        <div className="card my-3">
            <div className="card-body d-flex flex-column">
                <h4 className="card-title">Not enough cards</h4>
                <p className="card-text">You need at least 3 cards to study. There are {count} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button className="btn btn-secondary" type="button">
                        Add Cards
                    </button>
                </Link>    
            </div>
        </div>
    );
}

export default NotEnoughCards;