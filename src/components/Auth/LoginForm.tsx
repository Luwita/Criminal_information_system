import React, { useState } from 'react';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Super Admin', email: 'moses.sakala@zambiapolice.gov.zm', password: 'password123' },
    { role: 'Provincial Admin', email: 'john.mwale@zambiapolice.gov.zm', password: 'password123' },
    { role: 'Station Commander', email: 'james.mwanza@zambiapolice.gov.zm', password: 'password123' },
    { role: 'Detective', email: 'grace.mulenga@zambiapolice.gov.zm', password: 'password123' },
  ];

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ZCIS</h1>
          <p className="text-slate-300">Zambia Criminal Information System</p>
          <p className="text-sm text-slate-400 mt-2">Secure Access Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Demo Accounts</h3>
            <div className="grid grid-cols-1 gap-2">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoAccount(account.email, account.password)}
                  className="text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <div className="text-sm font-medium text-slate-800">{account.role}</div>
                  <div className="text-xs text-slate-600">{account.email}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Click any demo account to auto-fill credentials. Password: password123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-400">
            © 2024 Zambia Police Service. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;