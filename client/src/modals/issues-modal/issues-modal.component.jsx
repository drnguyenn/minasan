import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Fab
} from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';

import { toggleIssuesModalOpened } from '../../redux/modal/modal.actions';

const IssuesModal = () => {
  const { isIssuesModalOpened } = useSelector(state => state.modal);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleIssuesModalOpened());

  const handleSubmit = () => {
    console.log('submit');
    dispatch(toggleIssuesModalOpened());
  };

  const issuesList = [
    'friend',
    'family',
    'work',
    'love',
    'passion',
    'anger_management'
  ];
  return (
    <Dialog open={isIssuesModalOpened} onClose={handleClose}>
      <DialogTitle>What problem do you face?</DialogTitle>
      <DialogContent>
        {issuesList.map(issue => (
          <FormControlLabel
            control={
              <Checkbox
                icon={<AnnouncementOutlinedIcon />}
                checkedIcon={<AnnouncementIcon />}
                name={issue}
              />
            }
            label={issue
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.substring(1))
              .join(' ')}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Fab onClick={handleSubmit} color='primary' variant='extended'>
          Save
        </Fab>
        <Fab onClick={handleClose} variant='extended'>
          Cancel
        </Fab>
      </DialogActions>
    </Dialog>
  );
};

export default IssuesModal;
