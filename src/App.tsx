import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";
import Container from "./views/Container";

const App = () => {
  return (
    <div className="font-Jakarta">
      <Header />
      <Container />
      <Toaster />
    </div>
  );
};

export default App;
