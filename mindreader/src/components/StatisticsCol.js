import React from 'react';
import { Card, Col } from 'react-bootstrap';

const StatisticsCol = (props) => {
    return (
      <Col className="mt-2">
        <Card>
          <Card.Header>
            {props.header}
          </Card.Header>
          <Card.Body style={{'textAlign': 'center'}}>
            {props.children}
          </Card.Body>
        </Card>
      </Col>
    );
};

export default StatisticsCol;