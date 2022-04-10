import { Route, Routes, Navigate } from "react-router-dom";
import CharacterView from "../components/characters/CharacterView";
import CharacterPage from "../components/characters/CharacterPage";
import EpisodeView from "../components/episodes/EpisodesView";
import LocationsView from "../components/locations/LocationsView";
import EpisodePage from "../components/episodes/EpisodePage";
import LocationPage from "../components/locations/LocationPage";

const BrowserRoutes: React.FC = () => (
  <Routes>
    <Route path="/characters">
      <Route index element={<CharacterView />} />
      <Route path=":id" element={<CharacterPage />} />
    </Route>
    <Route path="/episodes">
      <Route index element={<EpisodeView />} />
      <Route path=":id" element={<EpisodePage />} />
    </Route>
    <Route path="/locations">
      <Route index element={<LocationsView />} />
      <Route path=":id" element={<LocationPage />} />
    </Route>

    {/* this is the quick-fix for getting initial application load on Github Pages */}
    <Route path="/" element={<CharacterView />} />
    <Route path="*" element={<Navigate to="/characters" replace />} />
  </Routes>
);

export default BrowserRoutes;
