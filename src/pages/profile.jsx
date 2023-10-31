import { Avatar, TextField, Grid, Typography, Link } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
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
    fullname: "John Doe",
    email: "john@doe.com",
    password: "********", // This should be securely handled in a real application
    phoneNumber: "123-456-7890",
    role: "User",
  });

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
    //  logic to send a password reset link to the provided email address
    console.log(`Send link to ${newPasswordEmail}`);
  };

  return (
    <div>
      <Header />
      <main className="main">
        <div className="profile">
          <Grid container gap={"24px"}>
            <Grid item sm={12}>
              <div className="profile-header">
                <Avatar className="profile-image">
                  {getInitials(user.fullname)}
                </Avatar>
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

                    <Typography
                      component={Link}
                      variant="body1"
                      onClick={handlePasswordChangeClick}
                      style={{ cursor: "pointer", paddingLeft: "8px" }}
                    >
                      Change Password
                    </Typography>
                  
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
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
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="email"
                label="Email Address"
                value={user.email}
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
