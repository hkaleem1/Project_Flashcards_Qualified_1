import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import Breadcrumb from "./Breadcrumb.js";
import Deck from "./Deck.js";
import CardList from "./CardList.js";

function ViewDeck(){

    const initialDeckState = { 
        id: 0,       
        "name": "",
        "description": "",
        cards: [],
    };

    const [deck, setDeck] = useState(initialDeckState);
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadCurrentDeck() {
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
        loadCurrentDeck();
        return () => abortController.abort();
    }, [deckId, history]);

    return (
        <section className="container">
            <Breadcrumb deckName={deck.name} />
            <Deck 
                deckName={deck.name}
                deckDescription={deck.description}
            />    
            <CardList cardsArray={deck.cards} />
        </section>
    );
}

export default ViewDeck;