import React, { Component } from "react";
import axios from "axios";
import Map from "./components/Map";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Chart1 from "./components/BarChart";
import Chart2 from "./components/BarChart2";
import Chart3 from "./components/BarChart3";

import "./App.css";

const initialState = {
  colors: [
    "rgba(5, 155, 247, 0.7)",
    "rgba(233,30,99,0.7)",
    "rgba(53,211,156,0.7)",
    "rgba(257,234,13,0.7)"
  ],
  countries_data: [],
  data_loaded: false,
  fields: ["sentiment_score", "tweet_counts","median_house_price","unemployed_rate", "weekly_household_income","average_monthly_morgage","media_personal_income"],
  query: "sentiment_score",
};
class App extends Component {
  state = initialState;

  componentDidMount() {
    this.fetchCountryData();
  }

  fetchCountryData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/front_end/output/out_data.json",
      });
      console.log(response)
      const countries_data = this.processData(response.data);
 
      this.setState({
        countries_data,
        data_loaded: true,
      });
    } catch (e) {
      console.log("unable to retrieve data", e);
    }
  };

  processData = (data) => {
    let processed = [];

    for (const d of data) {
      let obj = {
        sa4_name:d.sa4_name_2016,
        sentiment_score: d.sentiment_score[0],
        tweet_counts: d.tweet_counts[0],
        unemployed_rate: d.unemployed_rate[0],
        median_house_price: d.median_house_price[0],
        weekly_household_income: d.equivalised_total_household_income_census_median_weekly[0],
        average_monthly_morgage: d.rent_mortgage_payments_census_average_monthly_household_payment[0],
        media_personal_income:d.median_aud[0],
        sentiment_score_std: d.sentiment_score[1],
        tweet_counts_std: d.tweet_counts[1],
        unemployed_rate_std: d.unemployed_rate[1],
        median_house_price_std: d.median_house_price[1],
        weekly_household_income_std: d.equivalised_total_household_income_census_median_weekly[1],
        average_monthly_morgage_std: d.rent_mortgage_payments_census_average_monthly_household_payment[1],
        media_personal_income_std:d.median_aud[1],
        coordinates:d.centroid
      };
      processed.push(obj);
    }

    return processed;
  };


  handleSetQuery = (query) => {
    this.setState({
      query,
    });
  };

  render() {
    const { colors, countries_data, data_loaded, fields, query} = this.state;

    return data_loaded ? (
      
      <div className="root">
        <BrowserRouter>
        <Switch>
        <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/map">
      <Map
          colors={colors}
          data={countries_data}
          fields={fields}
          query={query}
        />
      </Route>
      <Route exact path="/personal_income">
        <Chart1 
        data={countries_data}
          />
      </Route>
      <Route exact path="/unemployment_rate">
        <Chart2
        data={countries_data}
          />
      </Route>
      <Route exact path="/house_price">
        <Chart3
        data={countries_data}
          />
      </Route>
      <Route component={NotFound} />
         </Switch>
        <div className="footer">Data source:Twitter API, Afinn, Aurin</div>
        </BrowserRouter>
      </div>
    ) : null;
  }
}

export default App;