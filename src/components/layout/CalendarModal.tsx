import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "@mui/material/styles";

interface CalendarModalProps {
  open: boolean;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ open, onClose }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs()); // 初始化为今天
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="calendar-modal-title"
      aria-describedby="calendar-modal-content"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "90%",
          width: "70%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="calendar-modal-title" variant="h6" mb={2}>
          选择日期
        </Typography>

        {/* ✅ 一定要用 LocalizationProvider 包裹 */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            sx={{
              bgcolor: theme.palette.background.default,
            }}
            value={date}
            onChange={(newDate) => setDate(newDate)} // Dayjs | null
          />
        </LocalizationProvider>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose} variant="outlined">
            取消
          </Button>
          <Button
            onClick={() => {
              console.log("选中的日期:", date?.format("YYYY-MM-DD")); // 格式化输出
              onClose();
            }}
            variant="contained"
          >
            确定
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CalendarModal;
