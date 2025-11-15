import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.error_description || error.message);
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(error.error_description || error.message);
        } else {
            alert('Check your email for the login link!');
        }
        setLoading(false);
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            alert(error.error_description || error.message);
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-frame">
                <header className="auth-header">
                    <h1>Factory Method Adventures</h1>
                </header>

                <div className="auth-content">
                    <h2 className="auth-title">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
                    <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="input-field"
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-wrapper">
                                <input
                                    id="password"
                                    className="input-field"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
                        </button>
                    </form>

                    <div className="separator">OR</div>

                    <button onClick={signInWithGoogle} className="google-button" disabled={loading}>
                        Sign In with Google
                    </button>

                    <div className="toggle-auth">
                        <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-button">
                            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
