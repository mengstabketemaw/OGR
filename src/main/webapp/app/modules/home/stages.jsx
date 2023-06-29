
import moment from 'moment';
import {Translate} from "react-jhipster";
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

const paperstyle={
  padding: '8px 10px',
  textAlign:'left',
}

export default function Stage() {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >

      <TimelineItem className={"pb-0"} >
        <TimelineOppositeContent  color="textSecondary"  className="flex-none">
          {moment().format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color={'secondary'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={"pb-0"} style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.logged'}/></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="text.secondary"  className="flex-none">
          {moment().subtract(30, 'minutes').format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color={'primary'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.appliedLicence'}/>

        </TimelineContent>
      </TimelineItem>


      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" className="flex-none">
          {moment().subtract(63, 'minutes').format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot  variant="outlined" color={'secondary'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.assistance'}/></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" className="flex-none">
          {moment().subtract(71, 'minutes').format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot  variant="outlined" color={'success'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.granted'}/></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" className="flex-none">
          {moment().subtract(83, 'minutes').format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot  variant="outlined" color={'primary'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.renewed'}/></TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" className="flex-none">
          {moment().subtract(97, 'minutes').format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot  variant="outlined" color={'primary'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.inspected'}/></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" className="flex-none">
          {moment().subtract(103, 'minutes').format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot  variant="outlined" color={'secondary'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.review'}/></TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary" className="flex-none">
          {moment().subtract(112, 'minutes').format('h:mm A')}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot  variant="outlined" color={'secondary'} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{fontSize: "14px"}}><Translate contentKey={'userDashboard.pending'}/></TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
