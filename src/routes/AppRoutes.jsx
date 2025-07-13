import { Navigate, Route, Routes } from "react-router"
import { SearchRecipes, RecipeDetail, FavoriteRecipes, WeekMenu } from "../user/pages"
import { LoginForm, RegisterForm } from "../auth/pages"
import { PrivateRoute } from "./PrivateRoute"
import { AllRecipes, LandingPage } from "../pages"
import { CreateRecipe, Dashboard, EditRecipe} from "../admin/pages"



export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/search' element={
                <PrivateRoute allowedRoles={["user"]}>
                    <SearchRecipes />
                </PrivateRoute>
            } />
            <Route path='/recipe/:id' element={<RecipeDetail />} />
            <Route path='/favorites' element={
                <PrivateRoute allowedRoles={["user"]}>
                    <FavoriteRecipes />
                </PrivateRoute>
            } />
            <Route path='/menu' element={
                <PrivateRoute allowedRoles={["user"]}>
                    <WeekMenu />
                </PrivateRoute>
            } />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/recipes' element={<AllRecipes />} />
            <Route path='/dashboard' element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <Dashboard />
                </PrivateRoute>
            } />
            <Route path='/create/recipe' element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <CreateRecipe />
                </PrivateRoute>
            }/>
            <Route path='/edit/recipe/:id' element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <EditRecipe />
                </PrivateRoute>
            }/>
           {/*  <Route path='/manage/user' element={
                <PrivateRoute allowedRoles={["admin"]}>
                    <ManageUsers />
                </PrivateRoute>
            }/> */}
        </Routes>
    )
}
