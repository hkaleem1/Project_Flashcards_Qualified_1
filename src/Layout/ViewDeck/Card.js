import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api/index.js";

function Card({ front, back, cardId }){

    const { url } = useRouteMatch();
    const history = useHistory();

    const deleteHandler = () => {
        async function deleteCardData() {
            if (window.confirm("Delete this card? You will not be able to recover it")){
                await deleteCard(cardId);
                history.go(0);
            }  
        }
        deleteCardData();
    }

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col">
                    <div className="card-body">
                        <h5>Front of Card</h5>
                        <hr />
                        <p className="card-text">{front}</p>
                    </div>
                </div>
                
            </div>
            <div className="row g-0">
            <div className="col">
                    <div className="card-body">
                        <h5>Back of Card</h5>
                        <hr />
                        <p className="card-text">{back}</p>
                        <div className="d-flex justify-content-end">
                            <Link to={`${url}/cards/${cardId}/edit`}>
                                <button className="btn btn-secondary mr-3" type="button">Edit</button>
                            </Link>
                            <button className="btn btn-danger" type="button" onClick={deleteHandler}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;