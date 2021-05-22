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
       unemployment_rate:item.unemployed_rate_std
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
      
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={this.state.chart_data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
  
            <Bar dataKey="sentiment_score" fill="#8884d8" stackId="stack" />
          <Bar dataKey="personal_income" fill="#82ca9d" stackId="stack" />

          </ComposedChart>
        </ResponsiveContainer>
      </div>

    );
  }
}
