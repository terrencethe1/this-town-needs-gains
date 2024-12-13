export const MealsPage = () => {
    return (
        <>
            <div className='centered'>
                <div>
                    <h1>My Meals</h1>
                </div>
                <section className='cardrow'>
                    <div className='card'>
                        <h2>Breakfast</h2>
                        <div>
                            <p>Breakfasts</p>
                            {/* This is where the recipe data will be displayed*/}
                        </div>
                    </div>
                    <div className='card'>
                        <h2>Lunch</h2>
                        <div>
                            <p>Lunches</p>
                            {/* This is where the recipe data will be displayed*/}
                        </div>
                    </div>
                    <div className='card'>
                        <h2>Dinner</h2>
                        <div>
                            <p>Dinners</p>
                            {/* This is where the recipe data will be displayed*/}
                        </div>
                    </div>
                </section>
                <div>
                    <h1>Suggested Recipes</h1>
                    <div className='centered'>
                        {/* {searchDropdown()}
                        {renderExerciseData()} */}

                    </div>
                </div>
            </div>
        </>
    );
    }