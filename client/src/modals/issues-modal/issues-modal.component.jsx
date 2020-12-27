import React, { useEffect, useState } from 'react';
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
import {
  fetchIssuesStart,
  updateProfileStart
} from '../../redux/profile/profile.action';
import { getCurrentUser } from '../../redux/user/user.actions';

const IssuesModal = () => {
  const [chosenList, setChosenList] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const { isIssuesModalOpened } = useSelector(state => state.modal);
  const { issuesList } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleIssuesModalOpened());

  const handleSubmit = async event => {
    event.preventDefault();
    const { username, hobbies } = currentUser;

    const hobbyIds = hobbies.map(hobby => hobby.id);

    dispatch(
      updateProfileStart({
        username: username,
        // email: event.target.email.value
        topicIds: chosenList,
        hobbyIds: hobbyIds
      })
    );

    dispatch(getCurrentUser());
    setChosenList([]);
    dispatch(toggleIssuesModalOpened());
  };
  useEffect(() => {
    dispatch(fetchIssuesStart());
  }, []);

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
                name={issue.name}
                onClick={() => {
                  let chosen = chosenList;
                  const index = chosen.indexOf(issue.id);
                  if (index === -1) {
                    chosen.push(issue.id);
                  } else {
                    chosen.splice(index, 1);
                  }
                  setChosenList(chosen);
                }}
              />
            }
            label={issue.name
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
