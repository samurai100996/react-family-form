import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {db, collection, addDoc } from '../firebase/config';

const FamilyForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      dob: '',
      nativePlace: '',
      currentPlace: '',
      contactNumber: '',
      maritalStatus: 'Single',
      occupation: '',
      spouseFirstName: '',
      spouseLastName: '',
      spouseDob: '',
      spouseNativePlace: '',
      spouseCurrentPlace: '',
      spouseContactNumber: '',
      spouseOccupation: '',
      numberOfSons: 0,
      numberOfDaughters: 0,
      sons: [],
      daughters: []
    });
  
    const [sonForms, setSonForms] = useState([]);
    const [daughterForms, setDaughterForms] = useState([]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSonChange = (index, e) => {
      const { name, value } = e.target;
      const updatedSons = [...formData.sons];
      updatedSons[index] = {
        ...updatedSons[index],
        [name]: value
      };
      setFormData(prev => ({
        ...prev,
        sons: updatedSons
      }));
    };
  
    const handleDaughterChange = (index, e) => {
      const { name, value } = e.target;
      const updatedDaughters = [...formData.daughters];
      updatedDaughters[index] = {
        ...updatedDaughters[index],
        [name]: value
      };
      setFormData(prev => ({
        ...prev,
        daughters: updatedDaughters
      }));
    };
  
    const addSonForm = () => {
      setSonForms([...sonForms, {}]);
      setFormData(prev => ({
        ...prev,
        sons: [...prev.sons, {
          firstName: '',
          lastName: '',
          dob: '',
          contactNumber: '',
          currentPlace: '',
          occupation: '',
          maritalStatus: 'Single'
        }]
      }));
    };
  
    const addDaughterForm = () => {
      setDaughterForms([...daughterForms, {}]);
      setFormData(prev => ({
        ...prev,
        daughters: [...prev.daughters, {
          firstName: '',
          lastName: '',
          dob: '',
          contactNumber: '',
          currentPlace: '',
          occupation: '',
          maritalStatus: 'Single'
        }]
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
  
      // Basic validation
      if (!formData.firstName || !formData.lastName || !formData.dob) {
        setSubmitError('Please fill all required fields');
        setIsSubmitting(false);
        return;
      }
  
      try {
        const docRef = await addDoc(collection(db, 'families'), formData);
        console.log('Document written with ID: ', docRef.id);
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          dob: '',
          nativePlace: '',
          currentPlace: '',
          contactNumber: '',
          maritalStatus: 'Single',
          occupation: '',
          spouseFirstName: '',
          spouseLastName: '',
          spouseDob: '',
          spouseNativePlace: '',
          spouseCurrentPlace: '',
          spouseContactNumber: '',
          spouseOccupation: '',
          numberOfSons: 0,
          numberOfDaughters: 0,
          sons: [],
          daughters: []
        });
        setSonForms([]);
        setDaughterForms([]);
  
        // Navigate after success
        setTimeout(() => {
          navigate('/family-list');
        }, 1500);
      } catch (error) {
        console.error('Error adding document: ', error);
        setSubmitError('Failed to submit form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Family Head Information
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Family Head Information */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          कुटुंब प्रमुख की जानकारी / कुटुंबप्रमुख माहिती
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name / पहला नाम / पहिले नाव *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name / उपनाम / आडनाव *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth / जन्म तिथि / जन्मतारीख *
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nativePlace">
              Native Place / मूल निवास स्थान / मूळ गाव
            </label>
            <input
              type="text"
              id="nativePlace"
              name="nativePlace"
              value={formData.nativePlace}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPlace">
              Current Place / वर्तमान निवास स्थान / सध्याचे ठिकाण
            </label>
            <input
              type="text"
              id="currentPlace"
              name="currentPlace"
              value={formData.currentPlace}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
              Contact Number / संपर्क नंबर / संपर्क क्रमांक
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maritalStatus">
              Marital Status / वैवाहिक स्थिति / वैवाहिक स्थिती *
            </label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Single">Single / अविवाहित / अविवाहित</option>
              <option value="Married">Married / विवाहित / विवाहित</option>
              <option value="Divorced">Divorced / तलाकशुदा / घटस्फोटित</option>
              <option value="Widowed">Widowed / विधवा/विधुर / विधवा</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occupation">
              Occupation / व्यवसाय / व्यवसाय
            </label>
            <select
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select</option>
              <option value="Retired">Retired / सेवानिवृत्त / निवृत्त</option>
              <option value="Housewife">Housewife / गृहिणी / गृहिणी</option>
              <option value="Salaried">Salaried / वेतनभोगी / नोकरदार</option>
              <option value="Business">Business / व्यवसाय / व्यवसाय</option>
            </select>
          </div>
        </div>
        
        {/* Spouse Information - Only show if married */}
        {formData.maritalStatus === 'Married' && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 mt-8">
              Spouse Information (पति/पत्नी की जानकारी / पती/पत्नी माहिती)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spouseFirstName">
                  First Name / पहला नाम / पहिले नाव
                </label>
                <input
                  type="text"
                  id="spouseFirstName"
                  name="spouseFirstName"
                  value={formData.spouseFirstName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spouseLastName">
                  Last Name / उपनाम / आडनाव
                </label>
                <input
                  type="text"
                  id="spouseLastName"
                  name="spouseLastName"
                  value={formData.spouseLastName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spouseDob">
                  Date of Birth / जन्म तिथि / जन्मतारीख
                </label>
                <input
                  type="date"
                  id="spouseDob"
                  name="spouseDob"
                  value={formData.spouseDob}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spouseNativePlace">
                  Native Place / मूल निवास स्थान / मूळ गाव
                </label>
                <input
                  type="text"
                  id="spouseNativePlace"
                  name="spouseNativePlace"
                  value={formData.spouseNativePlace}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spouseCurrentPlace">
                  Current Place / वर्तमान निवास स्थान / सध्याचे ठिकाण
                </label>
                <input
                  type="text"
                  id="spouseCurrentPlace"
                  name="spouseCurrentPlace"
                  value={formData.spouseCurrentPlace}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spouseContactNumber">
                  Contact Number / संपर्क नंबर / संपर्क क्रमांक
                </label>
                <input
                  type="tel"
                  id="spouseContactNumber"
                  name="spouseContactNumber"
                  value={formData.spouseContactNumber}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spouseOccupation">
                  Occupation / व्यवसाय / व्यवसाय
                </label>
                <select
                  id="spouseOccupation"
                  name="spouseOccupation"
                  value={formData.spouseOccupation}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select</option>
                  <option value="Retired">Retired / सेवानिवृत्त / निवृत्त</option>
                  <option value="Housewife">Housewife / गृहिणी / गृहिणी</option>
                  <option value="Salaried">Salaried / वेतनभोगी / नोकरदार</option>
                  <option value="Business">Business / व्यवसाय / व्यवसाय</option>
                </select>
              </div>
            </div>
          </>
        )}
        
        {/* Children Information */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 mt-8">
          Children Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfSons">
              Number of Sons / पुत्रों की संख्या / मुलांची संख्या
            </label>
            <input
              type="number"
              id="numberOfSons"
              name="numberOfSons"
              value={formData.numberOfSons}
              onChange={(e) => {
                handleChange(e);
                setSonForms(Array(parseInt(e.target.value) || 0).fill({}));
              }}
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfDaughters">
              Number of Daughters / पुत्रियों की संख्या / मुलींची संख्या
            </label>
            <input
              type="number"
              id="numberOfDaughters"
              name="numberOfDaughters"
              value={formData.numberOfDaughters}
              onChange={(e) => {
                handleChange(e);
                setDaughterForms(Array(parseInt(e.target.value) || 0).fill({}));
              }}
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        
        {/* Sons Information */}
        {sonForms.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Sons Information (पुत्रों की जानकारी / मुलांची माहिती)
            </h3>
            
            {sonForms.map((_, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-3">Son {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First Name / पहला नाम / पहिले नाव
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.sons[index]?.firstName || ''}
                      onChange={(e) => handleSonChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last Name / उपनाम / आडनाव
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.sons[index]?.lastName || ''}
                      onChange={(e) => handleSonChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Date of Birth / जन्म तिथि / जन्मतारीख
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.sons[index]?.dob || ''}
                      onChange={(e) => handleSonChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Contact Number / संपर्क नंबर / संपर्क क्रमांक
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.sons[index]?.contactNumber || ''}
                      onChange={(e) => handleSonChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Current Place / वर्तमान निवास स्थान / सध्याचे ठिकाण
                    </label>
                    <input
                      type="text"
                      name="currentPlace"
                      value={formData.sons[index]?.currentPlace || ''}
                      onChange={(e) => handleSonChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Occupation / व्यवसाय / व्यवसाय
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.sons[index]?.occupation || ''}
                      onChange={(e) => handleSonChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Marital Status / वैवाहिक स्थिति / वैवाहिक स्थिती
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.sons[index]?.maritalStatus || 'Single'}
                      onChange={(e) => handleSonChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="Single">Single / अविवाहित / अविवाहित</option>
                      <option value="Married">Married / विवाहित / विवाहित</option>
                      <option value="Divorced">Divorced / तलाकशुदा / घटस्फोटित</option>
                      <option value="Widowed">Widowed / विधवा/विधुर / विधवा</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Daughters Information */}
        {daughterForms.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Daughters Information (पुत्रियों की जानकारी / मुलींची माहिती)
            </h3>
            
            {daughterForms.map((_, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-3">Daughter {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First Name / पहला नाम / पहिले नाव
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.daughters[index]?.firstName || ''}
                      onChange={(e) => handleDaughterChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last Name / उपनाम / आडनाव
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.daughters[index]?.lastName || ''}
                      onChange={(e) => handleDaughterChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Date of Birth / जन्म तिथि / जन्मतारीख
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.daughters[index]?.dob || ''}
                      onChange={(e) => handleDaughterChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Contact Number / संपर्क नंबर / संपर्क क्रमांक
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.daughters[index]?.contactNumber || ''}
                      onChange={(e) => handleDaughterChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Current Place / वर्तमान निवास स्थान / सध्याचे ठिकाण
                    </label>
                    <input
                      type="text"
                      name="currentPlace"
                      value={formData.daughters[index]?.currentPlace || ''}
                      onChange={(e) => handleDaughterChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Occupation / व्यवसाय / व्यवसाय
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.daughters[index]?.occupation || ''}
                      onChange={(e) => handleDaughterChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Marital Status / वैवाहिक स्थिति / वैवाहिक स्थिती
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.daughters[index]?.maritalStatus || 'Single'}
                      onChange={(e) => handleDaughterChange(index, e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="Single">Single / अविवाहित / अविवाहित</option>
                      <option value="Married">Married / विवाहित / विवाहित</option>
                      <option value="Divorced">Divorced / तलाकशुदा / घटस्फोटित</option>
                      <option value="Widowed">Widowed / विधवा/विधुर / विधवा</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
         {/* Submit Section */}
         <div className="flex flex-col items-center justify-center mt-8 space-y-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>

          {submitError && (
            <div className="text-red-600 bg-red-100 px-4 py-2 rounded-md">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="text-green-600 bg-green-100 px-4 py-2 rounded-md">
              Form submitted successfully! Redirecting to family list...
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FamilyForm;