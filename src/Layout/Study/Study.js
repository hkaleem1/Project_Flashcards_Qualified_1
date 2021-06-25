import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import Breadcrumb from "./Breadcrumb.js";
import Card from "./Card.js";
import NotEnoughCards from "./NotEnoughCards.js";

function Study() {
    const initialDeckState = {        
            "id": 0,
            "name": "",
            "description": "",
            "cards": [],   
    };

    const [currentDeck, setCurrentDeck] = useState(initialDeckState);

    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadCurrentDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal);
                setCurrentDeck(response);
            } catch (error) {
                if (error.name === "AbortError"){
                    console.log("Deck list fetch failed")
                } else {
                    history.push(`/${error}`);
                }
            }
        }
        loadCurrentDeck();
        return () => abortController.abort();
    }, [deckId, history]);


    return (
            <section className="container">
                    <Breadcrumb deckName={currentDeck.name} />
                    <h2>Study:  {currentDeck.name}</h2>
                    {currentDeck.cards.length > 2 && <Card cards={currentDeck.cards} />}
                    {currentDeck.cards.length < 3 && <NotEnoughCards count={currentDeck.cards.length} />}
            </section>
    );
}

export default Study;