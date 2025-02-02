import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import BlueprintList from "./pages/BlueprintList";
import UploadBlueprint from "./pages/BlueprintUpload"; 
import CanvasPage from "./pages/CanvasPage"; 

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    <Route path="/" element={<BlueprintList />} />
                    <Route path="/upload" element={<UploadBlueprint />} />
                    <Route path="/canvas" element={<CanvasPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
