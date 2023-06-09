import React from 'react';
import { IconType } from 'react-icons';
import { FiChevronDown } from 'react-icons/fi';

interface SidebarRowProps {
  src?: string;
  Icon?: IconType;
  title: string;
  onClick?: () => void; // add an onClick event handler
}

function SidebarRow({ src, Icon, title, onClick }: SidebarRowProps) {
  const handleSidebarRowClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className='sidebarRow flex items-center p-4 cursor-pointer hover:bg-white-200 rounded-lg' onClick={handleSidebarRowClick}>
      {Icon && <Icon className='text-indigo-600 text-2xl' />}
      <h4 className='ml-5 font-medium'>{title}</h4>
      <FiChevronDown className='ml-auto text-gray-500 text-xl' />
    </div>
  );
}

export default SidebarRow;
