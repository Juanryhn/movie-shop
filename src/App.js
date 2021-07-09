import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BottomNav from "./components/Nav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;