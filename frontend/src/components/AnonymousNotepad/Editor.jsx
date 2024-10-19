import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/system';

const StyledQuillContainer = styled('div')({
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    height: '100%',
    maxHeight: 'calc(100vh - 150px)',
    marginBottom: '80px',
    overflow: 'hidden',
    '& .ql-toolbar': {
        backgroundColor: 'white',
        borderRadius: '12px',
        marginBottom: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
    },
    '@media (max-width: 600px)': {
        padding: '10px',
        marginBottom: '40px',
        '& .ql-toolbar': {
            padding: '5px',
        },
        '& .ql-container': {
            padding: '8px',
        },
        '& .ql-editor': {
            minHeight: 'calc(100vh - 250px)',
            fontSize: '1rem',
        },
    },
});

const mobileModules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean'],
        ],
        handlers: {}
    }
};

const desktopModules = {
    toolbar: {
        container: [
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
            [{ 'indent': '-1' }, { 'indent': '+1' }]
        ],
        handlers: {}
    }
};

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

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
        <StyledQuillContainer>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={isMobile ? mobileModules : desktopModules}
                preserveWhitespace={true}
            />
        </StyledQuillContainer>
    );
};

export default Editor;