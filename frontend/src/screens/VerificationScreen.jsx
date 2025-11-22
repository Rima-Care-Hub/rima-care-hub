import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import colors from '../utils/colors';
import UploadCard from '../components/UploadCard'


const VerificationScreen = () => {
    const [verificationStatus, setVerificationStatus] = useState('pending'); 
    const [currentScreen, setCurrentScreen] = useState('welcome');
    return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg.secondary }}>
      <div className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center">
        <button onClick={() => setCurrentScreen('profile-setup')} className="mr-3">
          <ChevronRight size={24} className="rotate-180" color={colors.neutral[700]} />
        </button>
        <h2 className="text-xl font-bold" style={{ color: colors.neutral[900] }}>Verification</h2>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        {}
        <div 
          className={`p-6 rounded-2xl mb-6 border-2 ${
            verificationStatus === 'pending' ? 'bg-yellow-50 border-yellow-200' :
            verificationStatus === 'verified' ? 'bg-green-50 border-green-200' :
            'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-start gap-4">
            {verificationStatus === 'pending' && <Clock size={24} className="text-yellow-600 flex-shrink-0" />}
            {verificationStatus === 'verified' && <CheckCircle size={24} className="text-green-600 flex-shrink-0" />}
            {verificationStatus === 'rejected' && <XCircle size={24} className="text-red-600 flex-shrink-0" />}

            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-1 ${
                verificationStatus === 'pending' ? 'text-yellow-800' :
                verificationStatus === 'verified' ? 'text-green-800' :
                'text-red-800'
              }`}>
                {verificationStatus === 'pending' && 'Verification Pending'}
                {verificationStatus === 'verified' && 'Verified Professional'}
                {verificationStatus === 'rejected' && 'Verification Issues'}
              </h3>
              <p className={`text-sm ${
                verificationStatus === 'pending' ? 'text-yellow-700' :
                verificationStatus === 'verified' ? 'text-green-700' :
                'text-red-700'
              }`}>
                {verificationStatus === 'pending' && 'Your credentials are under review. This typically takes 24-48 hours.'}
                {verificationStatus === 'verified' && 'Your professional credentials have been verified. You can now accept shifts!'}
                {verificationStatus === 'rejected' && 'Some documents need attention. Please resubmit the required items.'}
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="space-y-4">
          <UploadCard
            title="Nursing License (NMCN)"
            subtitle="Upload your active NMCN registration"
            icon={<FileText size={24} />}
            status={verificationStatus}
          />

          <UploadCard
            title="Government ID"
            subtitle="Valid driver's license or passport"
            icon={<Shield size={24} />}
            status={verificationStatus}
          />

          <UploadCard
            title="CPR Certification"
            subtitle="Current CPR/BLS certificate"
            icon={<Heart size={24} />}
            status={verificationStatus}
          />
        </div>

        {}
        <div className="mt-6 p-6 bg-white rounded-2xl border-2" style={{ borderColor: colors.neutral[200] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full" style={{ backgroundColor: colors.primaryLight }}>
              <Fingerprint size={24} style={{ color: colors.primary }} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold" style={{ color: colors.neutral[900] }}>Biometric Security</h3>
              <p className="text-sm" style={{ color: colors.neutral[600] }}>Enable Face ID or Fingerprint</p>
            </div>
            <button className="px-4 py-2 rounded-lg font-semibold text-sm" style={{ backgroundColor: colors.primaryLight, color: colors.primary }}>
              Setup
            </button>
          </div>
          <p className="text-xs" style={{ color: colors.neutral[500] }}>
            Secure your account with biometric authentication for instant access
          </p>
        </div>

        {verificationStatus === 'verified' && (
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full py-4 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
            style={{ background: colors.bg.gradient }}
          >
            Go to Dashboard
          </button>
        )}

        {verificationStatus === 'pending' && (
          <button
            onClick={() => setVerificationStatus('verified')}
            className="w-full py-4 border-2 text-lg font-semibold rounded-xl transition-all mt-6"
            style={{ borderColor: colors.neutral[300], color: colors.neutral[700] }}
          >
            Simulate Verification Complete
          </button>
        )}
      </div>
    </div>
  )};

export default VerificationScreen;