import React from 'react';

interface FilePickerProps {
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
}

export const FilePicker: React.FC<FilePickerProps> = ({ selectedFile, onFileSelect }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file == null || !file.name.endsWith('.txt')) {
      return;
    }

    const filePath = file.path;
    onFileSelect(filePath);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      {selectedFile && <p>Selected file: {selectedFile}</p>}
    </div>
  );
};