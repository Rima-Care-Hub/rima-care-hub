import colors from '../utils/colors';
import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

  const ActionButton = ({ title, icon, onClick }) => (
    <button 
      onClick={onClick}
      className="p-4 bg-white rounded-xl border-2 hover:shadow-md transition-all flex flex-col items-center gap-2"
      style={{ borderColor: colors.neutral[200] }}
    >
      <div style={{ color: colors.primary }}>
        {icon}
      </div>
      <span className="text-sm font-semibold" style={{ color: colors.neutral[900] }}>{title}</span>
    </button>
  );

  export default ActionButton;