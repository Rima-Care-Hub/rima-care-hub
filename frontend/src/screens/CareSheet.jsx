import React, { useState } from 'react';
import './CareSheet.css';
import { FaCheckCircle } from 'react-icons/fa';   // for Care Tasks
import { BsHeartPulse } from 'react-icons/bs';    // for Vital Signs
import { MdBloodtype } from 'react-icons/md';
import { FaHeartbeat } from 'react-icons/fa';
import { BsThermometerHalf } from 'react-icons/bs';
import { GiDroplets } from 'react-icons/gi';

const CareSheet = ({ patient }) => {
    const safePatient = patient || { name: "", status: "" };

    const [tasks, setTasks] = useState([
        { id: 1, name: 'Morning Medication', completed: false },
        { id: 2, name: 'Bathing Assistance', completed: true },
        { id: 3, name: 'Wound Care', completed: true },
        { id: 4, name: 'Physical Therapy', completed: true }
    ]);

    const [vitals, setVitals] = useState({
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        oxygenSaturation: ''
    });


    const toggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const completedCount = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    return (
        <div className="care-sheet">
            {/* Header */}
            <div className="header">
                <h1>Digital Care Sheet</h1>
                {safePatient.name && (
                    <div className="patient-info">
                        <h2>{safePatient.name}</h2>
                        <span className="status">{safePatient.status}</span>
                    </div>
                )}
            </div>

            {/* Vital Signs */}
            <div className="section">
                <h3>
                    <BsHeartPulse style={{ color: 'blue', fontSize: '20px', marginRight: '8px' }} />
                    Vital Signs
                </h3>
                <div className="vitals-grid">
                    <div className="vital-item">
                        <div className="vital-name">
                            <MdBloodtype style={{ marginRight: '6px', color: '#DC2626' }} />
                            Blood Pressure
                        </div>
                        <input
                            type="text"
                            inputMode="numeric"
                            className="vital-value-input"
                            placeholder="e.g. 120/80"
                            value={vitals.bloodPressure}
                            onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                            pattern="\d{2,3}/\d{2,3}"
                            title="Enter in format: 120/80"
                        />
                        <div className="vital-unit">mmHg</div>
                    </div>

                    <div className="vital-item">
                        <div className="vital-name">
                            <FaHeartbeat style={{ marginRight: '6px', color: '#EF4444' }} />
                            Heart Rate
                        </div>
                        <input
                            type="number"
                            className="vital-value-input"
                            placeholder="e.g. 72"
                            value={vitals.heartRate}
                            onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                            min="30"
                            max="200"
                        />
                        <div className="vital-unit">bpm</div>
                    </div>

                    <div className="vital-item">
                        <div className="vital-name">
                            <BsThermometerHalf style={{ marginRight: '6px', color: '#F59E0B' }} />
                            Temperature
                        </div>
                        <input type="number" className="vital-value-input" placeholder="e.g. 98.6" />
                        <div className="vital-unit">°F</div>
                    </div>

                    <div className="vital-item">
                        <div className="vital-name">
                            <GiDroplets style={{ marginRight: '6px', color: '#3B82F6' }} />
                            O₂ Saturation
                        </div>
                        <input type="number" className="vital-value-input" placeholder="e.g. 98" />
                        <div className="vital-unit">%</div>
                    </div>
                </div>
            </div>

            {/* Care Tasks */}
            <div className="section">
                <h3><FaCheckCircle /> Care Tasks</h3>
                <div className="tasks-list">
                    {tasks.map(task => (
                        <div key={task.id} className="task-item">
                            <label className="task-checkbox">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span className="checkbox-icon">{task.completed ? '☑' : '☐'}</span>
                                <span className={`task-name ${task.completed ? 'completed' : ''}`}>
                                    {task.name}
                                </span>
                            </label>
                            <span className={`task-status ${task.completed ? 'completed' : ''}`}>
                                {task.completed ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="progress">
                    Progress: {completedCount}/{totalTasks} completed
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(completedCount / totalTasks) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Care Notes */}
            <div className="section">
                <h3>🗒️Care Notes</h3>
                <textarea
                    className="notes-input"
                    placeholder="Document patient condition, medications administered, behavioral observations, or any concerns..."
                    rows={6}
                />

                {/* Voice Note and Photo Buttons */}
                <div className="media-buttons">
                    <button className="voice-button">🎤 Voice Note</button>
                    <button className="photo-button media-button">📷 Photo</button>
                </div>

                {/* HIPAA Checkbox */}
                <div className="hipaa-notice">
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <label>
                            All notes are HIPAA-compliant and encrypted. Include relevant observations but avoid unnecessary personal information.
                        </label>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="action-section">
                    <button className="save-button">Save Care Sheet</button>
                    <button className="complete-button">Complete & Clock Out</button>
                </div>
            </div>
        </div>
    );
};

export default CareSheet;