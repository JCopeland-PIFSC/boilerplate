import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Alert, Link, Button } from "@trussworks/react-uswds";
import { PersistedForm } from "./pages/Form";

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <FormInfoAnnotation />
        <Router>
          <Routes>
            <Route path="/" element={<PersistedForm />} />
            <Route path="/:id" element={<PersistedForm />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

const FormInfoAnnotation = () => {
  return (
    <Alert type="info" heading="Persisted Form Example" headingLevel="h1">
      This is an example of a form with details coming from IndexedDB. The form data is stored in
      the browser's IndexedDB using methods from the `useOfflineStorage` hook, which uses Dexie.js
      behind the scenes.
      <br />
      <br />
      Please note that in order to see the form data persist, you must navigate to that form's
      correct uuid. This happens when you submit a form from the root `/` url. This uuid in the form
      url enables the component to query the correct data needed to populate the form from IndexedDB
      <br />
      <br />
      <Link
        href="https://nmfs-radfish.github.io/documentation"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="button">Go To Documentation</Button>
      </Link>
      <Link
        href="https://dexie.org/docs/Tutorial/Getting-started"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="button">Dexie Docs</Button>
      </Link>
    </Alert>
  );
};

export default App;
