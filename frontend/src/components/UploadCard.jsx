import colors from '../utils/colors';
import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

  const UploadCard = ({ title, subtitle, icon, status }) => (
    <div className="p-5 bg-white rounded-xl border-2 hover:shadow-md transition-all cursor-pointer" style={{ borderColor: colors.neutral[200] }}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: colors.primaryLight }}>
          {React.cloneElement(icon, { style: { color: colors.primary } })}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold" style={{ color: colors.neutral[900] }}>{title}</h4>
          <p className="text-sm" style={{ color: colors.neutral[600] }}>{subtitle}</p>
        </div>
        {status === 'verified' ? (
          <CheckCircle size={24} className="text-green-500" />
        ) : (
          <Upload size={24} style={{ color: colors.primary }} />
        )}
      </div>
    </div>
  );

  export default UploadCard;