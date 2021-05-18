import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const initialState = {
  map_data:[]
}

export default class Chart extends PureComponent {
  state = initialState;
 
   componentDidMount() {
    this.prepareData();
  }

  prepareData = () => {
      const { details,  chartfields} = this.props;
      console.log(details)
      const map_data=[
  {
    subject: 'SENTIMENTAL SCORE',
    A: details.sentiment_score_std,
    fullMark: 100,
  },
  {
    subject: 'UNEMPLOY RATE',
    A: details.unemployed_rate_std,  
    fullMark: 100,
  },
  {
    subject: 'HOUSE PRICE',
    A: details.median_house_price_std,
    fullMark: 100,
  },
  {
    subject: 'PERSONAL INCOME',
    A: details.media_personal_income_std,
    fullMark: 100,
  },
  {
    subject: 'HOUSEHOLD INCOME',
    A: details.weekly_household_income_std,
    fullMark: 100,
  },
  {
    subject: 'NUM OF TWEET',
    A: details.tweet_counts_std,
    fullMark: 100,
  },
  {
    subject: 'MONTHLY MORGAGE',
    A: details.average_monthly_morgage_std,
    fullMark: 100,
  },
]
      this.setState({
      map_data,
    });
  };
  


  render() {
   
    return (
      <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={this.state.map_data} fill="#ffffff" fontSize="8px" fillOpacity={0.8}>
          <PolarGrid />
        
          <PolarAngleAxis dataKey="subject" fill="#ffffff" />

          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
