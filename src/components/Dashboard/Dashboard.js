// Shows your user profile
// When refreshing on the page it breaks.
// Clicking on the modal takes you out of the modal

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import moment from 'moment';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

import Loader from 'react-loader-spinner';

// ACTIONS
import { getUser } from '../../actions/actions';
import { deleteUser } from '../../actions/actions';

import '../../sass/dashboard/dashboard.scss'
import HackathonModal from '../Reusable/HackathonModal';

import ProjectSubmission from '../Projects/ProjectSubmission';

import activeIcon from '../../images/active-icon.svg';
import upcomingIcon from '../../images/upcoming-icon.svg';
import finishedIcon from '../../images/finshed-icon.svg';

const Dashboard = props => {
   const dispatch = useDispatch();
   const { loading, user } = useAuth0();
   const dashboard = useSelector(state => state.userInfo);
   const currentDate = new Date().toString();
   const [tabs, setTabs] = useState({
      active: true,
      past: false
   });
   const [profileInfo, setProfileInfo] = useState({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      id: ''
   });
   const [hackathons, setHackathons] = useState([])

   useEffect(() => {
      if (dashboard?.hackathons?.length > 0) {
         setHackathons(dashboard.hackathons)
      }
   }, [dashboard?.hackathons])

   const formatDate = date => {
      const months = [
         "01",
         "02",
         "03",
         "04",
         "05",
         "06",
         "07",
         "08",
         "09",
         "10",
         "11",
         "12"
      ];
      const newDate = new Date(date);
      const y = newDate.getFullYear();
      const d = newDate.getDate();
      const m = months[newDate.getMonth()];
      return `${m}/${d}/${y}`;
   };

   const getAndSetUserHook = async () => {
      (await axiosWithAuth())
         .get(`/users/${user.id}`)
         .then(res => {
            setProfileInfo({
               first_name: res.data.first_name,
               last_name: res.data.last_name,
               username: res.data.username,
               email: res.data.email,
               id: res.data.id
            });
         })
         .catch(err => {
            console.log(err);
         });
   };

   useEffect(() => {
      if (user?.id) {
         dispatch(getUser(user.id));
         getAndSetUserHook();
      }
   }, [user]);

   const renderTableHeader = () => {
      const header = [
         'Hackathon name',
         'Location',
         'Start date',
         'End date',
         'Role',
         'Status',
         'Project submission'
      ];

      return header.map((header, i) => {
         return (
            <th key={i} className='th-header'>{header}</th>
         )
      })
   }

   const renderTableData = (hackathonStatus) => {

      return hackathonStatus.map(hackathon => {
         const statusRender = () => {
            if(moment(hackathon.start_date).isBefore(currentDate) &&
               moment(hackathon.end_date).isAfter(currentDate) ||
               moment(hackathon.start_date).isSame(currentDate) ||
               moment(hackathon.end_date).isSame(currentDate)) {
                  
                  return (
                     <div className='status-container'>
                        <img src={activeIcon} alt='green dot' />
                        <p className='status-active'>Active</p>
                     </div>
                  ) 
            }
            if(moment(hackathon.start_date).isAfter(currentDate)) {
               return (
                  <div className='status-container'>
                     <img src={upcomingIcon} alt='yellow dot'/>
                     <p className='status-upcoming'>Upcoming</p>
                  </div>
               )
            }
            if(moment(hackathon.end_date).isBefore(currentDate)) {
               return (
                  <div className='status-container'>
                     <img src={finishedIcon} alt='black dot' />
                     <p className='status-finished'>Finished</p>
                  </div>
               )
            }
         }

         return (
            <tr key={hackathon.id} className='tr-data'>
               <td className='td-hackathon-name hackathon-name-column' onClick={() => {
                  props.history.push(`/hackathon/${hackathon.hackathon_id}`)
               }}>{hackathon.hackathon_name}</td>
               <td className='td-info location-column'>{hackathon.location}</td>
               <td className='td-info start-date-column'>{formatDate(hackathon.start_date)}</td>
               <td className='td-info end-date-column'>{formatDate(hackathon.end_date)}</td>
               <td className='td-info role-column'>{hackathon.user_hackathon_role}</td>
               <td className='status-column'>{statusRender()}</td>
               <td className='submission-column'><ProjectSubmission hackathon={hackathon} /></td>
            </tr>
         )
      })
   }

   if (loading || !profileInfo) {
      return <Loader type="Rings" color="#4885E1" height={100} width={100} />
   }

   let presentHackathons = hackathons.filter(hackathon => {
      if (
         moment(hackathon.end_date).isSame(currentDate) ||
         moment(hackathon.end_date).isAfter(currentDate)
      ) {
         return hackathon;
      }
      return null;
   });

   let pastHackathons = hackathons.filter(hackathon => {
      if (moment(hackathon.end_date).isBefore(currentDate)) {
         return hackathon;
      }
      return null;
   });

   return (
      <div className='profile-wrapper'>

         <div className='top-content'>
            <div className='top-left'>
               <h1> Dashboard</h1>
            </div>
            <div className='top-right'>
               <p className={`tabs tabPresent ${tabs.active ? 'active' : ''}`} onClick={() => {
                  setTabs({
                     active: true,
                     past: false
                  })
               }}>Active & Upcoming</p>
               <p className={`tabs tabPast ${tabs.past ? 'active' : ''}`} onClick={() => {
                  setTabs({
                     active: false,
                     past: true
                  })
               }}>Past</p>
            </div>
         </div>
         <div className='logged-in-as'>
            <h3 className='bottom-left'>Logged in as: <p>{profileInfo.email}</p></h3>
         </div>
         <div className='above-table'>
            <p className={`hackathons-header ${tabs.active ? '' : 'hidden'}`}>Active & upcoming hackathons</p>
            <p className={`hackathons-header ${tabs.past ? '' : 'hidden'}`}>Past hackathons</p>
            {tabs.past ? <div className='past-div'></div> : <HackathonModal />}
         </div>
         <section className='hackathons-section'>
            <div className='profile-container'>
               {presentHackathons.length ? (
                  <table className={`table ${tabs.active ? '' : 'hidden'}`}>
                     <tbody>
                        <tr className='tr-header'>{renderTableHeader()}</tr>
                        {renderTableData(presentHackathons)}
                     </tbody>
                  </table>

               ) : <span className={`empty-hackathon-list ${tabs.active ? '' : 'hidden'}`}>Uh-oh...you’re not participating in any hackathons. Create a new hackathon or <span classname='find-one-link'><a>find one</a></span> to participate in.</span>
               }

               {pastHackathons.length ? (
                  <table className={`table ${tabs.past ? '' : 'hidden'}`} >
                     <tbody>
                        <tr className='tr-header'>{renderTableHeader()}</tr>
                        {renderTableData(pastHackathons)}
                     </tbody>
                  </table>
               ) : <p className={`empty-hackathon-list ${tabs.past ? '' : 'hidden'}`}>Uh-oh...you haven't participated in any hackathons. Create a new hackathon or <span className='find-one-link'><a>find one</a></span> to participate in.</p>
               }
            </div>
         </section>
      </div>
   );
};

export default Dashboard;
