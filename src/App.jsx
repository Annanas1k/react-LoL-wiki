import { MainLayout } from "./components/Layout/MainLayout"
import { HomePage } from "./pages/HomePage/HomePage"
import { Routes, Route } from "react-router"
import {ChampionPage} from './pages/ChampionPages/ChampionPage'
import { ChampionDetails } from "./pages/ChampionPages/ChampionDetails"
import {Login} from './pages/auth/Login'
import {Register} from './pages/auth/Register'
import {Test} from './pages/test/Test'


import "./App.css"
import { UserProfile } from "./pages/auth/Profile"
import { ProtectedRoute } from "./components/Layout/ProtectedRoute"
import { NotFound } from "./pages/NotFound/NotFound"
import { ItemsPage } from "./pages/ItemsPage/ItemsPage"
import { RunesPage } from "./pages/RunesPage/RunesPage"
import { RunePathPage } from "./pages/RunesPage/RunesPathPage"
function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/items"  >
          <Route index  element={<ItemsPage />}/>
          <Route path=":section"  element={<ItemsPage />}/>
        </Route>

        <Route path="/champions">
          <Route index element={<ChampionPage />}/>
          <Route path=":championId"  element={<ChampionDetails />}/>
        </Route>

        <Route path="/runes">
          <Route index element={<RunesPage />} />
          <Route path=":pathId" element={<RunePathPage />} />
          <Route path=":pathId/:runeName" element={<RunePathPage />} />
        </Route>

        <Route path="/auth" >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/test" element={<Test />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route path="*"  element={<NotFound />}/>
      </Route>

    </Routes>
    </>
  )
}

export default App
