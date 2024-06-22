import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../index';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Application = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [resume, setResume] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isAuthorized || (user && user.role === 'Employer')) {
      navigateTo('/');
    }
  }, [isAuthorized, user, navigateTo]);

  const handleFileChange = (e) => {
    const resumeFile = e.target.files[0];
    setResume(resumeFile);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);
    formData.append('jobId', id);

    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/application/post', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setResume(null);
      setCoverLetter('');
      toast.success(data.message);
      navigateTo('/job/getall');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    }
  };

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <textarea
            placeholder="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
          <div>
            <label
              style={{ textAlign: 'start', display: 'block', fontSize: '20px' }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: '100%' }}
              required
            />
          </div>
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
