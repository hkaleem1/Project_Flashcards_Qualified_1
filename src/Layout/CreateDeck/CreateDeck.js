import React from "react";
import Breadcrumb from "./Breadcrumb.js";
import CreateDeckForm from "./CreateDeckForm.js";

function CreateDeck() {
    return (
        <section>
            <Breadcrumb />
            <h2>Create Deck</h2>
            <CreateDeckForm />
        </section>
    );
}

export default CreateDeck;