import "./index.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Toast } from "@nmfs-radfish/react-radfish";
import { FormWrapper } from "./contexts/FormWrapper";
import Layout from "./components/Layout";
import { Form } from "./pages/Form";
import { useOfflineStatus } from "./hooks/useOfflineStatus";
import { useOfflineStorage } from "./packages/contexts/OfflineStorageWrapper";
import { TOAST_CONFIG, TOAST_LIFESPAN, useToast } from "./hooks/useToast";

function App() {
  const { updateOfflineData, findOfflineData, createOfflineData } = useOfflineStorage();
  const [asyncFormOptions, setAsyncFormOptions] = useState({});
  const { toast, showToast, dismissToast } = useToast();
  const { isOffline } = useOfflineStatus();

  useEffect(() => {
    if (isOffline) {
      showToast(TOAST_CONFIG.OFFLINE);
      setTimeout(() => {
        dismissToast();
      }, TOAST_LIFESPAN);
    }
  }, [isOffline]);

  const handleFormSubmit = async (submittedData) => {
    try {
      await updateOfflineData("formData", [
        { uuid: submittedData.uuid, ...submittedData, submitted: true },
      ]);
      showToast(TOAST_CONFIG.SUCCESS);
    } catch (error) {
      showToast(TOAST_CONFIG.ERROR);
    } finally {
      setTimeout(() => {
        dismissToast();
      }, TOAST_LIFESPAN);
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="toast-container">
          <Toast toast={toast} />
        </div>
        <Layout>
          {/* Route paths for the application. All routes need to be wrapped by `BrowserRouter` and `Routes` */}
          <Routes>
            <Route
              path="/"
              element={
                <FormWrapper onSubmit={handleFormSubmit}>
                  <Form />
                </FormWrapper>
              }
            />
            <Route
              path="/:id"
              element={
                <FormWrapper onSubmit={handleFormSubmit}>
                  <Form />
                </FormWrapper>
              }
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
