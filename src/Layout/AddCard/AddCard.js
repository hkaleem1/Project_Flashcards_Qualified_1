import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import Breadcrumb from "./Breadcrumb.js";
import AddCardForm from "./AddCardForm.js";

function AddCard() {

    const initialDeckFormState = {
        name: "",
        description: "",
    };

    const [deck, setDeck] = useState(initialDeckFormState);

    const { deckId } = useParams();

    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                if (error.name === "AbortError"){
                    console.log("Deck list fetch failed")
                } else {
                    history.push(`/${error}`);
                }
            }
        }
        loadDeck(); 
        return () => abortController.abort();
    }, [deckId, history]);

    return (
        <section>
            <Breadcrumb deckName={deck.name} />
            <h2>{deck.name}: Add Card</h2>
            <AddCardForm deck={deck} />
        </section>
    );
}

export default AddCard;