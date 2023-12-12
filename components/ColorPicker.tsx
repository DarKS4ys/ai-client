"use client"
import React, { useState } from 'react';
import { ColorResult, CirclePicker } from 'react-color';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff'); // Default color

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    onColorChange(color.hex); // Pass the selected color to the parent component
  };

  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Pick a color
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
