import React from 'react';
import { Card, Col } from 'react-bootstrap';

const StatisticsCol = (props) => {
    return (
      <Col>
        <Card>
          <Card.Header>
            {props.header}
          </Card.Header>
          <Card.Body style={{'text-align': 'center'}}>
            {props.children}
          </Card.Body>
        </Card>
      </Col>
    );
};

export default StatisticsCol;