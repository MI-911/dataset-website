import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import StatisticsCol from '../components/StatisticsCol';
import longTail from '../statistics/long-tail.png';
import coverage from '../statistics/coverage.png';

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

      <Container>
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
    </>
  );
}

export default Statistics;