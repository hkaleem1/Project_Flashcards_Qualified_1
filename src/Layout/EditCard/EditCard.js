import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api/index.js";
import Breadcrumb from "./Breadcrumb.js";
import EditCardForm from "./EditCardForm.js";

function EditCard() {

    const initialDeckFormState = {
        name: "",
        description: "",
    };

    const initialCardFormState = {
        front: "",
        back: "",
    };

    const [deck, setDeck] = useState(initialDeckFormState);
    const [card, setCard] = useState(initialCardFormState);

    const { deckId, cardId } = useParams();
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

    useEffect(() => {
        const abortController = new AbortController();

        async function loadCard() {
            try {
                const response = await readCard(cardId, abortController.signal);
                setCard(response);
            } catch (error) {
                if (error.name === "AbortError"){
                    console.log("Deck list fetch failed")
                } else {
                    history.push(`/${error}`);
                }
            }
        }
        loadCard();
        return () => abortController.abort();
    }, [cardId, history]);

    return (
        <section>
            <Breadcrumb deckName={deck.name} />
            <h2>Edit Card</h2>
            <EditCardForm deck={deck} card={card} setCard={setCard} />
        </section>
    );
}

export default EditCard;