import React, { useState } from 'react';
import { Lock, Mail, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    encryptionPin: '',
    confirmPin: ''
  });
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  // -------------------------
  // Validation
  // -------------------------
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validatePin = (pin) => /^\d{4,6}$/.test(pin);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // -------------------------
  // Submit
  // -------------------------
  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid Gmail';

    if (!formData.encryptionPin) newErrors.encryptionPin = 'PIN is required';
    else if (!validatePin(formData.encryptionPin)) newErrors.encryptionPin = 'PIN must be 4-6 digits';

    if (!isLogin) {
      if (!formData.confirmPin) newErrors.confirmPin = 'Confirm PIN is required';
      else if (formData.encryptionPin !== formData.confirmPin) newErrors.confirmPin = 'PINs do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = isLogin
      ? { email: formData.email, encryptionPin: formData.encryptionPin }
      : { email: formData.email, encryptionPin: formData.encryptionPin };

    const url = isLogin
      ? 'http://localhost:5000/api/users/login'
      : 'http://localhost:5000/api/users/signup';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(isLogin ? 'Login successful' : 'Signup successful');
        if (isLogin && data.user) onLogin(data.user);
      } else {
        alert(data.message || 'Server error');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', encryptionPin: '', confirmPin: '' });
    setErrors({});
  };

  // -------------------------
  // Styles
  // -------------------------
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #d8b4fe, #c084fc, #f9a8d4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: 'rgba(216,180,254,0.6)',
      backdropFilter: 'blur(8px)',
      borderRadius: '1.5rem',
      padding: '2rem',
      width: '100%',
      maxWidth: '500px',
      boxSizing: 'border-box',
      boxShadow: '0 20px 25px rgba(0,0,0,0.1)'
    },
    header: { textAlign: 'center', marginBottom: '2rem' },
    inputWrapper: { position: 'relative', marginBottom: '1rem' },
    input: {
      width: '100%',
      padding: '0.75rem 3rem 0.75rem 3rem',
      borderRadius: '0.75rem',
      border: '2px solid transparent',
      outline: 'none',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(255,255,255,0.8)'
    },
    inputError: { borderColor: '#f87171' },
    icon: { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#4b5563' },
    eyeButton: { position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' },
    error: { display: 'flex', alignItems: 'center', color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' },
    errorIcon: { marginRight: '0.25rem' },
    button: { width: '100%', padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#ec4899', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '1rem' },
    footer: { marginTop: '1rem', textAlign: 'center' },
    link: { color: '#db2777', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Lock size={48} color="#111827" />
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        </div>

        <div style={styles.inputWrapper}>
          <Mail size={20} style={styles.icon} />
          <input
            type="email"
            placeholder="Gmail Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
          />
          {errors.email && <div style={styles.error}><AlertCircle size={16} style={styles.errorIcon} />{errors.email}</div>}
        </div>

        <div style={styles.inputWrapper}>
          <Lock size={20} style={styles.icon} />
          <input
            type={showPin ? 'text' : 'password'}
            placeholder="Encryption PIN (4-6 digits)"
            name="encryptionPin"
            value={formData.encryptionPin}
            onChange={handleInputChange}
            style={{ ...styles.input, ...(errors.encryptionPin ? styles.inputError : {}) }}
          />
          <button type="button" onClick={() => setShowPin(!showPin)} style={styles.eyeButton}>
            {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.encryptionPin && <div style={styles.error}><AlertCircle size={16} style={styles.errorIcon} />{errors.encryptionPin}</div>}
        </div>

        {!isLogin && (
          <div style={styles.inputWrapper}>
            <Lock size={20} style={styles.icon} />
            <input
              type={showConfirmPin ? 'text' : 'password'}
              placeholder="Confirm PIN"
              name="confirmPin"
              value={formData.confirmPin}
              onChange={handleInputChange}
              style={{ ...styles.input, ...(errors.confirmPin ? styles.inputError : {}) }}
            />
            <button type="button" onClick={() => setShowConfirmPin(!showConfirmPin)} style={styles.eyeButton}>
              {showConfirmPin ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPin && <div style={styles.error}><AlertCircle size={16} style={styles.errorIcon} />{errors.confirmPin}</div>}
          </div>
        )}

        <button type="button" style={styles.button} onClick={handleSubmit}>{isLogin ? 'Login' : 'Sign Up'}</button>

        <div style={styles.footer}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={toggleMode} style={styles.link}>{isLogin ? 'Sign Up' : 'Login'}</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
