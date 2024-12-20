import AuthService from '../utils/auth';
import { retrieveUser } from '../api/userApi';
import { useState, useEffect } from 'react';
import { UserData } from '../interfaces/UserData';

export const ProfilePage = () => {
    
    console.log(AuthService.getProfile());
    const username = AuthService.getProfile().username;
    console.log(username);

    const [user, setUser] = useState<UserData>();

    const fetchUser = async () => {
      try {
        const data = await retrieveUser(username);
        setUser(data);
      } catch (err) {
        console.error('Failed to retrieve volunteers', err);
      }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    console.log(user?.fName);

    // retrieveUser(username).then((user) => {
    //     console.log(user);
    //     const fName = user.fName;
    // })

    // console.log(fName);

    return (
        <>
            <div className='centered'>
                <div>
                    <h1>User Profile: { user?.fName } { user?.lName }</h1>
                </div>
                <section className='cardrow'>
                    <div className='card'>
                        <h2>My info</h2>
                        <div>
                            <p>Username: {user?.username}</p>
                            <p>Fitness Level: {user?.fitnessLevel}</p>
                            <p>Weight: {user?.weight}</p>
                            <p>Training Style: {user?.exercisePreferences}</p>
                            <p>Age: {user?.age}</p>
                            <p>Gender: {user?.gender}</p>
                        </div>
                        {/* This is where the exercise data will be displayed*/}
                    </div>
                    <div className='card'>
                        <h2>My goals</h2>
                        <div>
                            <p>Personal Bests</p>
                                <h3 className="pr">Squat:</h3>
                                <h3 className="pr">Bench:</h3>
                                <h3 className="pr">Deadlift:</h3>
                            <p>Target Weight:</p>
                            <p>Nutrition Goals:</p>
                            <p>Fitness Goals: {user?.fitnessGoals}</p>
                        </div>
                    </div>
                </section>
                <div>
                    <h1>Make a plan</h1>
                    <div className='centered'>
                        {/* {searchDropdown()}
                            {renderExerciseData()} */}

                    </div>
                </div>
            </div >
        </>
    );;
}
