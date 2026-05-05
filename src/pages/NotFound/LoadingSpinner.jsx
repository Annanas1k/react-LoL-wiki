export const LoadingSpinner = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loaderWrapper}>
        {/* Spinner-ul exterior */}
        <div style={styles.spinner}></div>
        
        {/* Logo-ul central */}
        <div style={styles.logoContainer}>
          <img 
            src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/3f70356e890d0f5858fe9851f6f4de859223bf89-980x980.png" 
            alt="LoL Logo" 
            style={styles.logo}
          />
        </div>
      </div>

      <p style={styles.text}>Entering the Rift...</p>

      {/* Injectăm animațiile direct în pagină */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#010a13',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif'
  },
  loaderWrapper: {
    position: 'relative',
    width: '150px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '3px solid transparent',
    borderTop: '3px solid #c8a84b',
    borderRight: '3px solid #c8a84b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    boxShadow: '0 0 15px rgba(200, 168, 75, 0.3)'
  },
  logoContainer: {
    width: '70px',
    animation: 'pulse 2s ease-in-out infinite'
  },
  logo: {
    width: '100%',
    filter: 'drop-shadow(0 0 10px #c8a84b)'
  },
  text: {
    marginTop: '25px',
    color: '#c8a84b',
    letterSpacing: '3px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
};

