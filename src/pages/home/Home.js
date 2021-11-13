import { useFetch } from '../../hooks/useFetch';

import './Home.css';

import RecipeList from '../../components/RecipeList';

export default function Home() {
    const { data, isPending, error } = useFetch('http://localhost:3000/recipes');
    // const { data, isPending, error } = useFetch('https://parseapi.back4app.com/classes/Recipe');
    // console.log(data);
    
    return (
        <div className="home">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    );
}