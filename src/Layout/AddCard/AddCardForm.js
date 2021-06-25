import React, { useState } from "react";
import { createCard } from "../../utils/api/index.js";
import { useHistory, useParams } from "react-router-dom";

function AddCardForm({deck}) {

    const initialCardFormState = {
        front: "",
        back: "",
        deckId: 0,
    };

    const [cardForm, setCardForm] = useState({...initialCardFormState});

    const history = useHistory();
    const { deckId } = useParams();

    const handleChange = ({ target }) => {
        setCardForm({
            ...cardForm,
            [target.name]: target.value,
        });
    };

    const handleSave = () => {

        setCardForm({
            ...cardForm,
            deckId: deck.id,
        })
        async function createCardData(){
            try {
                await createCard(deck.id, cardForm);
                setCardForm({...initialCardFormState});
            } catch (error) {
                history.push(`/${error}`);
            }
        }
        createCardData();
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
    };

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="front" className="form-label">Front</label>
                <textarea 
                    className="form-control" 
                    name="front"
                    id="front" 
                    placeholder="Front side of card" 
                    onChange={handleChange}
                    rows="3" 
                    required="required"
                    value={cardForm.front}
                ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="back" className="form-label">Back</label>
                <textarea 
                    className="form-control" 
                    name="back"
                    id="description" 
                    placeholder="Back side of card" 
                    onChange={handleChange}
                    rows="3" 
                    required="required"
                    value={cardForm.back}
                ></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleDone}>Done</button>
            <button type="button" className="btn btn-secondary mx-4" onClick={handleSave}>Save</button>
        </form>
    );
}

export default AddCardForm;