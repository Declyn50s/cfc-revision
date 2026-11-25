import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import Dashboard from '@/pages/Dashboard'
import Programme from '@/pages/Programme'
import TpHome from '@/pages/TpHome'
import LessonPage from '@/pages/LessonPage'
import Questions from '@/pages/Questions'
import { CaseDetail, CaseList } from '@/pages/Cases'
import { RolePlayDetail, RolePlayList } from '@/pages/RolePlays'
import Flashcards from '@/pages/Flashcards'
import Quiz from '@/pages/Quiz'
import { ExamList, ExamResult, ExamRun } from '@/pages/Exams'
import { FicheDetail, FicheList } from '@/pages/Fiches'
import Glossary from '@/pages/Glossary'
import { Documents, Favorites, Notes } from '@/pages/Resources'
import { Historique, PointsFaibles, Progression } from '@/pages/Results'
import Parametres from '@/pages/Parametres'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="programme" element={<Programme />} />
        <Route path="apprendre/:tp" element={<TpHome />} />
        <Route path="apprendre/:tp/:comp" element={<LessonPage />} />
        <Route path="entrainement/questions" element={<Questions />} />
        <Route path="entrainement/cas" element={<CaseList />} />
        <Route path="entrainement/cas/:id" element={<CaseDetail />} />
        <Route path="entrainement/jeux-de-role" element={<RolePlayList />} />
        <Route path="entrainement/jeux-de-role/:id" element={<RolePlayDetail />} />
        <Route path="entrainement/flashcards" element={<Flashcards />} />
        <Route path="entrainement/quiz" element={<Quiz />} />
        <Route path="entrainement/examens" element={<ExamList />} />
        <Route path="entrainement/examens/passer/:id" element={<ExamRun />} />
        <Route path="entrainement/examens/resultat/:id" element={<ExamResult />} />
        <Route path="ressources/fiches" element={<FicheList />} />
        <Route path="ressources/fiches/:id" element={<FicheDetail />} />
        <Route path="ressources/methodes" element={<FicheList onlyMethods />} />
        <Route path="ressources/glossaire" element={<Glossary />} />
        <Route path="ressources/notes" element={<Notes />} />
        <Route path="ressources/favoris" element={<Favorites />} />
        <Route path="ressources/documents" element={<Documents />} />
        <Route path="resultats/progression" element={<Progression />} />
        <Route path="resultats/historique" element={<Historique />} />
        <Route path="resultats/points-faibles" element={<PointsFaibles />} />
        <Route path="parametres" element={<Parametres />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
