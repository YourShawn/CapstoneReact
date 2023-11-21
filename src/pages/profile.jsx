import React, { useState, useEffect } from "react";
import { Avatar, TextField, Grid, Button } from "@mui/material";
import Footer from "../component/footer";
import Header from "../component/header";

function getInitials(name) {
  if (!name) {
    return "";
  }

  const nameParts = name?.split(" ");
  return nameParts.map((part) => part[0]).join("");
}

function Profile() {
  const [disable, setDisable] = useState(true);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    role: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchUserData = () => {
    fetch("http://localhost:8080/register/getUserData")
      .then((response) => response.json())
      .then((data) => {
        const userData = data.length > 0 ? data[0] : {};
        setUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [newPasswordEmail, setNewPasswordEmail] = useState("");

  const handleEditClick = () => {
    setDisable(false);
  };

  const handleSaveClick = () => {
    setDisable(true);
  };

  const handlePasswordChangeClick = () => {
    setChangePasswordMode(true);
  };

  const handleSendLinkClick = () => {
    console.log(`Send link to ${newPasswordEmail}`);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className="main">
        <div className="profile">
          <Grid container gap={"24px"}>
            <Grid item sm={12}>
              <div className="profile-header">
                <Avatar
                  className="profile-image"
                  src={user.profilePicture}
                  sx={{ width: 150, height: 150 }}
                />
                {!disable && (
                  <label htmlFor="profile-picture-input">
                    <input
                      id="profile-picture-input"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleProfilePictureChange}
                    />
                    <Button variant="outlined" component="span">
                      Choose File
                    </Button>
                  </label>
                )}
              </div>
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="fullname"
                label="Full Name"
                value={user.fullname}
                disabled={disable}
              />
            </Grid>

            <Grid item sm={12}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                gap={"24px"}
              >
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={user.password}
                    disabled={disable}
                  />

                  {/*  <Typography
                    component={Link}
                    variant="body1"
                    onClick={handlePasswordChangeClick}
                    style={{ cursor: "pointer", paddingLeft: "8px" }}
                  >
                    Change Password
                  </Typography> */}
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item sm={12}>
              {changePasswordMode && (
                <div>
                  <TextField
                    id="newPasswordEmail"
                    label="Enter Email Address"
                    value={newPasswordEmail}
                    onChange={(e) => setNewPasswordEmail(e.target.value)}
                  />
                  <Grid item xs={12}>
                    <Typography
                      component={Link}
                      variant="contained"
                      onClick={handleSendLinkClick}
                      style={{ cursor: "pointer" }}
                    >
                      Send Link
                    </Typography>
                  </Grid>
                </div>
              )}
            </Grid> */}

            <Grid item sm={12}>
              <TextField
                id="email"
                label="Email Address"
                value={user.emailAddress}
                disabled={disable}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                value={user.phoneNumber}
                disabled={disable}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                id="role"
                label="Role"
                value={user.role}
                disabled={disable}
              />
            </Grid>
            <Grid item sm={12}>
              <div className="profile-actions">
                {disable ? (
                  <>
                    <Button
                      variant="contained"
                      className="btn-primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={handleSaveClick}>
                    Save
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
