import colors from '../utils/colors';
import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';  

  const ShiftCard = ({ shift, onSelect }) => (
    <div 
      onClick={onSelect}
      className="p-5 bg-white rounded-xl border-2 cursor-pointer hover:shadow-lg transition-all"
      style={{ borderColor: colors.neutral[200] }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg mb-1" style={{ color: colors.neutral[900] }}>{shift.clientName}</h3>
          <p className="text-sm flex items-center gap-1" style={{ color: colors.neutral[600] }}>
            <Clock size={14} />
            {shift.time}
          </p>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: colors.primaryLight, color: colors.primary }}>
          Confirmed
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3" style={{ color: colors.neutral[600] }}>
        <MapPin size={16} />
        <p className="text-sm">{shift.address}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {shift.careNeeds.map((need, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: colors.neutral[100], color: colors.neutral[700] }}>
            {need}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: colors.neutral[200] }}>
        <span className="text-sm" style={{ color: colors.neutral[600] }}>{shift.distance}</span>
        <button className="text-sm font-semibold flex items-center gap-1" style={{ color: colors.primary }}>
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  export default ShiftCard