import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import colors from '../utils/colors'

const ProfileSetupScreen = () => (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center">
        <button onClick={() => setCurrentScreen('signup')} className="mr-3">
          <ChevronRight size={24} className="rotate-180" color={colors.neutral[700]} />
        </button>
        <h2 className="text-xl font-bold" style={{ color: colors.neutral[900] }}>Complete Profile</h2>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primaryLight }}>
                <User size={40} style={{ color: colors.primary }} />
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg border-2" style={{ borderColor: colors.neutral[200] }}>
                <Camera size={18} style={{ color: colors.primary }} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Professional Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about your experience, specialties, and what makes you a great caregiver..."
              rows={4}
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
              style={{ borderColor: colors.neutral[300] }}
            />
            <p className="mt-2 text-xs" style={{ color: colors.neutral[500] }}>
              This helps clients get to know you better
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.neutral[700] }}>
              Location *
            </label>
            <div className="relative">
              <MapPin size={20} className="absolute left-3 top-3.5" color={colors.neutral[400]} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
                className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                style={{ borderColor: colors.neutral[300] }}
              />
            </div>
            <p className="mt-2 text-xs" style={{ color: colors.neutral[500] }}>
              We'll match you with nearby opportunities
            </p>
          </div>

          <button
            onClick={() => {
              setVerificationStatus('pending');
              setCurrentScreen('verification');
            }}
            className="w-full py-4 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
            style={{ background: colors.bg.gradient }}
          >
            Continue to Verification
          </button>
        </div>
      </div>
    </div>
  );

  export default ProfileSetupScreen