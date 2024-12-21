import { useState } from "react"
import type { Meal } from "../interfaces/ExerciseMeals"

export const MealsPage = () => {

    const [calories, setCalories] = useState<number>(0)
    const [carbs, setCarbs] = useState<number>(0)
    const [fats, setFats] = useState<number>(0)
    const [protein, setProtein] = useState<number>(0)
    const [meal, setMeal] = useState<string>('')
    const [meals, searchMeals] = useState<Meal[]>([])
    const searchRecipes = () => {
        return (
            <>
                <label>Calories (kCal):</label><input type='number' min='0' value={calories} onChange={(e) => setCalories(Number(e.target.value))}></input>
                <label>Carbs (g)</label><input type='number' min='0' value={carbs} onChange={(e) => setCarbs(Number(e.target.value))}></input>
                <label>Fats (g)</label><input type='number' min='0' onChange={(e) => setFats(Number(e.target.value))}></input>
                <label>Protein (g)</label><input type='number' min='0' onChange={(e) => setProtein(Number(e.target.value))}></input>
                <label>Meal</label><input type='text' placeholder='Word Search' onChange={(e) => setMeal(e.target.value)}></input>
                <button onClick={() => { fetchMeals() }}>Search</button>
            </>
        )
    }

    // useEffect(() => {
    //         console.log(searchMeals)
    //         fetchMeals().then((data) => {
    //             searchMeals(data)
    //         })
    //     }, [meals]) 
    const fetchMeals = async () => {
        // Use Spoonacular API to get recipes based on carbs, fats and proteins

        // Code copied from Spoonacular API snippet
        const url = `https://api.apilayer.com/spoonacular/recipes/complexSearch?query=${meal}&maxCalories=${calories}&maxFats=${fats}&maxCarbs=${carbs}&maxProtein=${protein}`
        const options = {
            method: 'GET',
            headers: {
                "apikey": "LIAqf6XmufJMTYrx2vW5Xst3LjtJPiGL"
            }
        }
        const getMeals = await fetch(url, options)
    //  &maxCalories=${calories}&maxFats=${fats}&maxCarbs=${carbs}&maxProtein=${protein}
        const mealData = await getMeals.json()
        console.log('meals:', mealData)
        searchMeals(mealData.results)
        // .then(response => {response.json()})
        // .then(result => {console.log(result); return result})
        // .catch(error => console.log('error', error));
    }

    const saveMeal = async (meal: Meal) => {
        
        try {
            const response = await fetch('/api/meals', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify({mealName: meal, ingredients: "", calories: meal.nutrition.nutrients[0], protein: meal.nutrition.nutrients[1], carbs: meal.nutrition.nutrients[2], fat: 0}),
        });
        
        if (!response.ok) {
            throw new Error(`invalid API response, check network tab! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data, 'okay!');
        return data
         } catch (error: any) {
            console.error('There is an error saving meal', error);

        }
    }
    return (
        <>
            <div className='centered'>
                <h1>Search Recipes</h1>

                {searchRecipes()}
                {
                    meals && meals.length > 0
                        ?
                        meals.map((meal, index) => (
                            
                            <div className='wideCard' key={index}>
                                <div>
                                    <p>{meal.title}</p>
                                    {meal.nutrition.nutrients.map((nutrient, idx2) => {
                                        return <p key={index + idx2 + 100}>{nutrient.name}: {nutrient.amount}</p>
                                    })}
                                    <button onClick={() => {
                                        saveMeal(meal);
                                        // return (
                                        // <>
                                        //     <h1>Exercise Saved!</h1>
                                        // </>
                                        // )
                                    }}>Save Recipe</button>
                                </div>
                            </div>
                        )
                        )
                        : <h2>No meals searched yet!</h2>


                }
            </div>
        </>
    );
}
{/* <div className='shortcard'>
    <h1>Nutrition Goals</h1>
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
</div> */}
{/* <div>
    <h1>My Meals</h1>
</div> */}
{/* <section className='cardrow'>
    <div className='card'>
        <h2>Breakfast</h2>
        <div>
            <p>Breakfasts</p>
            
        </div>
    </div>
    <div className='card'>
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
    </div>
</section> */}