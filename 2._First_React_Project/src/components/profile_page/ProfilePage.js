import React, { Component } from 'react';
// import IMG from './images/logo512.png';

import Profile from './Profile';

export default class ProfilePage extends Component{
    render(){
        const profileContent = {name: 'Mathilde', hobby: 'Food'};
        const profileContent2 = {name: 'Elisabeth', hobby: 'Plants'};
        const profileContent3 = {name: 'Ekaterina', hobby: 'Plants also'};

        const profiles = [profileContent, profileContent2, profileContent3];

        return(
            <div>
                <h1>Profile Page</h1>
                {/* <Profile name={'Mathilde'} hobby={'plants'} profile={{name:'Sidsel', hobby:'Food'}} /> */}
                {/* <Profile profile={profileContent} />
                <Profile profile={profileContent2} />
                <Profile profile={profileContent3} /> */}
                {/* <img src={IMG} alt=""/> */}

                {/* MAP LOOP */}
                {profiles.map((singleprofile, i) =>{
                    return( <Profile key={'profile'+i} profile={singleprofile} />);
                })
                }

            </div>
        );
    }
}

// export default ProfilePage;