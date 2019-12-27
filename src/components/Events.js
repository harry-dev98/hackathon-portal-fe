// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';

// import { getHackathons, FETCH_HACKERS } from '../actions/actions';

// const Events = (props) => {

//   let events = [
//     {
//       name: 'Hackathon event'
//     },
//     {
//       name: 'Hackathon event 2'
//     }
//   ];

//     // useEffect(() => {
//     //     props.getHackathons();
//     //     console.log(props.hackers);
//     //   }, []);

//     //   if (props.isFetching) {
//     //     return <h2>Loading Events...</h2>;
//     //   }

//       return(
//             <div>
//                 {props.error && <p>{props.error}</p>}
//                 {events.map(e => (
//                   <div className='event'>
//                     <img className="eventImage" src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/111239456/original/36b18829fd273c87ea74e1c112137e21ba6a4530/create-pixel-art-of-any-kind.png'></img>
//                     <div className="eventName">{e.name}</div>
//                   </div>
//                 ))}
//             </div>
//       );
// }

// const mapStateToProps = state => {
//     return {
//         hackathons: state.hackathons,
//       isFetching: state.isFetching,
//       error: state.error
//     };
//   };

// export default connect(mapStateToProps,
//     { getHackathons }
//   )(Events);

  
import React from 'react';

let events = [
    {
        name: 'AEventTestst',
        url: 'data:image/png;base64,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'
    },
    {
        name: 'BestEventEver',
        url: 'data:image/png;base64,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'
    },
    {
        name: 'CrazyCoders',
        url: 'data:image/png;base64,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'
    },
    {
        name: 'DangerouslyCoding',
        url: 'data:image/png;base64,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'
    }
]

const Events = () => {
    return(
        events.map(e => {
            return (
                <div className='event'>
                    <img className="eventImage" src={e.url}></img>
                    <div className="eventName">{e.name}</div>
                </div>
            )
        })
    )
};

export default Events;