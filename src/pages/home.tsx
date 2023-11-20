import React from 'react'
import { Card, CardContent, CardActions, Button, styled, CardProps, CardHeader, Typography, Grid, Tooltip, IconButton, IconButtonProps, CardMedia, Box } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
function home() {
  return (
    <>
    <div>
       <Grid container direction="row" justifyContent={'center'} style={{ paddingTop: '64px' }}>
        <Grid item xs={10}>
            <Card>
                <CardHeader title={
                    <Typography><TwitterIcon/></Typography>
                }
                />
                <CardContent>
                    <Typography>
                        Twitter Sentiment Analysis
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
       </Grid>
    </div>
    </>
  )
}

export default home