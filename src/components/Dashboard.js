import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SvgIcon from '@material-ui/icons/Add';

import Events from './Events';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <h3>Dashboard</h3>
            {/* <div className='createEventButton'>
                <SvgIcon id='addIcon' component={AddIcon} style={{ fontSize: 300 }}></SvgIcon>
                <div id='createEventButtonText'>Create Event</div>
            </div> */}
            <div className='eventsList'>
                <div className='createEventButton' onClick={console.log('create event button was clicked')}>
                    <SvgIcon id='addIcon' component={AddIcon} style={{ fontSize: 300 }}></SvgIcon>
                    <div id='createEventButtonText'>Create Event</div>
                </div>
                <Events/>
            </div>
        </div>
    )
}

export default Dashboard;