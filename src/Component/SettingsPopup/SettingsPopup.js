import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './SettingsPopup.css';
import api from '../../store/api';

function SettingsPopup({ onChangeBackgroundColor, onChangeTextColor }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const backgroundColors = [
    { name: 'Black', value: '#000' },
    { name: 'Dark Gray', value: '#333' },
    { name: 'Charcoal', value: '#111' },
    { name: 'Solarized Dark', value: '#002b36' },
  ];

  const textColors = [
    { name: 'Lime', value: 'lime' },
    { name: 'Cyan', value: '#00FFFF' },
    { name: 'Magenta', value: '#FF00FF' },
    { name: 'Yellow', value: '#FFFF00' },
  ];

  const save = async (requestData) => {
    try {
      await api.put(`/v1/settings`, requestData);
    } catch (error) {
      console.error('Failed to save', error);
      if(error.message === 'Network Error'){
        navigate('/login');
      }
    }
  };

  const logout = async () => {
    try {
      await api.post(`/v1/users/logout`);
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
      if(error.message === 'Network Error'){
        navigate('/login');
      }
    }
  };

  return (
    <div>
      <button className="hamburger-button" onClick={toggleSettings}>
        ☰
      </button>
      {isSettingsOpen && (
        <div className="settings-popup">
          <button
            className="close-button"
            onClick={toggleSettings}
          >
            Close
          </button>
          
          <h3>Change Background Color</h3>
          {backgroundColors.map((color) => (
            <div
              key={color.value}
              className="color-option"
              onClick={() => {
                save({ backgroundColor: color.value });
                onChangeBackgroundColor(color.value);
                setIsSettingsOpen(false);
              }}
            >
              <div
                className="color-sample"
                style={{ backgroundColor: color.value }}
              ></div>
              {color.name}
            </div>
          ))}
          <h3>Change Text Color</h3>
          {textColors.map((color) => (
            <div
              key={color.value}
              className="color-option"
              onClick={() => {
                save({ textColor: color.value });
                onChangeTextColor(color.value);
                setIsSettingsOpen(false);
              }}
            >
              <div
                className="color-sample"
                style={{ backgroundColor: color.value }}
              ></div>
              {color.name}
            </div>
          ))}
          <div className='settings-buttons'>
            <button className='settings-button' onClick={() => navigate('/nickname')}>Change Nickname</button>
            <button className='settings-button' onClick={logout}>LogOut</button>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default SettingsPopup;
