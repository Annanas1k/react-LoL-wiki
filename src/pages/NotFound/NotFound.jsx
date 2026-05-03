import { Link, useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  const styles = {
    page404: {
      padding: "40px 0",
      background: "#fff",
      fontFamily: "'Arvo', serif",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    },
    bgImage: {
      backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
      height: "400px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    title: {
      fontSize: "80px",
      fontWeight: "bold"
    },
    linkHome: {
      color: "#fff",
      padding: "10px 20px",
      background: "#7c3aed",
      margin: "10px",
      display: "inline-block",
      textDecoration: "none",
      borderRadius: "4px",
      border: "none",
      transition: "background 0.3s ease",
      cursor: "pointer"
    },
    btnBack: {
      color: "#7c3aed",
      padding: "10px 20px",
      background: "transparent",
      margin: "10px",
      display: "inline-block",
      textDecoration: "none",
      borderRadius: "4px",
      border: "1px solid #7c3aed",
      cursor: "pointer",
      fontWeight: "500"
    },
    contentBox: {
      marginTop: "-50px",
    }
  };

  return (
    <section style={styles.page404}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="col-sm-10 offset-sm-1 text-center">
              
              <div style={styles.bgImage}>
                <h1 style={styles.title}>404</h1>
              </div>

              <div style={styles.contentBox}>
                <h3 className="h2 fw-bold">Look like you're lost</h3>
                <p className="text-muted">The page you are looking for is not available!</p>
                
                <div className="d-flex justify-content-center mt-4">
                  <button 
                    onClick={() => navigate(-1)} 
                    style={styles.btnBack}
                  >
                    ← Go Back
                  </button>

                  <Link 
                    to="/" 
                    style={styles.linkHome}
                  >
                    Go to Home
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};