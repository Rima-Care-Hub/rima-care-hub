import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import colors from '../utils/colors'

  const ShiftDetailScreen = () => {
      const [currentShift, setCurrentShift] = useState(null);
        const [isClockedIn, setIsClockedIn] = useState(false);
    return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg.secondary }}>
      <div className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center">
        <button onClick={() => setCurrentScreen('dashboard')} className="mr-3">
          <ChevronRight size={24} className="rotate-180" color={colors.neutral[700]} />
        </button>
        <h2 className="text-xl font-bold" style={{ color: colors.neutral[900] }}>Shift Details</h2>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        {currentShift && (
          <>
            <div className="p-6 bg-white rounded-2xl mb-4 border-2" style={{ borderColor: colors.neutral[200] }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.neutral[900] }}>{currentShift.clientName}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock size={20} style={{ color: colors.primary }} />
                  <span style={{ color: colors.neutral[700] }}>{currentShift.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="flex-shrink-0" style={{ color: colors.primary }} />
                  <span style={{ color: colors.neutral[700] }}>{currentShift.address}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl mb-4 border-2" style={{ borderColor: colors.neutral[200] }}>
              <h4 className="font-bold mb-3" style={{ color: colors.neutral[900] }}>Care Requirements</h4>
              <div className="space-y-2">
                {currentShift.careNeeds.map((need, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: colors.success }} />
                    <span className="text-sm" style={{ color: colors.neutral[700] }}>{need}</span>
                  </div>
                ))}
              </div>
            </div>

            {!isClockedIn ? (
              <button
                onClick={() => {
                  setIsClockedIn(true);
                  setCurrentScreen('care-sheet');
                }}
                className="w-full py-4 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                style={{ background: colors.bg.gradient }}
              >
                <MapPin size={24} />
                Clock In & Start Shift
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200 flex items-center gap-3">
                  <CheckCircle size={24} className="text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Clocked In</p>
                    <p className="text-sm text-green-700">Started at 2:00 PM</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentScreen('care-sheet')}
                  className="w-full py-4 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ background: colors.bg.gradient }}
                >
                  Open Care Sheet
                </button>
              </div>
            )}

            <div className="mt-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: colors.primaryLight }}>
              <Shield size={20} style={{ color: colors.primary }} />
              <p className="text-sm" style={{ color: colors.primary }}>
                GPS verification enabled for secure clock-in/out
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )};

  export default ShiftDetailScreen;