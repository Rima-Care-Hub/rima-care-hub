import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import colors from '../utils/colors'

  const SignUpScreen = () => {
      const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        bio: '',
        location: '',
        showPassword: false,
      });
      const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
      return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center">
        <button onClick={() => setCurrentScreen('welcome')} className="mr-3">
          <ChevronRight size={24} className="rotate-180" color={colors.neutral[700]} />
        </button>
        <h2 className="text-xl font-bold" style={{ color: colors.neutral[900] }}>Create Account</h2>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: colors.primaryLight }}>
            <Shield size={18} style={{ color: colors.primary }} />
            <span className="text-sm font-medium" style={{ color: colors.primary }}>Secure Registration</span>
          </div>
          <p className="text-sm" style={{ color: colors.neutral[600] }}>
            Join thousands of verified healthcare professionals
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="John Doe, RN"
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              style={{ borderColor: colors.neutral[300] }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Email Address *
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-3.5" color={colors.neutral[400]} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="nurse@example.com"
                className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                style={{ borderColor: colors.neutral[300] }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Phone Number *
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-3 top-3.5" color={colors.neutral[400]} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                style={{ borderColor: colors.neutral[300] }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Password *
            </label>
            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                style={{ borderColor: colors.neutral[300] }}
              />
              <button
                onClick={() => handleInputChange('showPassword', !formData.showPassword)}
                className="absolute right-3 top-3.5"
              >
                {formData.showPassword ? <EyeOff size={20} color={colors.neutral[400]} /> : <Eye size={20} color={colors.neutral[400]} />}
              </button>
            </div>
            <p className="mt-2 text-xs" style={{ color: colors.neutral[500] }}>
              Must be 8+ characters with numbers and symbols
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('profile-setup')}
            className="w-full py-4 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
            style={{ background: colors.bg.gradient }}
          >
            Continue
          </button>

          <p className="text-center text-sm mt-4" style={{ color: colors.neutral[600] }}>
            Already have an account?{' '}
            <button 
              onClick={() => setCurrentScreen('login')}
              className="font-semibold"
              style={{ color: colors.primary }}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )};

  export default SignUpScreen;