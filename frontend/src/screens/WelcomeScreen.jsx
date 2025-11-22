import colors from '../utils/colors';
import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

  const WelcomeScreen = () => {
      const [currentScreen, setCurrentScreen] = useState('welcome');
      return (
    <div className="min-h-screen" style={{ background: colors.bg.gradient }}>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
        <div className="mb-8 p-6 bg-white rounded-full shadow-2xl">
          <Activity size={64} color={colors.primary} strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-bold mb-3 text-center">Rima Care Hub</h1>
        <p className="text-xl mb-2 opacity-90">Nurse Professional Platform</p>
        <p className="text-sm opacity-75 mb-12 text-center max-w-sm">
          Trusted by 10,000+ healthcare professionals
        </p>

        <div className="w-full max-w-sm space-y-3">
          <button 
            onClick={() => setCurrentScreen('signup')}
            className="w-full py-4 bg-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            style={{ color: colors.primary }}
          >
            Get Started
          </button>
          <button 
            onClick={() => setCurrentScreen('login')}
            className="w-full py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all"
          >
            Sign In
          </button>
        </div>

        <div className="mt-12 flex items-center gap-2 opacity-75">
          <Shield size={16} />
          <span className="text-xs">HIPAA Compliant • AES-256 Encrypted</span>
        </div>
      </div>
    </div>
  )};

  export default WelcomeScreen;