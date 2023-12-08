import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Input } from "antd";
import {useNavigate} from "react-router-dom"

function AdminUserDetail({userId}) {
 const nav = useNavigate();

 function goBack() {
   nav("/users");
 }


  const [userData,setUserData] = useState(null);

  async function findUserInfo(userId) {
    const responseUser = await fetch(
      `/api/user/getInfo?userId=${userId}`
    );
    const responseUserData = await responseUser.json();
    setUserData(responseUserData.data);
  }
  useEffect(() => {
    findUserInfo(userId);
  }, [userId]);


  return (
    <Container>
      <h3>User</h3>
      <Form
        name="wrap"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="User Name">{userData?.fullName}</Form.Item>

        <Form.Item label="Email">{userData?.emailAddress}</Form.Item>

        <Form.Item label="Phone">{userData?.phoneNumber}</Form.Item>

        <Form.Item label="Role">{userData?.role}</Form.Item>

        <Form.Item label=" ">
          <Button type="primary" onClick={goBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default AdminUserDetail;
