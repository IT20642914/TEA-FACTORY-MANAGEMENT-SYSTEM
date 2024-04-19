import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Rating, Grid, Typography } from '@mui/material';
import CustomButton from '../Shared/CustomButton/CustomButton';
import styles from './FeedbackDialog.module.scss';
import { StyledTextField } from '../../assets/theme/theme';
const FeedbackDialog:React.FC<{
    isOpenFeedbackDialog: boolean
    onCallback(con: boolean): void
    title: string
    content: string
    helperText: boolean
    onInputHandleChange(property: string, value: any): void;
    handleInputFocus(property: string, section: string): void;
    confirmButtonTitle?: string
    feedback:any
    cancelButtonTitle?: string
}>=(props) => {
  return (
    <Dialog
      className={styles.dialogCard}
      aria-labelledby="feedback-dialog-title"
      open={props.isOpenFeedbackDialog}
      onClose={() => props.onCallback(false)}
    >
      <DialogTitle id="feedback-dialog-title">
      <Typography sx={{
         fontSize: '16px',
         fontWeight: 'bold',
         color: 'white',
      }} >  Feedback</Typography>
      </DialogTitle>
      <DialogContent>
         <Grid container spacing={4}>
           <Grid item xs={12} md={12} sx={{marginTop:"1rem"}}>
                <StyledTextField 
                      fullWidth
                      label="Manager Name"
                      placeholder='Enter Manager Name '
                      size='small'
                      value={props.feedback.value}
                      error={!!props.feedback.error}
                      disabled={props.feedback.disable}
                      required={props.feedback.isRequired}
                      helperText={props.helperText && props.feedback.error}
                      onFocus={() => props.handleInputFocus('name', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('name', event.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <StyledTextField
                      fullWidth
                      label="Manager Name"
                      placeholder='Enter Manager Name '
                      size='small'
                      value={props.feedback.value}
                      error={!!props.feedback.error}
                      disabled={props.feedback.disable}
                      required={props.feedback.isRequired}
                      helperText={props.helperText && props.feedback.error}
                      onFocus={() => props.handleInputFocus('name', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('name', event.target.value)}
                    />
           
                </Grid>  
                <Grid item xs={12} md={12} sx={{display:"flex",justifyContent:"space-evenly"}}>  
                <Typography sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '10px'
                    
                }}> Ratings</Typography> 
                <Rating
                name="rating"
                value={props.feedback.rating}
                onChange={(event: any) => props.onInputHandleChange('name', event.target.value)}
                />
                </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton text={props.cancelButtonTitle ? props.cancelButtonTitle : 'Cancel'} border='1px solid #6e6e6e' bgColor='#282828' onClick={() => props.onCallback(false)} />
        <CustomButton text={props.confirmButtonTitle ? props.confirmButtonTitle : 'Confirm'} onClick={() => props.onCallback(true)}/>
      </DialogActions>
    </Dialog>
  )
}

export default FeedbackDialog