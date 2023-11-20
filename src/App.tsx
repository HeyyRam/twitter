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
        <Paper elevation={3} style={{marginTop:'30px', minHeight:'300px'}}>
          <form >
            <div style={{marginLeft:'400px'}}>
            <input
            type="text"
            placeholder="Enter text"
           value={text}
           onChange={(e) => setText(e.target.value)}
         />
      <button onClick={predictSentiment}>Predict Sentiment</button>
      {prediction && <div>Prediction: {prediction}</div>}
              </div>
            <div style={{marginLeft:'550px'}}>
            
              </div>
            
            
          </form>

        </Paper>
      </Grid>
    </Grid>
      

    {/* {prediction && <p>Sentiment: {prediction}</p>} */}
    </div>
    </>
  );
}