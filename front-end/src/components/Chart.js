import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'sentimental score',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Unemployment rate',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'House Price',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Personal Income',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Household income',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Number of Tweet',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default class Chart extends PureComponent {

  render() {
     const { details,  chartfields} = this.props;
    return (
      <div className="chart">


      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} fill="#ffffff" fontSize="12px" >
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
