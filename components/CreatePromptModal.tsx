"use client"
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import ColorPicker from './ColorPicker';

const CreatePromptModal: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');

  const handleCreatePrompt = () => {
    console.log('Creating prompt with color:', selectedColor);

    // create prompt logic here
  };

  return (
    <>
      <h1 className='font-semibold text-xl'>Create new prompt</h1>
      <Input placeholder='Prompt name' type='text' />
      <Textarea placeholder='Prompt content' />
      <ColorPicker
        onColorChange={setSelectedColor}
      />
      <Button onClick={handleCreatePrompt}>Create</Button>
    </>
  );
};

export default CreatePromptModal;
