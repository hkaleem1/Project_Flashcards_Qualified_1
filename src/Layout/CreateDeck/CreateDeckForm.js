import React, { useState } from "react";
import { createDeck } from "../../utils/api/index.js";
import { Link, useHistory } from "react-router-dom";

function CreateDeckForm() {

    const initialDeckFormState = {
        id: null,
        name: "",
        description: "",
    };

    const [deckForm, setDeckForm] = useState({...initialDeckFormState});

    const handleChange = ({ target }) => {
        setDeckForm({
            ...deckForm,
            [target.name]: target.value,
        });
    };

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        async function postData() {
            try {
                const newDeck = await createDeck(deckForm);
                history.push(`/decks/${newDeck.id}`);
            } catch (error) {
                history.push(`/${error}`);
            }
        }
        postData();
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    className="form-control"
                    name="name" 
                    id="name" 
                    placeholder="Deck Name" 
                    onChange={handleChange}
                    required="required"
                    value={deckForm.name}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                    className="form-control" 
                    name="description"
                    id="description" 
                    placeholder="Brief description of the deck" 
                    onChange={handleChange}
                    rows="4" 
                    required="required"
                    value={deckForm.description}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/">
                <button type="button" className="btn btn-secondary mx-4">Cancel</button>
            </Link>    
            <button type="button" className="btn btn-secondary" onClick={() => setDeckForm(initialDeckFormState)}>Clear</button>
        </form>
    );
}

export default CreateDeckForm;