import  styles from './Feedback.module.scss'
import { Button, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import FeedbackIcon from '@mui/icons-material/Feedback';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const Feedback = () => {
  return (
    <section className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}>
    <div className={`${styles.dashboard}`}>
      <div className={`${styles.card_container}`}>
        <Card className={`${styles.dashboard_card}`}>
          <CardActionArea>
            <CardContent>
              <FeedbackIcon className={`${styles.icon}`}  />
              <Typography variant="h5">Feedback</Typography>
              <Typography variant="body2">View feedback</Typography>
            </CardContent>
            <Button className={`${styles.button}`} >View</Button>
          </CardActionArea>
        </Card>
        <Card className={`${styles.dashboard_card}`}>
          <CardActionArea>
            <CardContent>
              <LiveHelpIcon className={`${styles.icon}`} />
              <Typography variant="h5">FAQ</Typography>
              <Typography variant="body2">View FAQ</Typography>
            </CardContent>
            <Button className={`${styles.button}`}>View</Button>
          </CardActionArea>
        </Card>
    
      </div>
    </div>
    </section>
  )
}

export default Feedback