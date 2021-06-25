import React from "react";
import { updateCard } from "../../utils/api/index.js";
import { useHistory } from "react-router-dom";

function AddCardForm({card, setCard}) {

    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    };

    const handleCancel = () => {
        history.go(-1);
    }

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateCardData() {
            try {
                await updateCard(card);
                history.go(-1);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("updateCard Aborted");
                } else {
                    throw error;
                }
            }
        }
        updateCardData();
    };


    return (
        <form onSubmit={handleSubmit}>
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
                    value={card.front}
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
                    value={card.back}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary mx-4" onClick={handleCancel}>Cancel</button>
        </form>
    );
}

export default AddCardForm;