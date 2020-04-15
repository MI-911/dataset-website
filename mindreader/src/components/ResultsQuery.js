import React from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';

const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
                '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
                '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
const API = 'https://mindreader.tech/spectate';


const ComboBox = (props) => {
  return (
    <select name={props.name} value={props.value} onChange={props.onChange} className="form-control">
      {
        props.items.map((item, i) => {
          return (
            <option value={item} key={i}>{ item }</option>
          )
        })
      }
    </select>
  );
};

class ResultsQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: []
      },
      experiment: 'default',
      metric: 'hr',
      cutoff: '10',
      metrics: ['hr', 'tau', 'cov', 'ser', 'ndcg'],
      experiments: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  componentDidMount() {
    this.getExperiments();
  }

  getExperiments() {
    axios
      .get(`${API}/experiments`)
      .then(response => {
        this.setState(previous => ({
          ...previous,
          experiments: response.data
        }));
      })
      .catch(error => console.log(error.response));
  }

  getData() {
    axios
      .get(`${API}/results/${this.state.experiment}/${this.state.metric}/${this.state.cutoff}`)
      .then(response => {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            datasets: Object.entries(response.data).map(([key, value], idx) => {
              return {
                label: key,
                fill: false,
                data: Object.keys(value).map((key, index) => value[key]),
                borderColor: COLORS[idx % COLORS.length]
              }
            })
          }
        }));
      })
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <>
        <div className="form-row">
          <div className="col">
            <ComboBox onChange={this.handleChange} value={this.state.experiment} items={this.state.experiments}
              name="experiment" />
          </div>

          <div className="col">
            <ComboBox onChange={this.handleChange} value={this.state.metric} items={this.state.metrics}
              name="metric" />
          </div>

          <div className="col">
            <input type="text" name="cutoff" value={this.state.cutoff} onChange={this.handleChange} placeholder="cutoff" className="ml-2 form-control" />
          </div>

          <div className="col">
            <button onClick={this.getData} className="ml-2 form-control">Update</button>
          </div>
        </div>

        <div className="mt-2">
          <Line data={this.state.data} />
        </div>
      </>
    )
  }
}

export default ResultsQuery;