import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React, { Component } from 'react';
import "./EventDescriptionPage.css";
import "./Dashboard.css";
import { getinfo, getevent } from '../helpers/connector';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
  
function EventDescriptionPage() {
  const navigate = useNavigate();
    return (
      <div className = "App">
        <header className="App-header">
        {/* this page should only contain event information, so no input box */}
          <p>Event Description</p>
          <form className="loginForm">
              <div className="desName">
                <label htmlFor='title'>Event title :</label>
                {/* <input size={54.5} onChange={formik.handleChange} value={formik.values.title} id='title' name='title'></input> */}
              </div>

              <div className="desName">
                <label htmlFor ='host'>Event host : </label>
                {/* <input size={55} onChange={formik.handleChange} value = {formik.values.email} id='email' name='email'></input> */}
              </div>

              <div className="desName">
                <label htmlFor ='date'>Event date : </label>
                {/* <input size={55} onChange={formik.handleChange} value = {formik.values.time} id='time' name='date'></input> */}
              </div>

              <div className="desName">
                <label htmlFor ='location'>Event location : </label>
                {/* <input size={51} onChange={formik.handleChange} value = {formik.values.location} id='location' name='location'></input> */}
              </div>

              <div className="desName">
                <label htmlFor ='description'>Event description : </label>
                {/* <input size={48} onChange={formik.handleChange} value = {formik.values.description} id='description' name='description'></input> */}
              </div>

              <button className="button" disabled={false}>RSVP</button>              
              <button className="button" >Status</button>
              <Link to = "/AttendeeListPage">
                <button className="button">Attendee List</button>
              </Link>
              <Link to = "/HostManagementPage">
                <button className="button">Host Management</button>
              </Link>
              <Link to = "/Dashboard">
                  <button className="button">Dashboard</button>
              </Link>
          </form>
        </header>
      </div>
    );
}

export default EventDescriptionPage;