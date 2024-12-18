import { useState, useEffect } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import type Exercise from "../interfaces/Exercise"
// const apiKey = import.meta.env.RAPID_NINJA_API_KEY
// import { render } from "react-dom"

export const ExercisePage = () => {
    // TODO: Create functions to:
    // Fetch exercise data and put it into workout objects to be displayed below
    const [exerciseSearch, setExerciseSearch] = useState('')
    let [exercises, setExercises] = useState<Exercise[]>([])

    const saveExercise = async (exercise: string) => {
        console.log(exercise, typeof exercise)
        try {
            const response = await fetch('/api/exercises', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'text; charset=utf-8',
                    },
                body: `"exerciseName": ${exercise}`
            }
        )
        const data = response.json()
        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        }
        console.log(data);
        return data
         } catch (error: any) {

        }
    }

    const fetchExerciseData = async () => {
        try {
            const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${exerciseSearch}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '15f2fdcd96mshe1b1810b30ba3b6p1c3c00jsn189315c1b851',
                    'x-rapidapi-host': 'exercises-by-api-ninjas.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('invalid API response, check the network tab');
            }
            const result = await response.json();
            console.log('Data:', result);
            return result
        } catch (error) {
            console.error(error);
        }
        // const response = await fetch(
        //     `https://api.api-ninjas.com/v1/exercises?muscle=${exerciseSearch}`,
        //     {
        //         headers: {
        //             'X-Api-Key': `${import.meta.env.NINJA_API_KEY}`
        //         }
        //     }
        // )
        // Fetch and display data from exercise API when function is implemented
    }
    // const renderExerciseData = async () => {
    //     {
    //         if (exerciseSearch === '') {
    //             return (
    //                 <>
    //                     <h2>Search for exercises by muscle group!</h2>
    //                 </>
    //             );
    //         } else {
    //             return (exercises.map((exercise, index) => (
    //                 <div className='card' key={index}>
    //                     <div>
    //                         <p>{exerciseSearch}</p>
    //                         {/* This is where the exercise data will be displayed*/}
    //                         <p>{exercise.name}</p>
    //                         <p>{exercise.difficulty}</p>
    //                         <p>{exercise.instructions}</p>
    //                     </div>
    //                 </div>
    //             )
    //             ))
    //         }
    //     }

    // }

    useEffect(() => {
        console.log(exerciseSearch)
        fetchExerciseData().then((data) => {
            setExercises(data)
        })
    }, [exerciseSearch])
    const searchDropdown = () => {
        // Basic dropdown menu structure from https://react-bootstrap.netlify.app/docs/components/dropdowns/
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Muscle Groups
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('abdominals') }}>Abdominals</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('abductors') }}>Abductors</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('adductors') }}>Adductors</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('biceps') }}>Biceps</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('calves') }}>Calves</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('chest') }}>Chest</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('forearms') }}>Forearms</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('glutes') }}>Glutes</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('hamstrings') }}>Hamstrings</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('lats') }}>Lats</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('lower_back') }}>Lower Back</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('middle_back') }}>Middle Back</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('neck') }}>Neck</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('quadriceps') }}>Quads</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('traps') }}>Traps</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('triceps') }}>Triceps</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
        );
    }
    return (
        <>
            <div className='centered'>
                <div>
                    <h1>My Workouts</h1>
                </div>
                <section className='cardrow'>
                    <div className='card'>
                        <h2>Push</h2>
                        <div>
                            <p>Chest, shoulders, and triceps</p>
                            {/* This is where the exercise data will be displayed*/}
                        </div>
                    </div>
                    <div className='card'>
                        <h2>Pull</h2>
                        <div>
                            <p>Back and biceps</p>
                            {/* This is where the exercise data will be displayed*/}
                        </div>
                    </div>
                    <div className='card'>
                        <h2>Legs</h2>
                        <div>
                            <p>Quads, hammies and glutes</p>
                            {/* This is where the exercise data will be displayed*/}
                        </div>
                    </div>
                </section>
                <div>
                    <h1>Search exercises by muscle group</h1>
                    {searchDropdown()}
                    <div className='exercisecardrow centered'>
                        {exercises && exercises.length > 0
                            ?
                            exercises.map((exercise, index) => (
                                <div className='wideCard' key={index}>
                                    <div>
                                        <p>{exerciseSearch}</p>
                                        {/* This is where the exercise data will be displayed*/}
                                        <p>{exercise.name}</p>
                                        <p>{exercise.difficulty}</p>
                                        <p>{exercise.instructions}</p>
                                        <button onClick={() => {
                                            saveExercise(exercise.name)
                                        }}>Save Exercise</button>
                                    </div>
                                </div>
                            )
                            )
                            : <h2>No exercises searched yet!</h2>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}