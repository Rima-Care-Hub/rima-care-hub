import React from 'react'
import colors from '../utils/colors';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

export default function Header({ title }){
return (
<header className="header">
<div className="header-left">
<h1>{title}</h1>
</div>
<div className="header-right">
<button aria-label="menu"><Menu/></button>
</div>
</header>
)};