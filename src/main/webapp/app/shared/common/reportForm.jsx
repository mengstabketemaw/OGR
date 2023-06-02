import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import moment from "moment/moment";

const ReportForm = React.forwardRef((props, ref) => {
  // Fake data for the table
  const {data} = props;
  // const data = [
  //   { submittedDate: '2023-05-30', user: 'John Doe', type: 'Type A', stage: 'Stage 1', status: 'Pending' },
  //   { submittedDate: '2023-05-31', user: 'Jane Smith', type: 'Type B', stage: 'Stage 2', status: 'Approved' },
  //   { submittedDate: '2023-06-01', user: 'Alice Johnson', type: 'Type C', stage: 'Stage 3', status: 'Rejected' },
  // ];

  return (
    <div style={{display:"none"}}>
      <h1 className="text-center">Table Print Example</h1>
      <table className="table" ref={ref}>
        <thead>
        <tr>
          <th>Submitted Date</th>
          <th>User</th>
          <th>Type</th>
          <th>Stage</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{moment(item.submittedDate).format('MMM DD, YYYY')}</td>
            <td>{item.applicantUsername}</td>
            <td>{item.form.title}</td>
            <td>{item.stage?.name}</td>
            <td>{item.status}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
});

export default ReportForm;
