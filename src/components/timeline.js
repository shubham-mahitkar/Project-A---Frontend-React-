import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../data/queries';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import { pink } from '@mui/material/colors';

export default function CustomizedTimeline() {
  const { id } = useParams();
  

  const { loading:loading1, error:error1, data:dataByID } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
});
  
  return (
    <Timeline position="alternate">
      {dataByID?.user.awards.map((row, index) => {
        return (<TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="whitesmoke"
          >
            {row.year}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
              <TimelineDot>
                <EmojiEventsTwoToneIcon sx={{ color: pink[500] }} />
              </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2, color: 'whitesmoke' }}>
            <Typography variant="h6" component="span">
              {row.album_song}
            </Typography>
            <Typography>
              {row.award}
            </Typography>
          </TimelineContent>
        </TimelineItem>)})
      }
    </Timeline>
  );
}
