import React, { Component } from 'react';
import { Row, Col, Card, CardDeck, Table, ProgressBar } from 'react-bootstrap';
import {
  faCalendarAlt,
  faEdit,
  faTrashAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventsForm = ({ dataEvents, updateData, deleteData }) => {
  console.log(dataEvents);
  const onEdit = (m) => {
    console.log('edit:', m);
    updateData('event', m);
  };

  const onDelete = (m) => {
    console.log('delete:', m);
    deleteData('event', m);
  };

  const isDone = (progress) => {
    return progress * 100 >= 100;
  };
  return (
    <Card bg="secondary">
      <Card.Body>
        <Card.Title>
          Events <FontAwesomeIcon icon={faCalendarAlt} />
        </Card.Title>
        <Row
          style={{ minHeight: '700px', maxHeight: '700px', overflow: 'scroll' }}
        >
          {dataEvents.map((m) => (
            <Col xs={12} key={m._id}>
              <Card
                bg="secondry"
                style={{
                  width: '700px',
                  height: '350px',
                  overflow: 'scroll',
                  margin: '0 10px 15px 0',
                }}
                key={m._id}
              >
                <Card.Header>
                  {m.name}
                  <span style={{ float: 'right' }}>
                    <FontAwesomeIcon
                      onClick={() => onEdit(m)}
                      icon={faEdit}
                      className="mr-2"
                    />
                    <FontAwesomeIcon
                      onClick={() => onDelete(m)}
                      icon={faTrashAlt}
                    />{' '}
                  </span>
                </Card.Header>
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
                        {isDone(m.progress) && (
                          <div
                            style={{
                              color: 'red',
                              fontSize: '64px',
                              display: 'flex',
                              justifyContent: 'center',
                              marginTop: '-45px',
                            }}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </div>
                        )}
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
