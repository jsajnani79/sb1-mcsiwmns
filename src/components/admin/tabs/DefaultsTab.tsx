import React, { useState } from 'react';
import { MapPin, Building2, Plus } from 'lucide-react';
import { LocationList } from '../defaults/LocationList';
import { LocationForm } from '../defaults/LocationForm';
import { LabInfoForm } from '../defaults/LabInfoForm';
import { useLocationStore } from '../../../store/locationStore';
import { useLabStore } from '../../../store/labStore';
import { Location } from '../../../types/location';

export function DefaultsTab() {
  const { locations, addLocation, updateLocation, deleteLocation } = useLocationStore();
  const { labInfo, updateLabInfo } = useLabStore();
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const handleLocationSubmit = (data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingLocation) {
      updateLocation(editingLocation.id, data);
    } else {
      addLocation(data);
    }
    setShowLocationForm(false);
    setEditingLocation(null);
  };

  return (
    <div className="space-y-8">
      {/* Lab Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Lab Information</h2>
        </div>
        <LabInfoForm
          labInfo={labInfo}
          onSubmit={updateLabInfo}
        />
      </div>

      {/* Locations Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Study Locations</h2>
          </div>
          {!showLocationForm && (
            <button
              onClick={() => setShowLocationForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Location
            </button>
          )}
        </div>

        {showLocationForm ? (
          <LocationForm
            initialData={editingLocation}
            onSubmit={handleLocationSubmit}
            onCancel={() => {
              setShowLocationForm(false);
              setEditingLocation(null);
            }}
          />
        ) : (
          <LocationList
            locations={locations}
            onEdit={(location) => {
              setEditingLocation(location);
              setShowLocationForm(true);
            }}
            onDelete={deleteLocation}
          />
        )}
      </div>
    </div>
  );
}