import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Stack, TextField } from "@mui/material";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e2e2",
    borderRadius: "10px",
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.12)",
    padding: "35px",
    outline: "none",
  },
}));

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;

  const classes = useStyles();

  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMeberPassword] = useState<string>("");

  const { setAuthMember } = useGlobals();

  /** HANDLERS **/

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMeberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginpRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      console.log("inputs:", memberNick, memberPhone, memberPassword);

      const isfulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";

      if (!isfulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();

      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginpRequest = async () => {
    try {
      const isfulfill = memberNick !== "" && memberPassword !== "";

      if (!isfulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();

      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/* ==================== SIGNUP MODAL ==================== */}

      <Modal
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            sx={{
              width: "380px",
              maxWidth: "90%",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                SOFIYA
              </h2>

              <p
                style={{
                  margin: "0 0 25px",
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                Create your account
              </p>

              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                onChange={handleUsername}
                sx={{
                  mb: 2,
                }}
              />

              <TextField
                fullWidth
                label="Phone number"
                variant="outlined"
                onChange={handlePhone}
                sx={{
                  mb: 2,
                }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />

              <button
                onClick={handleSignupRequest}
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "11px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#333",
                  color: "#fff",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Create account
              </button>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      {/* ==================== LOGIN MODAL ==================== */}

      <Modal
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            sx={{
              width: "380px",
              maxWidth: "90%",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                SOFIYA
              </h2>

              <p
                style={{
                  margin: "0 0 25px",
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                Welcome back
              </p>

              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                onChange={handleUsername}
                sx={{
                  mb: 2,
                }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />

              <button
                onClick={handleLoginpRequest}
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "11px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#333",
                  color: "#fff",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
