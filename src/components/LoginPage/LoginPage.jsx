import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const login = ()=> {
        navigate('/dashboard')
    }

    const paperStyle = {
        padding: 70,
        height: '40vh',
        paddingTop: '40px',
        width: 450,
        margin: '20px auto',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
    };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnStyle = { margin: '8px 0', padding: '10px', borderRadius:'5px', backgroundColor:'#379b9f', color: 'white', fontWeight:'bold' };
    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '12px',
                borderColor: 'white'
            },
            '&:hover fieldset': {
                borderColor: '#ffffff'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#ffffff'
            },
            '& input': {
                color: 'white'
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Set the default label color to white
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Set the label color to white when focused
            }
            
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%',overflow:'hidden'}}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2 style={{ color: 'white' }}>Sign In</h2>
                </Grid>
                <TextField 
                    label='Username' 
                    placeholder='Enter username' 
                    fullWidth 
                    required 
                    margin="normal" 
                    sx={inputStyle}
                    InputLabelProps={{
                        style: { color: 'white' }, // Set the label color to white
                    }}
                />
                <TextField 
                    label='Password' 
                    placeholder='Enter password' 
                    type={showPassword ? 'text' : 'password'} 
                    fullWidth 
                    required 
                    margin="normal" 
                    sx={inputStyle}
                    InputLabelProps={{
                        style: { color: 'white' }, // Set the label color to white
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{color: 'white'}}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button type='submit' color='primary' variant='contained' style={btnStyle} fullWidth
                    onClick={login}>Sign in</Button>
                <Typography textAlign={'center'} m={2}>
                    <Link href="#" style={{ color: 'white' }}>
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography textAlign={'center'} style={{ color: 'white' }}> Do you have an account ?
                    <Link href="#" style={{ color: 'white' }}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default LoginPage;
