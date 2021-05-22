import React, { Component } from 'react'

export default class Home extends Component {


  render() {


    return (
      <div className="home">
        <div className="header">
      <h1>
      COMP90024 - Cluster and Cloud Computing
      </h1>
      <h2>
      ANALYSIS OF TWEETS 
      </h2>
      <h5>Wealth VS Happniess</h5>
      <p>Group 42: Joey Xinyue Hu, Matthew Lim, Benjamin Tam, Andrzej Poniatowski, James Sammut
</p>
      </div>
      <div className="home-content">
      <h3>
       Abstract
      </h3>
      <p>The goal of our study was to determine whether there exists a correlation between wealth and happiness in Australia. Due to a lack of surveys measuring self-reported citizen happiness, we chose to use an approach of Tweet text sentiment analysis to determine the happiness levels across Australia. Our study has found no correlation between these two variables.
      </p>
      <h3>
      Study assumptions
      </h3>
      <p>
      When analysing data we assume the following statements to hold true.
      <ul>
      <li>
      Tweet sentiment score is strongly correlated with happiness levels among the tweeting population.
      </li>
      <li>The sentiment analysis method we chose (AFINN) is sufficient to accurately determine Tweet sentiment.</li>
      <li>The metrics we used to determine wealth levels are representative.</li>
      <li>The wealth metrics we used have not drastically changed since 2016.</li>
      </ul>
      <h3>
      Measures used in the study
      </h3>
      <p>We used a wide range of metrics testablish wealth levels across Australia:</p>
      <ul>
      <li>Equivalised total weekly household income</li>
      <li>Annual median personal income</li>
      <li>Average rent monthly rent</li>
      <li>Average monthly mortgage payments</li>
      <li>Unemployment rate</li>
      <li>Median house price</li>
      </ul>

     







      </p>
      </div>
</div>
    )
  }
}