import { useState, useEffect } from "react";
import { SavedExercise } from "../interfaces/ExerciseMeals";

export const ProfilePage = () => {

    const [exerciseArr, setExerciseArr] = useState<SavedExercise[]>([])
    // TODO: Create function to get exercises from db and display them on page
    const getExercises = async () => {
        try {
            const response = await fetch('/api/exercises', 
                {
                    method: 'GET'
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
                    <h1>User Profile</h1>
                </div>
                <section className='cardrow'>
                    <div className='card'>
                        <h2>My info</h2>
                        <div>
                            <p>Fitness Level:</p>
                            <p>Weight:</p>
                            <p>Training Style:</p>
                        </div>
                        {/* This is where the exercise data will be displayed*/}
                    </div>
                    <div className='card'>
                        <h2>My exercise goals</h2>
                        <div>
                            <p>Personal Bests</p>
                            <h3 className="pr">Squat:</h3>
                            <h3 className="pr">Bench:</h3>
                            <h3 className="pr">Deadlift:</h3>
                            <p>Target Weight:</p>
                        </div>
                    </div>
                    <div className='shortcard'>
                        <h2>Nutrition Goals</h2>
                        <p>
                            Calories:
                        </p>
                        <p>
                            Protein:
                        </p>
                        <p>
                            Fats:
                        </p>
                        <p>
                            Carbs:
                        </p>
                    </div>
                </section>
                <div>
                    <h1>Saved Exercises</h1>
                    <div className='centered'>
                        <section className='cardrow'>
                            <div className='card'>
                                <div>
                                    {exerciseArr && exerciseArr.length > 0
                                    ? 
                                    exerciseArr.map((exercise) => (
                                        <p>{exercise.exerciseName}</p>
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
                                <p>Breakfasts</p>
                                {/* This is where the recipe data will be displayed*/}
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    );;
}

{/* <div className='card'>
    <h2>Pull</h2>
    <div>
        <p>Back and biceps</p>
       
    </div>
</div>
<div className='card'>
    <h2>Legs</h2>
    <div>
        <p>Quads, hammies and glutes</p>
        
    </div>
</div> */}
{/* <div className='card'>
    <h2>Lunch</h2>
    <div>
        <p>Lunches</p>
        
    </div>
</div>
<div className='card'>
    <h2>Dinner</h2>
    <div>
        <p>Dinners</p>
       
    </div>
</div> */}