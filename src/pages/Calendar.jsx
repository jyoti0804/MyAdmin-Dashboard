import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { IconCalendarMonth } from "@tabler/icons-react";

export default function Calendar() {
  const [events, setEvents] = useState([
    { id: 1, title: "Team Meeting", date: "2025-11-10" },
    { id: 2, title: "Product Launch", date: "2025-11-15" },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      setEvents([...events, { id: Date.now(), title, date: info.dateStr }]);
    }
  };

  return (
    <Box>
    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
  <IconCalendarMonth size={28} stroke={1.5} />
  <Typography variant="h5" fontWeight={700}>
    Calendar
  </Typography>
</Stack>
      <Card>
        <CardContent>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="70vh"
            dateClick={handleDateClick}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
