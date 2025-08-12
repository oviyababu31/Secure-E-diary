import React from 'react';
import NotePage from './NotePage';

export default function TimeTable({ mode }) {
  return <NotePage title="Time Table" storageKey="timetable" mode={mode} nextRoute="/students/exam-schedule/view" />;
}
