import React, { useState, useMemo } from "react";
import { Modal, Box, Typography, Button, Tooltip } from "@mui/material";
import { DateCalendar, LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import type { PickersDayProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "@mui/material/styles";
import "dayjs/locale/zh-cn"; // ✅ 中文
import Holidays from "date-holidays";
dayjs.locale("zh-cn");
interface CalendarModalProps {
  open: boolean;
  onClose: () => void;
}

interface HolidayInfo {
  name: string;
  country: 'CN' | 'JP';
  color: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ open, onClose }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs()); // 初始化为今天
  const theme = useTheme();

  // 获取节假日数据
  const holidays = useMemo(() => {
    const hd = new Holidays();
    const holidaysMap = new Map<string, HolidayInfo[]>();
    const currentYear = dayjs().year();
    const years = [currentYear - 1, currentYear, currentYear + 1]; // 去年、今年、明年

    years.forEach(year => {
      // 中国节假日
      hd.init('CN');
      const cnHolidays = hd.getHolidays(year);
      
      // 日本节假日
      hd.init('JP');
      const jpHolidays = hd.getHolidays(year);

      // 处理中国节假日
      cnHolidays.forEach((holiday: any) => {
        if (holiday.type === 'public') {
          const dateKey = dayjs(holiday.date).format('YYYY-MM-DD');
          if (!holidaysMap.has(dateKey)) {
            holidaysMap.set(dateKey, []);
          }
          holidaysMap.get(dateKey)?.push({
            name: holiday.name,
            country: 'CN',
            color: '#ef4444' // 红色
          });
        }
      });

      // 处理日本节假日
      jpHolidays.forEach((holiday: any) => {
        if (holiday.type === 'public') {
          const dateKey = dayjs(holiday.date).format('YYYY-MM-DD');
          if (!holidaysMap.has(dateKey)) {
            holidaysMap.set(dateKey, []);
          }
          holidaysMap.get(dateKey)?.push({
            name: holiday.name,
            country: 'JP',
            color: '#22c55e' // 绿色
          });
        }
      });
    });

    return holidaysMap;
  }, []);

  // 自定义日期组件
  const CustomPickersDay = (props: PickersDayProps) => {
    const { day, ...other } = props;
    const dateKey = day.format('YYYY-MM-DD');
    const dayHolidays = holidays.get(dateKey);

    return (
      <Tooltip
        title={
          dayHolidays && dayHolidays.length > 0
            ? dayHolidays.map(h => `${h.country === 'CN' ? '中国' : '日本'}: ${h.name}`).join(' | ')
            : ''
        }
        arrow
      >
        <Box sx={{ position: 'relative' }}>
          <PickersDay day={day} {...other} />
          {dayHolidays && dayHolidays.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 2,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '2px'
              }}
            >
              {dayHolidays.map((holiday, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: 4, sm: 5, md: 6, lg: 7 },
                    height: { xs: 4, sm: 5, md: 6, lg: 7 },
                    borderRadius: '50%',
                    backgroundColor: holiday.color,
                    border: '1px solid white',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: { xs: 'scale(1.4)', sm: 'scale(1.35)', md: 'scale(1.3)' },
                    }
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Tooltip>
    );
  };
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
          height: "auto",
          width: { xs: "95%", sm: "90%", md: "85%", lg: "80%" },
          maxHeight: "95vh",
          maxWidth: { xs: "none", sm: "600px", md: "800px", lg: "1000px" },
          bgcolor: "background.paper",
          borderRadius: { xs: 2, md: 3 },
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          p: { xs: 2, sm: 3, md: 4 },
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        <Typography 
          id="calendar-modal-title" 
          variant="h4" 
          mb={{ xs: 1, sm: 1.5, md: 2 }}
          sx={{
            fontWeight: 600,
            color: "text.primary",
            textAlign: "center",
            flexShrink: 0,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.875rem", lg: "2.25rem" }
          }}
        >
         日历
        </Typography>

        {/* ✅ 一定要用 LocalizationProvider 包裹 */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
          <DateCalendar
            sx={{
              bgcolor: theme.palette.background.default,
              width: "100%",
              flex: 1,
              minHeight: { xs: "320px", sm: "380px", md: "440px", lg: "500px" },
              maxHeight: { xs: "420px", sm: "480px", md: "540px", lg: "600px" },
              "& .MuiPickersCalendarHeader-root": {
                marginTop: { xs: 0.5, sm: 1, md: 1 },
                marginBottom: { xs: 0.5, sm: 1, md: 1 },
              },
              "& .MuiPickersCalendarHeader-label": {
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem", lg: "1.4rem" },
                fontWeight: 600,
              },
              "& .MuiPickersArrowSwitcher-button": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                padding: { xs: "4px", sm: "6px", md: "8px" },
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
              "& .MuiDayCalendar-weekDayLabel": {
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem" },
                fontWeight: 600,
                color: "text.secondary",
              },
              "& .MuiPickersDay-root": {
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem" },
                fontWeight: 500,
                width: { xs: "36px", sm: "40px", md: "46px", lg: "52px" },
                height: { xs: "36px", sm: "40px", md: "46px", lg: "52px" },
                margin: { xs: "1px", sm: "1.5px", md: "2px" },
                borderRadius: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "primary.light",
                  transform: { xs: "scale(1.05)", sm: "scale(1.06)", md: "scale(1.08)" },
                },
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: 600,
                  transform: { xs: "scale(1.08)", sm: "scale(1.1)", md: "scale(1.12)" },
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
              },
              "& .MuiPickersFadeTransitionGroup-root": {
                minHeight: { xs: "280px", sm: "320px", md: "360px", lg: "400px" },
                height: { xs: "280px", sm: "320px", md: "360px", lg: "400px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
              },
              "& .MuiPickersSlideTransition-root": {
                height: "auto !important",
                minHeight: { xs: "280px", sm: "320px", md: "360px", lg: "400px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              },
              "& .MuiDayCalendar-root": {
                minHeight: { xs: "280px", sm: "320px", md: "360px", lg: "400px" },
                height: "auto !important",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              },
            }}
            value={date}
            onChange={(newDate) => setDate(newDate)} // Dayjs | null
            slots={{
              day: CustomPickersDay
            }}
          />
        </LocalizationProvider>

        {/* 图例 */}
        <Box 
          mt={{ xs: 1, sm: 1.5, md: 2 }} 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          gap={{ xs: 2, sm: 2.5, md: 3 }}
          sx={{
            p: { xs: 1, sm: 1.25, md: 1.5 },
            backgroundColor: theme.palette.background.default,
            borderRadius: { xs: 1.5, md: 2 },
            border: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            rowGap: { xs: 1, sm: 0 }
          }}
        >
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
            <Box
              sx={{
                width: { xs: 8, sm: 9, md: 10, lg: 12 },
                height: { xs: 8, sm: 9, md: 10, lg: 12 },
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                border: '1.5px solid white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
              }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 500,
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }
              }}
            >
              🇨🇳 中国节假日
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
            <Box
              sx={{
                width: { xs: 8, sm: 9, md: 10, lg: 12 },
                height: { xs: 8, sm: 9, md: 10, lg: 12 },
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                border: '1.5px solid white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
              }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 500,
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }
              }}
            >
              🇯🇵 日本节假日
            </Typography>
          </Box>
        </Box>

        <Box 
          mt={{ xs: 1.5, sm: 2 }} 
          display="flex" 
          justifyContent="flex-end" 
          gap={{ xs: 1.5, sm: 2 }} 
          sx={{ flexShrink: 0 }}
        >
          <Button 
            onClick={onClose} 
            variant="outlined"
            size="medium"
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 0.75, sm: 1 },
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              fontWeight: 500,
              borderRadius: { xs: 1.5, md: 2 },
              textTransform: "none",
              minWidth: { xs: "60px", sm: "80px" },
              "&:hover": {
                transform: { xs: "translateY(-0.5px)", sm: "translateY(-1px)" },
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }
            }}
          >
            ❌ 取消
          </Button>
          <Button
            onClick={() => {
              console.log("选中的日期:", date?.format("YYYY-MM-DD")); // 格式化输出
              onClose();
            }}
            variant="contained"
            size="medium"
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 0.75, sm: 1 },
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              fontWeight: 600,
              borderRadius: { xs: 1.5, md: 2 },
              textTransform: "none",
              minWidth: { xs: "60px", sm: "80px" },
              "&:hover": {
                transform: { xs: "translateY(-0.5px)", sm: "translateY(-1px)" },
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }
            }}
          >
            ✅ 确定
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CalendarModal;
