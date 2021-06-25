import React from "react";
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index.js";

function Deck({deckName, deckDescription}) {

    const { url } = useRouteMatch();
    const { deckId } = useParams();
    const history = useHistory();

    const deleteHandler = () => {
        async function deleteDeckData() {
            if (window.confirm("Delete this deck? You will not be able to recover it")){
                await deleteDeck(deckId);
                history.push("/");
            }
        }
        deleteDeckData();
    }


    return (
        <div className="card border-primary mb-3 ">
        <div className="card-header">{deckName}</div>
            <div className="card-body text-primary ">
                <p className="card-text">{deckDescription}</p>
            </div>
            <div className="m-3 ">
                <Link to={`${url}/edit`}>
                    <button className="btn btn-secondary mr-3" type="button">Edit</button>
                </Link>
                <Link to={`${url}/study`}>
                    <button className="btn btn-primary mr-3" type="button">Study</button>
                </Link>
                <Link to={`${url}/cards/new`}>
                    <button className="btn btn-secondary mr-3" type="button">Add Cards</button>
                </Link>
                <button className="btn btn-danger mr-3" type="button" onClick={deleteHandler}>Delete</button>
            </div>
        </div>    
    );
}

export default Deck;