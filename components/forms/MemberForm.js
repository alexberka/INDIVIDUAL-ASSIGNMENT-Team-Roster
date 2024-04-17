import React, { useEffect, useState } from 'react';
import {
  Button,
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createMember, updateMember } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

const emptyObject = {
  name: '',
  image: '',
  role: '',
};

export default function MemberForm({ member }) {
  const [formInput, setFormInput] = useState(emptyObject);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (member.firebaseKey) setFormInput(member);
  }, [member, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (member.firebaseKey) {
      updateMember(formInput).then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{member.firebaseKey ? 'Update' : 'Add'} Crew Member</h2>

      <FloatingLabel controlId="crewMember" label="Crew Member" className="mb-3">
        <Form.Control
          type="text"
          placeholder=""
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="crewImage" label="Image URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder=""
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Role">
        <Form.Select
          aria-label="Crew Role"
          name="role"
          onChange={handleChange}
          className="mb-3"
          value={formInput.role}
          required
        >
          <option value="">Select a Role</option>
          <option value="Director">Director</option>
          <option value="First Assistant Director">First Assistant Director</option>
          <option value="Director of Photography">Director of Photography</option>
          <option value="Editor">Editor</option>
          <option value="Production Designer">Production Designer</option>
          <option value="Costume Designer">Costume Designer</option>
          <option value="Production Sound Mixer">Production Sound Mixer</option>
          <option value="Chief Lighting Technician">Chief Lighting Technician</option>
          <option value="Composer">Composer</option>
          <option value="Stunt Coordinator">Stunt Coordinator</option>
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{member.firebaseKey ? 'Update' : 'Add'} Crew Member</Button>
    </Form>

  );
}

MemberForm.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  member: emptyObject,
};
