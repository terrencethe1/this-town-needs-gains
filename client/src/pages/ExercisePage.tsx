import { useState, useEffect } from "react"
import Dropdown from "react-bootstrap/Dropdown"
// import { render } from "react-dom"

export const ExercisePage = () => {
    // TODO: Create functions to:
    // Fetch exercise data and put it into workout objects to be displayed below
    const [exerciseSearch, setExerciseSearch] = useState('')

    const renderExerciseData = () => {
        // Fetch and display data from exercise API when function is implemented
        {
            if (exerciseSearch === '') {
                return (
                    <>
                        <h2>Search for exercises by muscle group!</h2>
                    </>
                );
            } else {
                return (
                    <>
                        <div className='card'>
                            <h2></h2>
                            <div>
                                <p>{exerciseSearch}</p>
                                {/* This is where the exercise data will be displayed*/}
                            </div>
                        </div>
                    </>
                )
            }
        }
    }

    useEffect(() => {
        renderExerciseData();
    }, [exerciseSearch])
    const searchDropdown = () => {
        // Basic dropdown menu structure from https://react-bootstrap.netlify.app/docs/components/dropdowns/
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Muscle Groups
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('Chest') }}>Chest</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('Back') }}>Back</Dropdown.Item>
                    <Dropdown.Item className='dropdownitem' onClick={() => { setExerciseSearch('Legs') }}>Legs</Dropdown.Item>
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
                    <div className='centered'>
                        {searchDropdown()}
                        {renderExerciseData()}

                    </div>
                </div>
            </div>
        </>
    );
}