"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TestReport from '@/components/TestReport';

const HeartHealthForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    chestpain: '',
    restingBP: '',
    serumcholestrol: '',
    fastingbloodsugar: '',
    restingrelectro: '',
    maxheartrate: '',
    exerciseangia: '',
    oldpeak: '',
    noofmajorvessels: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testType: 'test-2',
          formData
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReportData({
          name: formData.name,
          testType: 'test-2',
          formData,
          prediction: data.data
        });
        setShowReport(true);
      } else {
        setError(data.error || 'Failed to process prediction');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process prediction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form steps
  const formSteps = [
    // Step 1: Personal Information
    <motion.div 
      key="step1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.h2 variants={formVariants} className="text-2xl font-bold text-green-800 mb-6">Personal Information</motion.h2>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your name"
        />
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your age"
        />
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select gender</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Chest Pain Type</label>
        <select
          name="chestpain"
          value={formData.chestpain}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select chest pain type</option>
          <option value="0">Type 0</option>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
          <option value="3">Type 3</option>
        </select>
      </motion.div>
    </motion.div>,
    
    // Step 2: Blood Measurements
    <motion.div 
      key="step2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.h2 variants={formVariants} className="text-2xl font-bold text-green-800 mb-6">Blood Measurements</motion.h2>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Resting Blood Pressure</label>
        <input
          type="number"
          name="restingBP"
          value={formData.restingBP}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter resting blood pressure"
        />
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Serum Cholesterol</label>
        <input
          type="number"
          name="serumcholestrol"
          value={formData.serumcholestrol}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter cholesterol level"
        />
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Fasting Blood Sugar</label>
        <select
          name="fastingbloodsugar"
          value={formData.fastingbloodsugar}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select option</option>
          <option value="0">≤ 120 mg/dl</option>
          <option value="1">&gt; 120 mg/dl</option>
        </select>
      </motion.div>
    </motion.div>,
    
    // Step 3: Cardiac Measurements
    <motion.div 
      key="step3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.h2 variants={formVariants} className="text-2xl font-bold text-green-800 mb-6">Cardiac Measurements</motion.h2>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Resting Electrocardiographic Results</label>
        <select
          name="restingrelectro"
          value={formData.restingrelectro}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select result</option>
          <option value="0">Normal</option>
          <option value="1">Abnormal</option>
        </select>
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Maximum Heart Rate Achieved</label>
        <input
          type="number"
          name="maxheartrate"
          value={formData.maxheartrate}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter maximum heart rate"
        />
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Exercise Induced Angina</label>
        <select
          name="exerciseangia"
          value={formData.exerciseangia}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select option</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </motion.div>
    </motion.div>,
    
    // Step 4: Additional Cardiac Information
    <motion.div 
      key="step4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.h2 variants={formVariants} className="text-2xl font-bold text-green-800 mb-6">Additional Cardiac Information</motion.h2>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">ST Depression Induced by Exercise</label>
        <input
          type="number"
          name="oldpeak"
          value={formData.oldpeak}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter ST depression value"
          step="0.1"
        />
      </motion.div>
      
      <motion.div variants={formVariants} className="mb-4">
        <label className="block text-green-700 mb-2">Number of Major Vessels</label>
        <select
          name="noofmajorvessels"
          value={formData.noofmajorvessels}
          onChange={handleChange}
          className="w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Select number</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </motion.div>
      
      <motion.div variants={formVariants} className="mt-8">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors duration-300"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
        </button>
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error}</p>
        )}
      </motion.div>
    </motion.div>
  ];

  // Progress indicator
  const progress = ((currentStep + 1) / formSteps.length) * 100;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-green-100 h-2">
          <motion.div 
            className="bg-green-500 h-2"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Header */}
        <div className="bg-green-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Heart Health Assessment</h1>
          <p className="text-green-100">Step {currentStep + 1} of {formSteps.length}</p>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          {formSteps[currentStep]}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded ${
                currentStep === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Previous
            </button>
            
            {currentStep < formSteps.length - 1 && (
              <button
                onClick={() => setCurrentStep(prev => Math.min(formSteps.length - 1, prev + 1))}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      
      {showReport && reportData && (
        <TestReport 
          data={reportData} 
          onClose={() => setShowReport(false)} 
        />
      )}
    </div>
  );
};

export default HeartHealthForm;