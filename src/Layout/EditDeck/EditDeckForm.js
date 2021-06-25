import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck } from "../../utils/api/index.js";

function EditDeckForm({form, setForm}){

    const history = useHistory();
    const { deckId } = useParams();

    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateData() {
            try {
                await updateDeck(form);
                history.push(`/decks/${deckId}`);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("updateDeck Aborted");
                } else {
                    throw error;
                }
            }
        }
        updateData();
    };

    return(
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
                type="text" 
                className="form-control"
                name="name" 
                id="name" 
                onChange={handleChange}
                required="required"
                value={form?.name}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
                className="form-control" 
                name="description"
                id="description" 
                onChange={handleChange}
                rows="4" 
                required="required"
                value={form?.description}
            ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to={`/decks/${deckId}`}>
            <button type="button" className="btn btn-secondary mx-4">Cancel</button>
        </Link>
    </form>
    );
}

export default EditDeckForm;