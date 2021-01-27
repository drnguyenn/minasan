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

import { toggleTopicsModalOpened } from '../../redux/modal/modal.actions';
import {
  fetchTopicsStart,
  updateProfileStart
} from '../../redux/user/user.actions';

const TopicsModal = () => {
  const [checkedState, setCheckedState] = useState({});

  const { isTopicsModalOpened } = useSelector(state => state.modal);

  const { topicList, currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleTopicsModalOpened());

  const handleChange = event => {
    const { id, checked } = event.target;

    setCheckedState({ ...checkedState, [id]: checked });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(
      updateProfileStart({
        topicIds: Object.keys(checkedState)
          .filter(topicId => checkedState[topicId])
          .map(Number)
      })
    );

    handleClose();
  };

  useEffect(() => {
    if (isTopicsModalOpened && !topicList.length) dispatch(fetchTopicsStart());
  }, [dispatch, isTopicsModalOpened, topicList.length]);

  useEffect(() => {
    if (currentUser)
      setCheckedState(checkedState =>
        currentUser.topics.length
          ? {
              ...checkedState,
              ...currentUser.topics.reduce((accumulator, { id }) => {
                accumulator[id] = true;
                return accumulator;
              }, {})
            }
          : {}
      );
  }, [currentUser]);

  return (
    <Dialog open={isTopicsModalOpened} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Tell us about your favorite topics</DialogTitle>
        <DialogContent>
          {topicList.map(({ id, name }) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  id={id.toString()}
                  name={name}
                  checked={checkedState[id] || false}
                  onChange={handleChange}
                />
              }
              label={name
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.substring(1))
                .join(' ')}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Fab type='submit' color='primary' variant='extended'>
            Save
          </Fab>
          <Fab onClick={handleClose} variant='extended'>
            Cancel
          </Fab>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TopicsModal;
