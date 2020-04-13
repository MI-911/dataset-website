import React from "react";
import axios from 'axios';
import {Line} from 'react-chartjs-2';

const COLORS = ['#087CB8', '#9b59b6', '#e74c3c', '#dfe70d', '#e7399a', '#2cd5e7', '#e78412', '#e74c3c'];
const API = 'https://mindreader.tech/spectate-api';


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
      <div className="App">
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

        <div id="container" className="mt-2">
          <Line data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default ResultsQuery;