"use client"
import React, { useState } from 'react';
import { ColorResult, CirclePicker } from 'react-color';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  predefinedColor?: string
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange, predefinedColor }) => {
  const [selectedColor, setSelectedColor] = useState<string>(predefinedColor || '#ffffff');

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    onColorChange(color.hex); // Pass the selected color to the parent component
  };

  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <h1>Pick a color</h1>
                <div style={{ backgroundColor: selectedColor }} className='w-4 h-4 rounded-full' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              <CirclePicker color={selectedColor} onChange={handleColorChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};

export default ColorPicker;
