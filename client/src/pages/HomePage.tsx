
export const HomePage = () => {
    return (
        <div className='centered'>
            {/* suggested recipes and workouts */}
           <h1>Welcome to the town!</h1>
           <div className='wideCard'>
            {/* Suggested workout will be displayed here */}
            <h2>Daily Workout</h2>
            <h3>Muscle Group:</h3>
            <h3>Intensity:</h3>
           </div>
           <div className='wideCard'>
            {/* Suggested recipe will be displayed here */}
            <h2>Daily Recipe</h2>
           </div>
        </div>
    );
    }
