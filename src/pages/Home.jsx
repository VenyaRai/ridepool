import "../App.css";

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🚗 RidePool</div>

        <div className="nav-links">
          <a href="/find-ride">Find a Ride</a>
          <a href="#">Offer a Ride</a>
          <a href="#">How it Works</a>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="badge">
            🌱 Smart travel. Shared journeys.
          </div>

          <h1>
            Your Journey.
            <br />
            <span>Our Community.</span>
          </h1>

          <p className="hero-text">
            Find people travelling your way, share your ride,
            reduce travel costs and make every journey meaningful.
          </p>

          <div className="search-card">
            <div className="search-item">
              <span>📍</span>
              <div>
                <label>FROM</label>
                <input placeholder="Starting location" />
              </div>
            </div>

            <div className="search-item">
              <span>📍</span>
              <div>
                <label>TO</label>
                <input placeholder="Where are you going?" />
              </div>
            </div>

            <div className="search-item">
              <span>📅</span>
              <div>
                <label>DATE</label>
                <input type="date" />
              </div>
            </div>

            <button className="find-btn">
              Find a Ride →
            </button>
          </div>
        </div>

        <div className="hero-visual">
          🚙
        </div>
      </section>

      <section className="features">
        <h2>Travel smarter, together.</h2>

        <div className="feature-container">
          <div className="feature-card">
            <div className="icon">🔎</div>
            <h3>Find a Ride</h3>
            <p>Find people travelling to the same destination.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🚗</div>
            <h3>Offer a Ride</h3>
            <p>Share your empty seats with other travellers.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🤝</div>
            <h3>Travel Together</h3>
            <p>Connect with people and share your journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;