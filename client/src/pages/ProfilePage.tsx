
import React, { useState, useEffect } from "react";
import { SavedExercise } from "../interfaces/ExerciseMeals";
import AuthService from '../utils/auth';
import { retrieveUser } from '../api/userApi';
import { UserData } from '../interfaces/UserData';

export const ProfilePage: React.FC = () => {



    const userId = AuthService.getProfile().id;


    const [user, setUser] = useState<UserData>();

    const fetchUser = async () => {
      try {
        const data = await retrieveUser(userId);
        setUser(data);

      } catch (err) {
        console.error('Failed to retrieve user', err);
      }
    };

    useEffect(() => {
        fetchUser();
    }, []);



    const [exerciseArr, setExerciseArr] = useState<SavedExercise[]>([])
    // TODO: Create function to get exercises from db and display them on page
    const getExercises = async () => {
        try {
            const response = await fetch('/api/exercises', 
                {
                    method: 'GET',
                    headers: {
                        'userId': `${userId}`
                    }
                }
            )
            if (!response.ok) {
                throw new Error(`invalid API response, check network tab! Status: ${response.status}`);
            }
            const data = await response.json()
            setExerciseArr(data);
        } catch (error: any) {
            console.error('Could not retrieve exercises!')
        }
    }

    useEffect(() => {
        getExercises()
    }, [])

 
    return (
        <>
            <div className='centered'>
                <div>
                    <h1>User Profile: { user?.firstName } { user?.lastName }</h1>
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
                </section>
                <div>
                    <h1>Saved Exercises</h1>
                    <div className='centered'>
                        <section className='cardrow'>
                            <div className='card'>
                                <div key={userId}>
                                    {exerciseArr && exerciseArr.length > 0
                                    ? 
                                    exerciseArr.map((exercise) => (
                                        <>
                                        <p key={exercise.id}>{exercise.exerciseName}</p>
                                        </>
                                    ))
                                    
                                    :
                                    
                                    <p>No exercises yet!</p>
                                    }
                                    
                                </div>
                            </div>
                        </section>
                        <h1>Saved Recipes</h1>
                        <div className='card'>
                            <div>
                                <p>Meals</p>
                                {/* This is where the recipe data will be displayed*/}
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    );;
}

