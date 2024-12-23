import { useUser } from "../context/UserContext";
import  React, { useState, useEffect } from 'react';

interface UserData {
    username: string;
    fitnessLevel: string | null;
    weight: number | null;
  }

export const ProfilePage: React.FC = () => {

    const { currentUser }: { currentUser: { username: string } | null } = useUser();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && currentUser) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`/api/user/${currentUser.username}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                    } else {                        
                        setError("An error occurred while fetching user data");
                    }
                } catch (error) {
                    setError("An error occurred while fetching user data");
                    console.error('An error occurred:', error);

                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        } else {
            setError("No token found");
            setLoading(false);
        }
    }, [currentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
           
    return (
        <>
            <div className='centered'>
                <div>
                    <h1>{userData?.username} Profile</h1>
                </div>
                <section className='cardrow'>
                    <div className='card'>
                        <h2>My info</h2>
                        <div>
                            <p>Fitness Level: {userData?.fitnessLevel} </p>
                            <p>Weight: {userData?.weight}</p>
                            <p>Goals: {}</p>
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
