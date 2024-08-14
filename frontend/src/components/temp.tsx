import React, { useState, useRef, useEffect } from 'react';

const ProfileDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Icon */}
            <div onClick={toggleDropdown} className="cursor-pointer">
                <img src="/path/to/profile-icon.png" alt="Profile" className="w-8 h-8 rounded-full"/>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <ul className="py-1">
                        <li>
                            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                View Profile
                            </a>
                        </li>
                        <li>
                            <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
