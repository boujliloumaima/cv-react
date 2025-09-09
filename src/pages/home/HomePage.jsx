import { useNavigate } from "react-router-dom";
import "./home.css"
const HomePage = () => {
  const storedResume = localStorage.getItem("resumes") ?? "[]";
  const totalResumes = (JSON.parse(storedResume)).length;

  const navigate = useNavigate();

  const handleCreateCV = () => {
    navigate("/resume/add/profile");
  };

  const handleImportLinkedIn = () => {
    // Open LinkedIn import modal or redirect to import flow
    alert("LinkedIn import coming soon!");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Build a Standout CV in Minutes</h1>
        <p>Drag-and-drop s, and ATS-optimized templates. No design skills needed.</p>
        <div className="cta-buttons">
          <button onClick={handleCreateCV} className="primary-button">
            Create My CV
          </button>

          <button onClick={() => navigate("/resumes/all")}  className="secondary-button">
            Show my resumes ({totalResumes})
          </button>

          <button onClick={handleImportLinkedIn} className="secondary-button">
            Import from LinkedIn
          </button>
        </div>
        <div className="hero-image">
          <img src="/cv-editor-preview.png" alt="CV Editor Preview" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">📄</div>
          <h3>Easy Drag-and-Drop</h3>
          <p>Customize your CV layout with a simple drag-and-drop editor.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">✨</div>
          <h3>AI-Powered Suggestions</h3>
          <p>Get real-time tips to improve your CV and stand out.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">✅</div>
          <h3>ATS-Optimized Templates</h3>
          <p>Templates designed to pass Applicant Tracking Systems.</p>
        </div>
      </section>

      {/* Templates Gallery */}
      <section className="templates">
        <h2>Choose a Template to Get Started</h2>
        <div className="template-grid">
          <div className="template-card" onClick={() => navigate("/resume/add/profile?template=modern")}>
            <img src="/modern-template.png" alt="Modern Template" />
            <button>Use This Template</button>
          </div>
          <div className="template-card" onClick={() => navigate("/resume/add/profile?template=classic")}>
            <img src="/classic-template.png" alt="Classic Template" />
            <button>Use This Template</button>
          </div>
          <div className="template-card" onClick={() => navigate("/resume/add/profile?template=creative")}>
            <img src="/creative-template.png" alt="Creative Template" />
            <button>Use This Template</button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">👤</div>
            <h3>Add Your Info</h3>
            <p>Fill in your details or import from LinkedIn.</p>
          </div>
          <div className="step">
            <div className="step-icon">📱</div>
            <h3>Customize Your CV</h3>
            <p>Drag sections, edit content, and pick a theme.</p>
          </div>
          <div className="step">
            <div className="step-icon">📥</div>
            <h3>Export & Apply</h3>
            <p>Download as PDF or apply directly to jobs.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/pricing">Pricing</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="social-icons">
          <a href="https://linkedin.com">LinkedIn</a>
          <a href="https://twitter.com">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
