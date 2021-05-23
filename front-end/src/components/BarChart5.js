import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Nav from "./Nav.js"


const initialState = {
  chart_data:[
    {
      name: "sa4",
      sentiment_score:0.3
    }
  ]
}

export default class BarChart extends PureComponent {
  state = initialState;
   componentDidMount() {
    this.prepareData();
  }

  prepareData = () => {
    const chart_data=[];
    const {data} = this.props;

    data.forEach(item => {
    const dict = {
       name: item.sa4_name,
       sentiment_score: item.sentiment_score_std,
       personal_income:item.media_personal_income_std,
       weekly_household_income:item.weekly_household_income_std
    }
    chart_data.push(dict);
});
      this.setState({
        chart_data,
      });
      console.log(chart_data)
  }

  render() {
    return (

      <div style={{ width: '100%', height: 560 }}>
        <Nav />
        <div className="home-content">
        <h5>Weekly Household Income vs Sentiment Score</h5>

      <p > In order to better represent the data, each feature's data was normalised using a min-max scalar and scaled between a range of 0 and 1.</p>
      </div>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={this.state.chart_data}
            margin={{
              top: 24,
              right: 32,
              bottom: 24,
             
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
  
            <Bar dataKey="sentiment_score" fill="#8884d8" stackId="stack" />
          <Bar dataKey="weekly_household_income" fill="rgba(275,75,5,0.3)" stackId="stack" />

          </ComposedChart>
        </ResponsiveContainer>
      </div>

    );
  }
}
