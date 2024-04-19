import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MemberCard from '../../components/MemberCard';
import { getMembers } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

export default function SearchMembers() {
  const [searchedMembers, setSearchedMembers] = useState([]);
  const { user } = useAuth();

  const router = useRouter();
  const { searchTerm } = router.query;

  const displayMembers = () => {
    getMembers(user.uid).then((members) => {
      const matched = members.filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchedMembers(matched);
    });
  };

  useEffect(() => {
    displayMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <h3>Showing {searchedMembers.length} {searchedMembers.length === 1 ? 'result' : 'results'} for &quot;{searchTerm}&quot;</h3>
      <div>
        <div className="team-display d-flex flex-wrap">
          {searchedMembers.map((member) => (
            <MemberCard key={member.firebaseKey} member={member} onUpdate={displayMembers} />
          ))}
        </div>
      </div>
    </>
  );
}
