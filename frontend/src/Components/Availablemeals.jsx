import { useEffect, useState } from "react";
import Mealitems from "./Mealitems";
import Usehttp from "./Usehttp.jsx";
import Error from "./Error.jsx";
const reqconfig = {};
export default function Availablemeals() {
  // const [meals, setmeals] = useState([]);
  // useEffect(() => {
  //   async function Fetchmeals() {
  //     const meal = await fetch("http://localhost:3000/meals");
  //     if (!meal.ok) {
  //     }
  //     const finalmeal = await meal.json();
  //     setmeals(finalmeal);
  //   }
  //   Fetchmeals();
  // }, []);

  const {
    data: meals,
    loading,
    error,
  } = Usehttp("http://localhost:3000/meals", reqconfig, []);
  if (loading) {
    return <p className="center">Fetching meals</p>;
  }
  if (error) {
    return <Error title="failed to fetch meals" message={error} />;
  }
  console.log(meals);

  return <Mealitems foods={meals} />;
}
