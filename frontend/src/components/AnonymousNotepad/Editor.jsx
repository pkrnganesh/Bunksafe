import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/system';

const EditorWrapper = styled('div')(({ isMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
}));

const StyledQuillContainer = styled('div')(({ isMobile }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  width: '100%',
  overflow: 'hidden',
  '& .ql-toolbar': {
    backgroundColor: '#f8f9fa',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid #e2e8f0',
    padding: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  '& .ql-formats': {
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
  },
  '& .ql-picker-label': {
    padding: '2px 4px',
  },
  '& .ql-container': {
    flex: 1,
    overflow: 'auto',
    border: 'none',
    fontSize: isMobile ? '16px' : '18px',
  },
  '& .ql-editor': {
    padding: '12px',
  },
}));

const mobileModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const desktopModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const Editor = ({ content, setContent }) => {
  const isMobile = useIsMobile();

  const handleChange = useCallback((value) => {
    setContent(value);
  }, [setContent]);

  return (
    <EditorWrapper isMobile={isMobile}>
      <StyledQuillContainer isMobile={isMobile}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={isMobile ? mobileModules : desktopModules}
          preserveWhitespace={true}
        />
      </StyledQuillContainer>
    </EditorWrapper>
  );
};

export default Editor;