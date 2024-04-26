/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { newUser, updateUser } from '../../api/userData';

const initialState = {
  name: '',
  image: '',
  email: '',
};

function UserForm({ userObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (userObj.id) setFormData(userObj);
  }, [userObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userObj.id) {
      updateUser(formData)?.then(() => router.push('/'));
    } else {
      newUser({ ...formData, uid: user.uid })?.then(onUpdate);
    }
  };

  return (
    <Form className="forms" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={formData.image}
          placeholder="Enter your image url"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {userObj.id ? 'Update Profile' : 'Create Profile'}
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};
UserForm.defaultProps = {
  userObj: initialState,
};

export default UserForm;
