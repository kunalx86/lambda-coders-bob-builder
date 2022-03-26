import { Component } from 'react/cjs/react.production.min';
import dynamic from 'next/dynamic'
    
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
class Charts extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
            dataLabels: {
                enabled: false
              },
              colors: ["#BAFF29"],
                      
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: [1, 2, 3, 4, 5, 6, 7]
          }
        },
        series: [{
          name: 'Week 1',
          data: [1,1,1,0,1,1,1]
        },
        {
            name: 'Week 2',
            data: [1,1,1,1,1,1,1]
          },
          {
            name: 'Week 3',
            data: [1,0,1,0,1,1,1]
          },
          {
            name: 'Week 4',
            data: [1,0,1,1,1,0,1]
          },{
            name: 'Week 5',
            data: [1,0,1,0,1,0,1]
          }]
      }
    }
    render() {
      return (
        <Chart options={this.state.options} series={this.state.series} type="heatmap" width={500} height={320} />
      )
    }
  }

export default Charts;