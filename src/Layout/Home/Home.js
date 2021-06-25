import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { listDecks } from "../../utils/api/index.js";
import Deck from "./Deck.js";

function Home(){
    
    const [decks, setDecks] = useState([]);
    const { url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDecks() {
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } catch (error) {
                if (error.name === "AbortError"){
                    console.log("Deck list fetch failed")
                } else {
                    history.push(`/${error}`);
                }
            }
        }
        loadDecks();
        return () => abortController.abort();
    }, [history]);

    const list = decks.map((deck) => (
        <li key={deck.id} >
                <Deck 
                deckId={deck.id}
                name={deck.name} 
                description={deck.description}
                count={deck.cards.length}
            /> 
        </li>
   ));

    return (
        <main className="container">
            <Link to={`${url}decks/new`}>
                <button className="btn btn-secondary" type="button">
                    Create Deck
                </button>
            </Link>    
            <section className="row">
                <ul className="list-unstyled">
                    {list}
                </ul>
            </section>
        </main>

    );
}

export default Home;