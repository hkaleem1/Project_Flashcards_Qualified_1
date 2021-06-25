import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header.js";
import Home from "./Home/Home.js";
import ViewDeck from "./ViewDeck/ViewDeck.js";
import Study from "./Study/Study.js";
import CreateDeck from "./CreateDeck/CreateDeck.js";
import NotFound from "./NotFound.js";
import EditDeck from "./EditDeck/EditDeck.js";
import AddCard from "./AddCard/AddCard.js";
import EditCard from "./EditCard/EditCard.js";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
