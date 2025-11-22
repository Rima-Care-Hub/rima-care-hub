// src/App.jsx
import React, { useState } from 'react';
import colors from './utils/colors.js';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import VerificationScreen from './screens/VerificationScreen';
import DashboardScreen from './screens/DashboardScreen';
import ShiftDetailScreen from './screens/ShiftDetailScreen';
import CareSheetScreen from './screens/CareSheetScreen';
import LoginScreen from './screens/LoginScreen.jsx';

const RimaNurseApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const screens = {
    welcome: <WelcomeScreen />,
    signup: <SignUpScreen />,
    login: <LoginScreen />,
    'profile-setup': <ProfileSetupScreen />,
    verification: <VerificationScreen />,
    dashboard: <DashboardScreen />,
    'shift-detail': <ShiftDetailScreen />,
    'care-sheet': <CareSheetScreen />,
  };

  return (
    <div
      className="w-full min-h-screen bg-white"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      <div className="w-full max-w-4xl mx-auto shadow-2xl min-h-screen">
        {screens[currentScreen]}
      </div>

      {/* Quick Navigation */}
      <div className="fixed bottom-4 right-4 z-50">
        <div
          className="bg-white rounded-2xl shadow-2xl p-4 border-2"
          style={{ borderColor: colors.neutral[200] }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: colors.neutral[700] }}
          >
            Quick Nav:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentScreen('welcome')}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
            >
              Start
            </button>
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentScreen('verification')}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
            >
              Verify
            </button>
            <button
              onClick={() => setCurrentScreen('care-sheet')}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
            >
              Care Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RimaNurseApp;
