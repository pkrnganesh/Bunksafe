import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/system';

const StyledQuillContainer = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)', /* No shadow on top */
    padding: '20px',
    height: '100%',
    maxHeight: 'calc(100vh - 150px)',
    overflow: 'hidden',
    '& .ql-toolbar': {
        backgroundColor: 'white',
        borderRadius: '12px',
        marginBottom: '12px',
    },
    '& .ql-container': {
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        padding: '12px',
        color: '#333',
    },
    '& .ql-editor': {
        minHeight: 'calc(100vh - 300px)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '1.1rem',
    }
}));

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
    ['blockquote'],
    ['formula'],
    ['indent', '-1', '+1'],
  ],
};

const Editor = ({ content, setContent }) => {
  return (
    <StyledQuillContainer>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Start typing here..."
      />
    </StyledQuillContainer>
  );
};

export default Editor;
