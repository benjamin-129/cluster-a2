import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'SENTIMENTAL SCORE',
    A: 56,
    fullMark: 100,
  },
  {
    subject: 'UNEMPLOY RATE',
    A: 65,  
    fullMark: 100,
  },
  {
    subject: 'HOUSE PRICE',
    A: 86,
    fullMark: 100,
  },
  {
    subject: 'PERSONAL INCOME',
    A: 54,
    fullMark: 100,
  },
  {
    subject: 'HOUSEHOLD INCOME',
    A: 67,
    fullMark: 100,
  },
  {
    subject: 'NUM OF TWEET',
    A: 76,
    fullMark: 100,
  },
];

export default class Chart extends PureComponent {

  render() {
     const { details,  chartfields} = this.props;
    return (
      <div className="chart">


      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} fill="#ffffff" fontSize="8px" fillOpacity={0.8}>
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
