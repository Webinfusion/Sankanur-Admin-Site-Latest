import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPost } from '../../services/api-service';
import { insertPostNewEventConst, updatePostEventConst } from '../../services/api-constants';
import Loader from '../../common-components/Loader/Loader';
import PopUp from '../../common-components/PopUp/PopUp';

function PostEventNew({ propsData }) {

  const navigate = useNavigate()
  const location = useLocation();
  const initialData = location.state?.tableData;

  const defaultData = {
    title: '',
    description: '',
    content: '',
    images: [
      { img1: null },
      { img2: null },
      { img3: null }
    ],
    speaker1: '',
    speaker2: '',
    speaker3: '',
    speaker4: '',
    date: '',
    time: dayjs() // Initialize time as current dayjs object
  }

  const [formData, setFormData] = useState(defaultData);
  const [localImages, setLocalImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicApiURL, setDynamicApiURL] = useState(insertPostNewEventConst);
  const [popUpInstance, setPopUpInstance] = useState({open: false, status: '', message: '' });


  useEffect(() => {
    if (initialData && propsData) {
      initialData['time'] = dayjs();
      setFormData(initialData);

      let allImgData = initialData['images']
      let dynamicImg = [];
      allImgData.map((img, index) => {
        dynamicImg.push(Object.values(img));
      })
      setLocalImages(dynamicImg)
      setDynamicApiURL(updatePostEventConst)
    } else {
      setFormData(defaultData)
      setDynamicApiURL(insertPostNewEventConst);
    }
  }, [propsData]);

  const updateFormData = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLocalImagePreview = (file, index) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedLocalImages = [...localImages];
      updatedLocalImages[index] = reader.result;
      setLocalImages(updatedLocalImages);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async (file, index) => {
    if (file) {
      handleLocalImagePreview(file, index);
    }
  };

  const handleBoxClick = (index) => {
    document.getElementById(`upload-button-${index}`).click();
  };

  const handleImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file, index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addNewRecordToDB = (insertingData) => {
    const response = apiPost(dynamicApiURL, insertingData);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const uploadedImages = await Promise.all(
        localImages.map(async (localImage, index) => {
          const fileInput = document.getElementById(`upload-button-${index}`);
          if (fileInput && fileInput.files[0]) {
            const uploadedUrl = await uploadImageToCloudinary(fileInput.files[0]);
            return { [`img${index + 1}`]: uploadedUrl };
          }
          return formData.images[index];
        })
      );

      const formattedTime = formData.time.format('hh:mm A');
      const updatedFormData = {
        ...formData,
        images: uploadedImages,
        time: formattedTime,
      };

      console.log('Form Data on Submit:', updatedFormData);
      addNewRecordToDB(updatedFormData);
      setIsLoading(false);
      triggerPopup('success', 'Data updated Successfully !!')
      navigate('/nursing/post-event-table')
    } catch (error) {
      console.error('Error uploading images:', error);
      setIsLoading(false);
      triggerPopup('error', 'Error Occurs while updating the data !!')
    }
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
        },
      },
    },
  });

  const triggerPopup = (status, message) => {
    setPopUpInstance({open: true,status,message,});
    setTimeout(() => {setPopUpInstance((prev) => ({...prev,open: false,}));}, 3000);
  };

  return (
    <ThemeProvider theme={theme}>

      {isLoading && <Loader />}
      {popUpInstance.open && <PopUp status={popUpInstance.status} message={popUpInstance.message}/>}

      <Box display={'flex'} justifyContent="space-between" mb={1}>
        <Typography variant="h5" fontWeight={'bold'}>
          Pre Event Table
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/nursing/pre-event-table')}
          sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold' }}
        >
          Show All Post Events
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" mb={1}>Browse File or Drag and Drop</Typography>
          <Grid container spacing={2}>
            {formData.images.map((imageObj, index) => (
              <Grid item xs={4} key={index} textAlign="center">
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    border: '2px dashed #aaa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: 'rgb(225, 244, 255)'
                  }}
                  onClick={() => handleBoxClick(index)}
                  onDrop={(e) => handleImageDrop(e, index)}
                  onDragOver={handleDragOver}
                >
                  {localImages[index] ? (
                    <img
                      src={localImages[index]}
                      alt={`upload-preview-${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography>Upload Image {index + 1}</Typography>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], index)}
                    style={{ display: 'none' }}
                    id={`upload-button-${index}`}
                  />
                </Box>
                {localImages[index] && (
                  <Button
                    onClick={() => {
                      // const updatedImages = [...formData.images];
                      // updatedImages[index] = { [`img${index + 1}`]: null };  // Reset image
                      // updateFormData('images', updatedImages); 
                      handleBoxClick(index);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: '10px', background: 'var(--mainBg)', color: 'white' }}
                  >
                    Re-upload
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Title Section */}
        <Grid item xs={12}>
          <Typography variant="h6">Title</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)} // Dynamically update title
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)} // Dynamically update description
          />
        </Grid>

        {/* Rich Text Editor Section */}
        <Grid item xs={12}>
          <Typography variant="h6">Content</Typography>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) => updateFormData('content', value)} // Dynamically update content
            style={{
              fontSize: '16px',
              backgroundColor: 'white', // Set background color to white
              borderRadius: '5px',
              padding: '10px',
              paddingBottom: '50px',
              height: '200px',
            }}
          />
        </Grid>

        {/* Speaker Fields */}
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 1" value={formData.speaker1} onChange={(e) => updateFormData('speaker1', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 2" value={formData.speaker2} onChange={(e) => updateFormData('speaker2', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 3" value={formData.speaker3} onChange={(e) => updateFormData('speaker3', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Speaker 4" value={formData.speaker4} onChange={(e) => updateFormData('speaker4', e.target.value)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} value={formData.date} onChange={(e) => updateFormData('date', e.target.value)} />
        </Grid>

        {/* Time Picker Section */}
        <Grid item xs={12} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="HR:MM - AM/PM"
              value={formData.time} // Use dayjs object here
              onChange={(newTime) => updateFormData('time', newTime)} // Update with dayjs object
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  value={formData.time ? formData.time.format('hh:mm A') : ''} // Format time as hr:min AM/PM
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold'}}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default PostEventNew;
