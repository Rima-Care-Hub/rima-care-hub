import colors from '../utils/colors';
import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

  const VitalInput = ({ label, placeholder, value, onChange, unit, icon }) => (
    <div className="p-4 bg-white rounded-xl border-2" style={{ borderColor: colors.neutral[200] }}>
      <div className="flex items-center gap-2 mb-2">
        <div style={{ color: colors.primary }}>
          {icon}
        </div>
        <label className="text-xs font-semibold" style={{ color: colors.neutral[700] }}>
          {label}
        </label>
      </div>
      <div className="flex items-baseline gap-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-2xl font-bold focus:outline-none"
          style={{ color: colors.neutral[900] }}
        />
        <span className="text-sm" style={{ color: colors.neutral[500] }}>{unit}</span>
      </div>
    </div>
  );

  export default VitalInput;