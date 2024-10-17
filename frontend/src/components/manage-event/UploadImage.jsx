import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  position: 'relative',
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 50,
  height: 50,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


export default function UploadImage(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    maxSize: 15728640,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1, color: "red" }}
        size="small"
        onClick={() => removeFile(file.name)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <><Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: 'primary.main',
        borderRadius: '10px',
        paddingX: 15,
        paddingY: 7,
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'secondary.main'
        }
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 50, color: 'primary.main' }} />
      <Typography variant="h3" sx={{ mt: 1 }}>
        Upload your image
      </Typography>
      <Typography sx={{ color: "primary.main", variant: "p", fontSize: 12}}>
        Any image format up to 15MB
      </Typography>
      </Box><aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </>
  );
}