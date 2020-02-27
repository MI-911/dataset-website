import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import StatisticsCol from '../components/StatisticsCol';
import longTail from '../statistics/long-tail.png';
import coverage from '../statistics/coverage.png';
import { Table } from 'react-bootstrap';

function LongTail() {
  return <img src={longTail} alt="Long-tail distribution" />;
}

function Coverage() {
  return <img src={coverage} alt="Entity type coverage" />;
}

const Statistics = () => {
  return (
    <>
      <h2>Statistics</h2>
      <p className="small text-muted">Updated 2020-02-25</p>
      <p>This page contains statistics on the <Link to="/releases">latest stable release</Link> of the MindReader dataset compared to existing datasets in the movie domain.</p>

      <Container className="pb-5">
        <Row>
          <StatisticsCol header="Long-tail distribution">
            <LongTail />
            <p className="small text-muted">MindReader dataset is limited to binary ratings (only likes and dislikes) and items (movies) for a fair comparison.</p>
          </StatisticsCol>
          
          <StatisticsCol header="Entity type coverage">
            <Coverage />
            <p className="small text-muted">Entities with both binary ratings and "don't know" observations are only counted as binary ratings.</p>
          </StatisticsCol>
        </Row>
      </Container>

      <h3>Knowledge graph statistics</h3>
      <hr />

      <p>      
        Below we present some rudimentary statistics and measures on the knowledge graph used in the latest stable version of MindReader.
      </p>
      <Container>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <strong>Measure</strong>
              </td>
              <td>
                <strong>Directed</strong>
              </td>
              <td>
                <strong>Undirected</strong>
              </td>
            </tr>

            <tr>
              <td>
                <code>Num. nodes</code>
              </td>
              <td>
                18,707
              </td>
              <td>
                18,707
              </td>
            </tr>

            <tr>
              <td>
                <code>Num. edges</code>
              </td>
              <td>
                198,452
              </td>
              <td>
                99,226
              </td>
            </tr>

            <tr>
              <td>
                <code>Min. degree</code>
              </td>
              <td>
                4
              </td>
              <td>
                2
              </td>
            </tr>

            <tr>
              <td>
                <code>Med. degree</code>
              </td>
              <td>
                10
              </td>
              <td>
                5
              </td>
            </tr>

            <tr>
              <td>
                <code>Avg. degree</code>
              </td>
              <td>
                21
              </td>
              <td>
                10
              </td>
            </tr>

            <tr>
              <td>
                <code>Max. degree</code>
              </td>
              <td>
                4,454
              </td>
              <td>
                2,227
              </td>
            </tr>

            <tr>
              <td>
                <code>Num. connected components</code>
              </td>
              <td>
                1
              </td>
              <td>
                1
              </td>
            </tr>

          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Statistics;