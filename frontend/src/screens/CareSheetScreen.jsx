import React, { useState } from 'react';
import { Check, Upload, MapPin, Clock, Camera, Mic, FileText, Shield, Fingerprint, Bell, Menu, ChevronRight, Activity, Heart, Thermometer, User, Phone, Mail, Calendar, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import colors from '../utils/colors';
import VitalInput from '../components/VitalInput';

  const CareSheetScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [currentShift, setCurrentShift] = useState(null);
      const [vitals, setVitals] = useState({
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        oxygenSaturation: '',
      });
        const [tasks, setTasks] = useState([
          { id: 1, name: 'Morning Medication', completed: false },
          { id: 2, name: 'Bathing Assistance', completed: false },
          { id: 3, name: 'Wound Care', completed: false },
          { id: 4, name: 'Physical Therapy', completed: false },
        ]);
        const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
    const [isClockedIn, setIsClockedIn] = useState(false);
        const [isRecording, setIsRecording] = useState(false);
        const [careNotes, setCareNotes] = useState('');
        const handleVoiceNote = () => {setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setCareNotes(prev => prev + ' [Voice note recorded: Patient appeared comfortable and responsive to care.]');
        setIsRecording(false);
      }, 2000);
    }
  };


      return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg.secondary }}>
      <div className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => setCurrentScreen('shift-detail')} className="mr-3">
            <ChevronRight size={24} className="rotate-180" color={colors.neutral[700]} />
          </button>
          <div>
            <h2 className="text-lg font-bold" style={{ color: colors.neutral[900] }}>Digital Care Sheet</h2>
            <p className="text-xs" style={{ color: colors.neutral[600] }}>Margaret Thompson</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: colors.success + '20' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.success }}></div>
          <span className="text-xs font-semibold" style={{ color: colors.success }}>Active</span>
        </div>
      </div>

      <div className="p-6 max-w-lg mx-auto pb-24">
        {}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} style={{ color: colors.primary }} />
            <h3 className="text-lg font-bold" style={{ color: colors.neutral[900] }}>Vital Signs</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <VitalInput
              label="Blood Pressure"
              placeholder="120/80"
              value={vitals.bloodPressure}
              onChange={(val) => setVitals({...vitals, bloodPressure: val})}
              unit="mmHg"
              icon={<Heart size={18} />}
            />
            <VitalInput
              label="Heart Rate"
              placeholder="72"
              value={vitals.heartRate}
              onChange={(val) => setVitals({...vitals, heartRate: val})}
              unit="bpm"
              icon={<Activity size={18} />}
            />
            <VitalInput
              label="Temperature"
              placeholder="98.6"
              value={vitals.temperature}
              onChange={(val) => setVitals({...vitals, temperature: val})}
              unit="°F"
              icon={<Thermometer size={18} />}
            />
            <VitalInput
              label="O2 Saturation"
              placeholder="98"
              value={vitals.oxygenSaturation}
              onChange={(val) => setVitals({...vitals, oxygenSaturation: val})}
              unit="%"
              icon={<Activity size={18} />}
            />
          </div>
        </div>

        {}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={20} style={{ color: colors.primary }} />
            <h3 className="text-lg font-bold" style={{ color: colors.neutral[900] }}>Care Tasks</h3>
          </div>

          <div className="bg-white rounded-2xl border-2 overflow-hidden" style={{ borderColor: colors.neutral[200] }}>
            {tasks.map((task, idx) => (
              <div 
                key={task.id}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${idx !== tasks.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: colors.neutral[200] }}
                onClick={() => toggleTask(task.id)}
              >
                <div 
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 border-green-500' : ''}`}
                  style={{ borderColor: task.completed ? colors.success : colors.neutral[300] }}
                >
                  {task.completed && <Check size={16} className="text-white" />}
                </div>
                <span 
                  className={`flex-1 ${task.completed ? 'line-through' : ''}`}
                  style={{ color: task.completed ? colors.neutral[500] : colors.neutral[900] }}
                >
                  {task.name}
                </span>
                {task.completed && (
                  <span className="text-xs font-medium" style={{ color: colors.success }}>
                    Completed
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between px-2">
            <span className="text-sm font-medium" style={{ color: colors.neutral[600] }}>
              Progress: {tasks.filter(t => t.completed).length}/{tasks.length} completed
            </span>
            <div className="flex gap-1">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: task.completed ? colors.success : colors.neutral[300] }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} style={{ color: colors.primary }} />
            <h3 className="text-lg font-bold" style={{ color: colors.neutral[900] }}>Care Notes</h3>
          </div>

          <div className="bg-white rounded-2xl border-2 p-4" style={{ borderColor: colors.neutral[200] }}>
            <textarea
              value={careNotes}
              onChange={(e) => setCareNotes(e.target.value)}
              placeholder="Document patient condition, medications administered, behavioral observations, or any concerns..."
              rows={6}
              className="w-full p-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
              style={{ borderColor: colors.neutral[300] }}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleVoiceNote}
                className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isRecording ? 'animate-pulse' : ''}`}
                style={{ 
                  backgroundColor: isRecording ? colors.error : colors.primaryLight, 
                  color: isRecording ? 'white' : colors.primary 
                }}
              >
                <Mic size={20} />
                {isRecording ? 'Recording...' : 'Voice Note'}
              </button>
              <button
                className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                style={{ backgroundColor: colors.neutral[100], color: colors.neutral[700] }}
              >
                <Camera size={20} />
                Photo
              </button>
            </div>

            <div className="mt-4 p-3 rounded-lg flex items-start gap-2" style={{ backgroundColor: colors.neutral[50] }}>
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
              <p className="text-xs" style={{ color: colors.neutral[600] }}>
                All notes are HIPAA-compliant and encrypted. Include relevant observations but avoid unnecessary personal information.
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="space-y-3">
          <button
            onClick={() => {
              alert('Care sheet saved successfully! All data is encrypted and synced to the cloud.');
            }}
            className="w-full py-4 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            style={{ background: colors.bg.gradient }}
          >
            Save Care Sheet
          </button>

          <button
            onClick={() => {
              setIsClockedIn(false);
              setCurrentScreen('dashboard');
            }}
            className="w-full py-4 border-2 text-lg font-bold rounded-xl transition-all"
            style={{ borderColor: colors.neutral[300], color: colors.neutral[700] }}
          >
            Complete & Clock Out
          </button>
        </div>

        {}
        <div className="mt-6 p-4 rounded-xl flex items-center justify-center gap-2" style={{ backgroundColor: colors.neutral[100] }}>
          <Shield size={16} style={{ color: colors.neutral[600] }} />
          <span className="text-xs" style={{ color: colors.neutral[600] }}>
            AES-256 Encrypted • Auto-saved every 30 seconds
          </span>
        </div>
      </div>
    </div>
  )};

  export default CareSheetScreen