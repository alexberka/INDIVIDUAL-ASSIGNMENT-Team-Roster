import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';

export default function Team() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const displayMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    displayMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <h1>Team</h1>
      <Link href="/new" passHref>
        <Button>Add Crew Member</Button>
      </Link>
      <div className="team-display d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} member={member} onUpdate={displayMembers} />
        ))}
      </div>
    </div>
  );
}
