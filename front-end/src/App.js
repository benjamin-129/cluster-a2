import React, { Component } from "react";
import axios from "axios";

import Legend from "./components/Legend.js";
import Map from "./components/Map";

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
  fields: ["sentiment_score", "unemployed_rate", "weekly_household_income","average_monthly_morgage"],
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
        url: "http://localhost:15984/front_end/test_3/output_123.json",
      });
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
       sentiment_score: d.sentiment_score,
        tweet_counts: d.tweet_counts,
        weekly_household_income: d.equivalised_total_household_income_census_median_weekly,
        average_monthly_morgage: d.rent_mortgage_payments_census_average_monthly_household_payment,
        unemployed_rate: d.unemployed_rate,
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
    const { colors, countries_data, data_loaded, fields, query } = this.state;

    return data_loaded ? (
      <div className="root">
        <Legend
          colors={colors}
          fields={fields}
          query={query}
          handleSelectLegend={this.handleSetQuery}
        />

        <Map
          colors={colors}
          data={countries_data}
          fields={fields}
          query={query}
        />

        <div className="footer">Data source:Twitter API, Afinn, Aurin</div>
      </div>
    ) : null;
  }
}

export default App;
