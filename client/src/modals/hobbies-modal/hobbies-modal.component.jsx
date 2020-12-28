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

import { toggleHobbiesModalOpened } from '../../redux/modal/modal.actions';
import {
  fetchHobbyStart,
  updateProfileStart
} from '../../redux/user/user.actions';

const HobbiesModal = () => {
  const [checkedState, setCheckedState] = useState({});

  const { isHobbiesModalOpened } = useSelector(state => state.modal);

  const { hobbyList, currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleHobbiesModalOpened());

  const handleChange = event => {
    const { id, checked } = event.target;

    setCheckedState({ ...checkedState, [id]: checked });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(
      updateProfileStart({
        hobbyIds: Object.keys(checkedState)
          .filter(hobbyId => checkedState[hobbyId])
          .map(Number)
      })
    );

    handleClose();
  };

  useEffect(() => {
    if (isHobbiesModalOpened && !hobbyList.length) dispatch(fetchHobbyStart());
  }, [dispatch, isHobbiesModalOpened, hobbyList.length]);

  useEffect(() => {
    if (currentUser)
      setCheckedState(checkedState => ({
        ...checkedState,
        ...currentUser.hobbies.reduce((accumulator, { id }) => {
          accumulator[id] = true;
          return accumulator;
        }, {})
      }));
  }, [currentUser]);

  return (
    <Dialog open={isHobbiesModalOpened} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Choose your hobbies</DialogTitle>
        <DialogContent>
          {hobbyList.map(({ id, name }) => (
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

export default HobbiesModal;
