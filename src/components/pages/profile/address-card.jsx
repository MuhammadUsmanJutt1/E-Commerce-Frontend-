import React from 'react';
import { MapPin, Trash2, CheckCircle, Star } from 'lucide-react';

const AddressCard = ({ address, onDelete, onSetDefault }) => {
    return (
        <div className={`border rounded-lg p-6 relative transition-all duration-300 ${address.isDefault ? 'border-[#B88E2F] bg-[#B88E2F]/5 shadow-sm' : 'border-gray-200 hover:shadow-md'
            }`}>
            {address.isDefault && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-[#B88E2F] bg-[#B88E2F]/10 px-2 py-1 rounded-full">
                    <Star size={12} className="fill-current" />
                    Default
                </div>
            )}

            <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${address.isDefault ? 'bg-[#B88E2F] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                    <MapPin size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">{address.firstName} {address.lastName}</h4>
                    <p className="text-sm text-gray-500">{address.phone}</p>
                </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600 mb-6">
                <p>{address.streetAddress}</p>
                <p>{address.city}, {address.province} {address.zipCode}</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
                {!address.isDefault && (
                    <button
                        onClick={() => onSetDefault(address._id)}
                        className="flex-1 text-sm font-medium text-gray-600 hover:text-[#B88E2F] transition-colors flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={16} />
                        Set as Default
                    </button>
                )}
                <button
                    onClick={() => onDelete(address._id)}
                    className="flex-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                >
                    <Trash2 size={16} />
                    Remove
                </button>
            </div>
        </div>
    );
};

export default AddressCard;
