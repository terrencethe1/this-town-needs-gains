export const ProfilePage = () => {
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
