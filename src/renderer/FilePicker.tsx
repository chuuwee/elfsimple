import { Button, Card, Elevation, FileInput, H5, Intent } from '@blueprintjs/core';
import { Tooltip2 as Tooltip } from '@blueprintjs/popover2';
import React, { useCallback, useMemo } from 'react';
import { useLogFilePath, useSetLogFilePath } from './contexts/hooks';
import { styled } from 'styled-components';

const StyledCard = styled(Card)`
  width: fit-content;
  height: fit-content;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const getFilename = (path: string) => path.split(/[\\/]/).pop();

interface FilePickerProps {}

export const FilePicker: React.FC<FilePickerProps> = () => {
  const selectedFile = useLogFilePath();
  const setLogFilePath = useSetLogFilePath();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file == null || !file.name.endsWith('.txt')) {
      return;
    }

    setLogFilePath(file.path);
    await window.api.invoke('setLogPath', file.path);
  };

  const clearLogFilePath = useCallback(() => {
    setLogFilePath(null);
  }, [setLogFilePath]);

  const text = useMemo(() => {
    if (selectedFile == null) {
      return 'Choose file...';
    }
    const filename = getFilename(selectedFile);
    return <Tooltip content={selectedFile}>{filename}</Tooltip>;
   }, [selectedFile]);

  return (
    <StyledCard interactive={true} elevation={Elevation.TWO}>
      <H5>Log File</H5>
      <p>
        <Container>
          <FileInput
              hasSelection={!!selectedFile}
              inputProps={{accept: ".txt"}}
              text={text}
              onInputChange={handleFileChange}
          />
          <Button icon="cross" intent={Intent.DANGER} onClick={clearLogFilePath} />
        </Container>
      </p>
    </StyledCard>
  );
};