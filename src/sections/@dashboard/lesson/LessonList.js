import { useRecoilValue } from 'recoil';
import { useState } from 'react';
// mui ui
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, styled, Typography } from '@mui/material';
// Hooks
import useSettings from 'src/hooks/useSettings';
// components
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import offsetAtom from 'src/recoils/offsetAtom';
import LessonItem from './LessonItem';
// Config
import { HEADER, LESSON } from 'src/config';

// -------------------------------

const RootStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOffset',
})(({ isOffset, theme }) => ({
  position: 'fixed',
  width: LESSON.LIST_ITEM_WIDTH,
  right: theme.spacing(2),
  bottom: 0,
  boxShadow: theme.customShadows.z1,
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.shorter,
  }),
  top: 116,
  ...(isOffset && { top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT }),
}));

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 2000,
}));

const LessonList = ({ data }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const { themeMode } = useSettings();

  const isOffset = useRecoilValue(offsetAtom);

  const handleClick = (id) => {
    setIsCollapse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <RootStyle isOffset={isOffset}>
      <List
        disablePadding
        components="div"
        // subheader={
        //   <Typography variant="h6" sx={{ p: 1.5 }}>
        //     Course content
        //   </Typography>
        // }
      >
        <Box sx={{ borderRadius: 0.5, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: `calc(100vh - ${HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT}px)`, pb: 1 }}>
            {data.map((list) => (
              <div key={list.id}>
                <ListItemStyle
                  onClick={() => handleClick(list.id)}
                  sx={{
                    bgcolor: (theme) => (themeMode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]),
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="subtitle1">1. {list.title}</Typography>}
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        0/2 | 06:28
                      </Typography>
                    }
                  />
                  <ListItemIcon>
                    <Iconify icon="ep:arrow-down-bold" />
                  </ListItemIcon>
                </ListItemStyle>
                <Collapse in={isCollapse[list.id]}>
                  {list.track_steps.map((child) => (
                    <LessonItem key={child.id} items={child} />
                  ))}
                </Collapse>
              </div>
            ))}
          </Scrollbar>
        </Box>
      </List>
    </RootStyle>
  );
};

export default LessonList;
