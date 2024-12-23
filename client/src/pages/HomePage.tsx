
export const HomePage = () => {
    return (
        <div className='homepage-comp'>
            {/* <img className='bg-image' src={BGImage} alt="Background image" /> */}
            {/* suggested recipes and workouts */}
            <div className='title-container'>
            <h1 className='home-title'>WELCOME TO THIS TOWN</h1>
            <p>On this website, you can create a personalized profile, keep a detailed record of your workout routines and meal plans, and track your progress every day. Our mission is to help you reach your goals in a healthy and sustainable way by providing tools and resources tailored to your fitness level. Become the best version of yourself!</p>
            </div>
           <div className='cards-container'>
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
        </div>
    );
    }
