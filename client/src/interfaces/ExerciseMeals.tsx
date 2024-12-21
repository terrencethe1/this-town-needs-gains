interface Exercise {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

interface SavedExercise {
    exerciseName: string;
    id: number;
}

// interface nutrient {
//     amount: number;
//     name: string;
//     unit: string
// }

interface Meal {
    id: number;
    image: string;
    imageType: string;
    nutrition: {
        nutrients: [
        {
            amount: number;
            name: string;
            unit: string
        },
        {
            amount: number;
            name: string;
            unit: string
        },
        {
            amount: number;
            name: string;
            unit: string
        },
        {
            amount: number;
            name: string;
            unit: string
        }
    ]}
    title: string
}

export type { Exercise, Meal, SavedExercise } 