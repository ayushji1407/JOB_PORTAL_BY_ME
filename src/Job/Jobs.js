import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/job/getall', {
          withCredentials: true,
        });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo('/login');
    }
  }, [isAuthorized, navigateTo]);

  return (
    <>
      <section className='jobs page'>
        <div className='container'>
          <h1>All Available Jobs</h1>
          <div className='banner'>
            {jobs.length > 0 ? (
              jobs.map((element) => (
                <div className='card' key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              ))
            ) : (
              <p>No jobs available</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
