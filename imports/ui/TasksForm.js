import React, { Component } from 'react';
import { Row, Col, Card, CardGroup, Table, ProgressBar } from 'react-bootstrap';
import {
  faTasks,
  faEdit,
  faTrashAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TasksForm = ({ dataTasks, updateData, deleteData }) => {
  const onEdit = (m) => {
    console.log('edit:', m);
    updateData('task', m);
  };

  const onDelete = (m) => {
    console.log('delete:', m);
    deleteData('task', m);
  };

  const isDone = (progress) => {
    return progress * 100 >= 100;
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Tasks <FontAwesomeIcon icon={faTasks} />
        </Card.Title>
        <Row
          style={{ minHeight: '700px', maxHeight: '700px', overflow: 'scroll' }}
        >
          {dataTasks.map((m) => (
            <Col xs={6} key={m._id}>
              <Card
                bg="secondry"
                key={m._id}
                style={{ width: '350px', height: '350px', overflow: 'scroll' }}
              >
                <Card.Header>
                  {m.title}
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
                      <td>{m.content}</td>
                    </tr>
                    <tr>
                      <td>Progress: </td>
                      <td>
                        <ProgressBar
                          style={{ marginTop: '5px' }}
                          variant="secondary"
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

export default TasksForm;
