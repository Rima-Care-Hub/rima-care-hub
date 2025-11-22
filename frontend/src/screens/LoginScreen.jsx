import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import colors from '../utils/colors'

  const LoginScreen = () => (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center">
        <button onClick={() => setCurrentScreen('welcome')} className="mr-3">
          <ChevronRight size={24} className="rotate-180" color={colors.neutral[700]} />
        </button>
        <h2 className="text-xl font-bold" style={{ color: colors.neutral[900] }}>Sign In</h2>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-6 rounded-full mb-4" style={{ backgroundColor: colors.primaryLight }}>
            <Shield size={40} style={{ color: colors.primary }} />
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: colors.neutral[900] }}>Welcome Back</h3>
          <p className="text-sm" style={{ color: colors.neutral[600] }}>
            Sign in to continue your care journey
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="nurse@example.com"
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              style={{ borderColor: colors.neutral[300] }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              style={{ borderColor: colors.neutral[300] }}
            />
          </div>

          <button className="text-sm font-semibold" style={{ color: colors.primary }}>
            Forgot Password?
          </button>

          <button
            onClick={() => {
              setVerificationStatus('verified');
              setCurrentScreen('dashboard');
            }}
            className="w-full py-4 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            style={{ background: colors.bg.gradient }}
          >
            Sign In
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: colors.neutral[300] }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white" style={{ color: colors.neutral[500] }}>Or continue with</span>
            </div>
          </div>

          <button className="w-full py-3 border-2 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors" style={{ borderColor: colors.neutral[300] }}>
            <Fingerprint size={20} style={{ color: colors.primary }} />
            Biometric Login
          </button>
        </div>
      </div>
    </div>
  );

export default LoginScreen