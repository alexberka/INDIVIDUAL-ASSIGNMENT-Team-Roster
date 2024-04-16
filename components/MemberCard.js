import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function MemberCard({ member }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="crew-image" variant="top" src={member.image ? `${member.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />
      <Card.Body>
        <Card.Title>{member.name}</Card.Title>
        <p>{member.role}</p>
        <Link href={`/member/edit/${member.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
