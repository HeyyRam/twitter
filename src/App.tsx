import React, { useState } from 'react';
import { Paper,Card, CardContent, CardActions, Button, styled, CardProps, CardHeader, Typography, Grid, Tooltip, IconButton, IconButtonProps, CardMedia, Box } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
interface SentimentResponse {
  prediction: number;
  positiveProbability: number; 
}


export default function TweetSentiment() {

  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState('');

  const predictSentiment = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.prediction);
      } else {
        console.error('Error predicting sentiment:', response.status);
      }
    } catch (error) {
      console.error('Error predicting sentiment:', error);
    }
  };

  return (
    <>
    <div style={{minHeight:'100vh',backgroundColor:'lightblue'}}>
    <Grid container direction="row" justifyContent={'center'} style={{ paddingTop: '64px' }}>
      <Grid item xs={10}>
        <Card style={{}}>
        <CardHeader title={
                    <Typography align='center'><TwitterIcon/></Typography>
                }
                />
                <CardContent>
                    <Typography align='center'>
                        Twitter Sentiment Analysis
                    </Typography>
                </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10}>
      <Grid container direction="row" justifyContent={'center'} style={{ paddingTop: '64px' }}>
        <Grid item xs={10}>
    
          <form >
            <div style={{marginLeft:'240px'}}>
            <input
            type="text"
            placeholder="Enter text"
           value={text}
           onChange={(e) => setText(e.target.value)}
           style={{
            height:'50px',
            width:'600px',
            marginRight:'100px',
            textAlign:'center',
            borderRadius:'10px'
           }}
         />
      
              </div>
            <div style={{marginLeft:'550px'}}>
            
              </div>
            
            
          </form>

        
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={3} style={{marginTop:'30px',height:'200px'}}>
          <Button 
          onClick={predictSentiment}
          sx={{
            marginTop:'20px',
            marginLeft:'440px',
            height:'45px',
            width:'200px',
            borderRadius:'8px',
            backgroundColor:'#caf0f8',
            transition:'transform 0.3s, backgroundColor 0.3s,color 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor:'#0077b6',
              color:'#caf0f8'
          }
          }}
          >Predict Sentiment</Button>
          <div>
          {prediction && <div><p>Prediction: {prediction}</p></div>}
          </div>
          </Paper>

        </Grid>
      </Grid>
      </Grid>
    </Grid>
      

    {/* {prediction && <p>Sentiment: {prediction}</p>} */}
    </div>
    </>
  );
}