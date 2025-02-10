import React from 'react';
import { Card, CardContent, Grid2, Link, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Companies() {


    const navigateTo = useNavigate()

    const companies = [
        { name: 'College Management Portal', title: 'Sankanur Institute of Nursing Science', path: '/nursing/home' },
        { name: 'Hospital Management Portal', title: 'Sankanur Hospital and Research Center', path: '' },
    ]

    const redirectTo = (path) => {
        navigateTo(path)
    }

    return (
        <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant='h4' fontWeight={550}>
                Companies
            </Typography>
            <Grid2 container display={'flex'} gap={5}>
                {companies.map((comp) => (
                    <Grid2 md={11} xs={11} item>
                        <Card onClick={()=>redirectTo(comp.path)} sx={{ width: '25rem', padding: '20px', cursor: 'pointer', borderRadius: '10px' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <Typography variant='h6' fontWeight={500}>
                                    {comp.name}
                                </Typography>
                                <Typography variant='h5' fontWeight={'600'}>
                                    {comp.title}
                                </Typography>
                                <Link href="/login" onClick={(e)=> e.stopPropagation()} sx={{width: 'fit-content'}}>
                                    Login to the Portal
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}

            </Grid2>
        </Stack>
    )
}
