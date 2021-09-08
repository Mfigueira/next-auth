import { useRef } from 'react';
import classes from './ProfileForm.module.css';

const ProfileForm = ({ onChangePassword }) => {
  const newPassInputRef = useRef();
  const oldPassInputRef = useRef();

  const handleSubmitPassword = (event) => {
    event.preventDefault();

    const newPassword = newPassInputRef.current.value;
    const oldPassword = oldPassInputRef.current.value;

    onChangePassword({ newPassword, oldPassword });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitPassword}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPassInputRef} type="password" id="new-password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input ref={oldPassInputRef} type="password" id="old-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
