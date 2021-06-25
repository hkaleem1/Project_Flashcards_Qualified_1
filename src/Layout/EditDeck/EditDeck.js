import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import Breadcrumb from "./Breadcrumb.js";
import EditDeckForm from "./EditDeckForm.js";

function EditDeck() {

    const initialDeckState = {  
        id: null,      
        "name": "",
        "description": "",
        cards: [],
    };

    const [deck, setDeck] = useState({...initialDeckState});
    const [form, setForm] = useState({...initialDeckState});
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

    useEffect(() => {
        setForm(deck)
    }, [deck]);

    return (
        <section className="container">
            <Breadcrumb deckName={deck.name} />
            <h2>Edit Deck</h2>
            <EditDeckForm form={form} setForm={setForm} /> 
        </section>
    );
}

export default EditDeck;