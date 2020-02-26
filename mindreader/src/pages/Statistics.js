import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import StatisticsCol from '../components/StatisticsCol';

const Statistics = () => {
  return (
    <>
      <h2>Statistics</h2>
      <p className="small text-muted">Updated 2020-02-25</p>
      <p>This page contains statistics on the <Link to="/releases">latest stable release</Link> of the MindReader dataset compared to existing datasets in the movie domain.</p>

      <Container>
        <Row>
          <StatisticsCol header="Long-tail distribution">
            <img src="./long-tail.png" alt="Long-tail distribution." />
            <p className="small text-muted">MindReader dataset is limited to binary ratings and items (i.e., movies) for a fair comparison.</p>
          </StatisticsCol>
          
          <StatisticsCol header="Entity type coverage">
            <img src="./coverage.png" alt="Entity type coverage" />
            <p className="small text-muted">Entities with both binary ratings and "don't know" observations are only counted as binary ratings.</p>
          </StatisticsCol>
        </Row>
      </Container>
    </>
  );
}

export default Statistics;