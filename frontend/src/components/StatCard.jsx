import colors from '../utils/colors';
import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';  
  
  const StatCard = ({ title, value, icon }) => (
    <div className="p-4 bg-white rounded-xl border" style={{ borderColor: colors.neutral[200] }}>
      <div className="flex justify-center mb-2" style={{ color: colors.primary }}>
        {icon}
      </div>
      <p className="text-xs text-center mb-1" style={{ color: colors.neutral[600] }}>{title}</p>
      <p className="text-lg font-bold text-center" style={{ color: colors.neutral[900] }}>{value}</p>
    </div>
  );

  export default StatCard;