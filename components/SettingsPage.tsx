import React, { useState } from 'react';
import { UserIcon, SettingsIcon, BellIcon } from './Icons'; // Assuming more icons exist

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');

  const settingsOptions = [
    { id: 'edit-profile', label: 'Edit Profile', icon: <UserIcon className="w-6 h-6" /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon className="w-6 h-6" /> },
    { id: 'account', label: 'Account Settings', icon: <SettingsIcon className="w-6 h-6" /> },
    // Add more settings options here
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'edit-profile':
        return <div><h2 className="text-2xl font-bold mb-4">Edit Profile</h2><p>Profile editing options will be here.</p></div>;
      case 'notifications':
        return <div><h2 className="text-2xl font-bold mb-4">Notifications</h2><p>Notification settings will be here.</p></div>;
      case 'account':
        return <div><h2 className="text-2xl font-bold mb-4">Account Settings</h2><p>Account privacy and security settings will be here.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-highlight mb-8">Settings</h1>
      <div className="flex flex-col md:flex-row bg-secondary rounded-lg shadow-lg overflow-hidden">
        <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-accent p-4">
          <nav>
            <ul>
              {settingsOptions.map(opt => (
                <li key={opt.id}>
                  <button
                    onClick={() => setActiveTab(opt.id)}
                    className={`flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors duration-200 mb-2 ${activeTab === opt.id ? 'bg-highlight text-white' : 'hover:bg-accent'}`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;