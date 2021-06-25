import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index.js";

function Deck({deckId, name, description, count}) {

    const { url } = useRouteMatch();
    const history = useHistory();

    const deleteHandler = () => {
        if (window.confirm("Delete this deck? You will not be able to recover it")){
            deleteDeck(deckId);
            history.go(0);
        }
    }

    return (
        <div className="card my-3">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{name}<span className="badge bg-warning mx-3">{count} cards</span></h5>
                <p className="card-text">{description}</p>
                <div>
                    <Link to={`${url}decks/${deckId}`}>
                        <button className="btn btn-secondary" type="button">
                            View
                        </button>
                    </Link>
                    <Link to={`${url}decks/${deckId}/study`}>
                        <button className="btn btn-primary mx-4" type="button">
                            Study
                        </button>
                    </Link>  
                    <button className="btn btn-danger" type="button" onClick={deleteHandler}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Deck;