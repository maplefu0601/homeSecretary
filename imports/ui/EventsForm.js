import React, { Component } from 'react';
import { Row, Col, Card, CardDeck, Table, ProgressBar } from 'react-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventsForm = ({ data }) => {
  return (
    <Card bg="light">
      <Card.Body>
        <Card.Title>
          Events <FontAwesomeIcon icon={faCalendarAlt} />
        </Card.Title>
        <Row
          style={{ minHeight: '700px', maxHeight: '700px', overflow: 'scroll' }}
        >
          {data.map((m) => (
            <Col xs={12} key={m._id}>
              <Card
                bg="secondry"
                style={{
                  width: '700px',
                  height: '300px',
                  overflow: 'scroll',
                  margin: '0 10px 15px 0',
                }}
                key={m._id}
              >
                <Card.Header>{m.name}</Card.Header>
                <Table>
                  <tbody>
                    <tr>
                      <td>Content: </td>
                      <td className="col-md-3">{m.content}</td>
                    </tr>
                    <tr>
                      <td>Progress: </td>
                      <td>
                        <ProgressBar
                          style={{ marginTop: '5px' }}
                          animated
                          now={m.progress * 100}
                          label={`${m.progress * 100}%`}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>CreatedBy: </td>
                      <td>{m.createdBy}</td>
                    </tr>
                  </tbody>
                </Table>

                <Card.Footer>Created At: {m.createdAt}</Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EventsForm;
