import { Container } from "@mui/material";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PlayerForm from "./components/PlayerForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="sm" sx={{ my: "3em" }}>
        <PlayerForm />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
