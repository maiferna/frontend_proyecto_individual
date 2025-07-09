import { Navigate, Route, Routes } from "react-router"
import { SearchRecipes, RecipeDetail, FavoriteRecipes, WeekMenu } from "../user/pages"
import { LoginForm, RegisterForm } from "../auth/pages"
import { LandingPage } from "../pages/LandingPage"
import { AllRecipes } from "../pages/AllRecipes"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/search' element={<SearchRecipes />} />
            <Route path='/recipe/:id' element={<RecipeDetail />} />
            <Route path='/favorites' element={<FavoriteRecipes />} />
            <Route path='/menu' element={<WeekMenu />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/recipes' element={<AllRecipes />} />
        </Routes>

    )
}
