import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Inbox,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { 
  findAccount, 
  saveNewAccount, 
  updateAccountPassword, 
  generateVerificationCode, 
  setPendingVerification, 
  getPendingVerification, 
  clearPendingVerification,
  setActiveSession
} from '../utils/authStorage';
import { UserProfile, SavedAccount } from '../types/meal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signin'
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);

  // Sign In form fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Multi-Step Flow:
  // Step 1: 'email_input' -> user enters full name & email
  // Step 2: 'code_verification' -> user enters verification code sent to their email
  // Step 3: 'password_setup' -> user sets their password & finishes registration
  const [signUpStep, setSignUpStep] = useState<'email_input' | 'code_verification' | 'password_setup'>('email_input');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Simulated Email Notification Drawer/Popup
  const [simulatedEmail, setSimulatedEmail] = useState<{
    to: string;
    code: string;
    subject: string;
    timestamp: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Forgot Password flow
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify_and_reset'>('request');
  const [forgotCode, setForgotCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Status & Errors
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear messages on mode switch
  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (newMode === 'signup') {
      setSignUpStep('email_input');
      setEnteredCode('');
    }
  };

  // Demo auto-fill helper (WSMS style)
  const handleFillDemo = () => {
    setSignInEmail('user@theflavorhouse.com');
    setSignInPassword('CleanDining2026!');
    setErrorMessage(null);
  };

  // ================= 1. SIGN IN SUBMISSION =================
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const email = signInEmail.trim().toLowerCase();
    const password = signInPassword.trim();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const account = findAccount(email);
      if (!account || account.passwordHash !== password) {
        setIsLoading(false);
        setErrorMessage('Invalid email or password. Please check your credentials or click "Demo Login".');
        return;
      }

      // Login Successful
      const userProfile: UserProfile = {
        id: `usr_${Date.now()}`,
        name: account.name,
        email: account.email,
        phone: account.phone || '+1 (504) 555-0199',
        verified: true,
        createdAt: account.createdAt
      };

      if (rememberMe) {
        setActiveSession(userProfile);
      }

      setIsLoading(false);
      setSuccessMessage(`Welcome back, ${account.name}!`);
      setTimeout(() => {
        onLoginSuccess(userProfile);
        onClose();
      }, 700);
    }, 600);
  };

  // ================= 2. SIGN UP: STEP 1 (Send Verification Code) =================
  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const name = signUpName.trim();
    const email = signUpEmail.trim().toLowerCase();

    if (!name) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Check if account already exists
    const existing = findAccount(email);
    if (existing) {
      setErrorMessage('An account with this email address already exists. Please sign in instead.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const code = generateVerificationCode();
      setPendingVerification({
        email,
        name,
        code,
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
      });

      // Dispatch simulated email notification
      setSimulatedEmail({
        to: email,
        code,
        subject: `The Flavor House Verification Code: ${code}`,
        timestamp: 'Just now'
      });

      setIsLoading(false);
      setSignUpStep('code_verification');
      setSuccessMessage(`Verification code sent to ${email}! Check the simulated email inbox below.`);
    }, 750);
  };

  // ================= 2. SIGN UP: STEP 2 (Verify Code) =================
  const handleVerifyCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const pending = getPendingVerification();
    const code = enteredCode.trim();

    if (!pending) {
      setErrorMessage('Verification session expired. Please request a new code.');
      setSignUpStep('email_input');
      return;
    }

    if (code !== pending.code) {
      setErrorMessage(`Incorrect verification code. Please enter the 6-digit code sent to ${pending.email}.`);
      return;
    }

    // Code verified! Proceed to password setup
    setSuccessMessage('Email verified successfully! Now set your secure password.');
    setSignUpStep('password_setup');
  };

  // ================= 2. SIGN UP: STEP 3 (Set Password & Save Account) =================
  const handleCompleteSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const password = signUpPassword.trim();
    const confirm = signUpConfirmPassword.trim();

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirm) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    const pending = getPendingVerification();
    const email = pending ? pending.email : signUpEmail.trim().toLowerCase();
    const name = pending ? pending.name : signUpName.trim();

    setIsLoading(true);

    setTimeout(() => {
      // Save user's email and password into database
      const newAccount: SavedAccount = {
        email,
        passwordHash: password,
        name,
        verified: true,
        createdAt: new Date().toISOString().split('T')[0]
      };

      saveNewAccount(newAccount);
      clearPendingVerification();

      // Create active user profile and log them in
      const userProfile: UserProfile = {
        id: `usr_${Date.now()}`,
        name,
        email,
        verified: true,
        createdAt: newAccount.createdAt
      };

      setActiveSession(userProfile);
      setIsLoading(false);
      setSuccessMessage(`Account created successfully! Welcome to The Flavor House, ${name}!`);

      setTimeout(() => {
        onLoginSuccess(userProfile);
        onClose();
      }, 1000);
    }, 800);
  };

  // ================= 3. FORGOT PASSWORD =================
  const handleForgotRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const email = forgotEmail.trim().toLowerCase();
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    const account = findAccount(email);
    if (!account) {
      setErrorMessage('No account found with this email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const code = generateVerificationCode();
      setPendingVerification({
        email,
        name: account.name,
        code,
        expiresAt: Date.now() + 10 * 60 * 1000
      });

      setSimulatedEmail({
        to: email,
        code,
        subject: `The Flavor House Password Reset Code: ${code}`,
        timestamp: 'Just now'
      });

      setIsLoading(false);
      setForgotStep('verify_and_reset');
      setSuccessMessage(`Password reset code sent to ${email}!`);
    }, 700);
  };

  const handleForgotReset = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const pending = getPendingVerification();
    if (!pending || forgotCode.trim() !== pending.code) {
      setErrorMessage('Invalid verification code.');
      return;
    }

    if (newPassword.trim().length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      updateAccountPassword(pending.email, newPassword.trim());
      clearPendingVerification();
      setIsLoading(false);
      setSuccessMessage('Password updated successfully! You can now sign in.');
      setTimeout(() => {
        setMode('signin');
        setSignInEmail(pending.email);
        setSignInPassword(newPassword.trim());
      }, 1200);
    }, 700);
  };

  const handleAutofillCode = (code: string) => {
    if (mode === 'signup') {
      setEnteredCode(code);
    } else if (mode === 'forgot') {
      setForgotCode(code);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* WSMS-Style Card Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1b1d22] rounded-3xl shadow-2xl border border-stone-200/80 dark:border-[#2a2e36] overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Header & Brand */}
        <div className="p-6 border-b border-stone-100 dark:border-[#262930] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-md font-serif font-bold text-sm tracking-tight">
              FH
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50 leading-tight">
                THE FLAVOR HOUSE
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Gourmet Dining & Subscription Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Segmented Mode Switcher (Sign In vs Sign Up) */}
        {mode !== 'forgot' && (
          <div className="px-6 pt-5 pb-1">
            <div className="grid grid-cols-2 p-1 bg-stone-100 dark:bg-[#141518] rounded-xl border border-stone-200/60 dark:border-[#23262d]">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white dark:bg-[#23262d] text-stone-900 dark:text-stone-50 shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-[#23262d] text-stone-900 dark:text-stone-50 shadow-xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Feedback Banners */}
        <div className="px-6 pt-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: SIGN IN FORM                                            */}
        {/* ============================================================== */}
        {mode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type={showSignInPassword ? 'text' : 'password'}
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  tabIndex={-1}
                >
                  {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Remember this device</span>
              </label>

              {/* WSMS Style Demo Button */}
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-amber-700 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                Fill Demo Credentials
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to The Flavor House</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center text-xs text-stone-500 dark:text-stone-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                Sign up with verification
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: SIGN UP FLOW (Verification Code & Password Setup)       */}
        {/* ============================================================== */}
        {mode === 'signup' && (
          <div className="p-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-6 px-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  signUpStep === 'email_input' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {signUpStep === 'email_input' ? '1' : <Check className="w-3 h-3" />}
                </span>
                <span className="font-semibold text-stone-700 dark:text-stone-300">Email</span>
              </div>
              <div className="h-0.5 flex-1 bg-stone-200 dark:bg-[#2a2e36] mx-2" />
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  signUpStep === 'code_verification'
                    ? 'bg-amber-600 text-white'
                    : signUpStep === 'password_setup'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                }`}>
                  {signUpStep === 'password_setup' ? <Check className="w-3 h-3" /> : '2'}
                </span>
                <span className="font-semibold text-stone-700 dark:text-stone-300">Code</span>
              </div>
              <div className="h-0.5 flex-1 bg-stone-200 dark:bg-[#2a2e36] mx-2" />
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  signUpStep === 'password_setup' ? 'bg-amber-600 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                }`}>
                  3
                </span>
                <span className="font-semibold text-stone-700 dark:text-stone-300">Password</span>
              </div>
            </div>

            {/* STEP 1: Enter Name & Email */}
            {signUpStep === 'email_input' && (
              <form onSubmit={handleSendVerificationCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="e.g. Katherine Pierce"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Email Address (Verification Code will be sent here)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1.5">
                    We'll dispatch an instant 6-digit confirmation code to verify your address.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: Enter Verification Code */}
            {signUpStep === 'code_verification' && (
              <form onSubmit={handleVerifyCodeSubmit} className="space-y-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
                  <p className="font-semibold">Verification Code Dispatched</p>
                  <p className="text-[11px] mt-0.5 text-amber-800/80 dark:text-amber-300">
                    Enter the 6-digit verification code sent to <strong>{signUpEmail}</strong>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    6-Digit Verification Code
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 839210"
                      className="w-full pl-10 pr-4 py-2.5 text-center text-lg tracking-widest font-mono font-bold bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setSignUpStep('email_input')}
                    className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                  >
                    ← Change Email
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleSendVerificationCode(e as any)}
                    className="text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend Code</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={enteredCode.length < 6}
                  className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <span>Verify Email Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 3: Set Password & Finalize Account */}
            {signUpStep === 'password_setup' && (
              <form onSubmit={handleCompleteSignUp} className="space-y-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Email <strong>{signUpEmail}</strong> verified! Set your password to complete registration.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                      tabIndex={-1}
                    >
                      {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      placeholder="Re-type password"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Account...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save Account & Sign In</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: FORGOT PASSWORD MODAL (Directly matching WSMS design)   */}
        {/* ============================================================== */}
        {mode === 'forgot' && (
          <div className="p-6 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-50">
                Reset Password
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Enter your account email address and we'll send you a password reset verification code.
              </p>
            </div>

            {forgotStep === 'request' ? (
              <form onSubmit={handleForgotRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="flex-1 py-2.5 border border-stone-200 dark:border-[#2a2e36] text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-50 dark:hover:bg-[#23262d] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Send Reset Code
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleForgotReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Reset Code sent to {forgotEmail}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={forgotCode}
                    onChange={(e) => setForgotCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-2 text-center font-mono font-bold text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Enter New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#141518] border border-stone-200 dark:border-[#2a2e36] rounded-xl text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotStep('request')}
                    className="flex-1 py-2.5 border border-stone-200 dark:border-[#2a2e36] text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Footer info banner matching WSMS style */}
        <div className="p-4 bg-stone-50 dark:bg-[#141518] border-t border-stone-100 dark:border-[#23262d] flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            256-Bit SSL Encrypted Session
          </span>
          <span>The Flavor House · USA</span>
        </div>

      </div>

      {/* ============================================================== */}
      {/* SIMULATED EMAIL INBOX NOTIFICATION CARD                          */}
      {/* (Renders when system sends verification code to email)          */}
      {/* ============================================================== */}
      {simulatedEmail && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white dark:bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center">
                <Inbox className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                  Simulated Email Inbox
                </span>
                <span className="text-[10px] text-stone-400">From: auth@theflavorhouse.com</span>
              </div>
            </div>
            <button
              onClick={() => setSimulatedEmail(null)}
              className="text-stone-400 hover:text-stone-600 text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-2.5 space-y-1.5 text-xs">
            <div className="text-stone-600 dark:text-stone-300">
              <span className="text-stone-400">To:</span> {simulatedEmail.to}
            </div>
            <div className="font-semibold text-stone-800 dark:text-stone-200">
              {simulatedEmail.subject}
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/50 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 tracking-wider block">
                Your Single-Use Verification Code
              </span>
              <span className="font-mono text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-widest my-1 block">
                {simulatedEmail.code}
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                Valid for 10 minutes
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              handleAutofillCode(simulatedEmail.code);
              setCopiedCode(true);
              setTimeout(() => setCopiedCode(false), 2000);
            }}
            className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Code Filled into Form!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Click to Autofill Code ({simulatedEmail.code})</span>
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};
