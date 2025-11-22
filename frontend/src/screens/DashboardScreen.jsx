import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import colors from '../utils/colors';
import StatCard from '../components/StatCard';
import ShiftCard from '../components/ShiftCard';
import ActionButton from '../components/ActionButton';

  const DashboardScreen = () => {
    const [currentShift, setCurrentShift] = useState(null);
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const upcomingShifts = [
    {
      id: 1,
      clientName: 'Margaret Thompson',
      address: '245 Oak Street, Suite 12',
      time: 'Today, 2:00 PM - 6:00 PM',
      careNeeds: ['Medication Management', 'Mobility Assistance', 'Vital Monitoring'],
      distance: '2.3 miles away'
    },
    {
      id: 2,
      clientName: 'Robert Anderson',
      address: '789 Maple Avenue',
      time: 'Tomorrow, 9:00 AM - 1:00 PM',
      careNeeds: ['Post-Surgery Care', 'Wound Dressing', 'Pain Management'],
      distance: '4.1 miles away'
    },
  ];

    return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg.secondary }}>
      {}
      <div className="sticky top-0 bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.neutral[900] }}>Welcome back, Sarah</h1>
            <p className="text-sm" style={{ color: colors.neutral[600] }}>Ready to make a difference today</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 rounded-full relative" style={{ backgroundColor: colors.neutral[100] }}>
              <Bell size={20} style={{ color: colors.neutral[700] }} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: colors.error }}></span>
            </button>
            <button className="p-3 rounded-full" style={{ backgroundColor: colors.neutral[100] }}>
              <Menu size={20} style={{ color: colors.neutral[700] }} />
            </button>
          </div>
        </div>

        {}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
          <CheckCircle size={16} className="text-green-600" />
          <span className="text-sm font-semibold text-green-700">Verified Professional</span>
        </div>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        {}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard title="This Week" value="12 hrs" icon={<Clock size={18} />} />
          <StatCard title="Rating" value="4.9★" icon={<Heart size={18} />} />
          <StatCard title="Completed" value="48" icon={<CheckCircle size={18} />} />
        </div>

        {}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: colors.neutral[900] }}>Upcoming Shifts</h2>
            <button className="text-sm font-semibold" style={{ color: colors.primary }}>
              View All
            </button>
          </div>

          <div className="space-y-4">
            {upcomingShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} onSelect={() => {
                setCurrentShift(shift);
                setCurrentScreen('shift-detail');
              }} />
            ))}
          </div>
        </div>

        {}
        <div className="grid grid-cols-2 gap-3">
          <ActionButton 
            title="Find Shifts" 
            icon={<Calendar size={20} />}
            onClick={() => {}}
          />
          <ActionButton 
            title="My Schedule" 
            icon={<Clock size={20} />}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )};

  export default DashboardScreen