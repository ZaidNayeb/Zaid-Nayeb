import { Route, Routes } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import TransitionProvider from './context/TransitionContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <TransitionProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </TransitionProvider>
    </ThemeProvider>
  );
}
