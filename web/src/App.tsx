import React, { useState } from "react";
import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MailchimpSubscibe, { FormHooks, EmailFormFields } from "react-mailchimp-subscribe";
import headerImage from "./thurman_landing.png";

const styles = {
  avatar: {
    height: "auto",
    width: "100%"
  },
  button: {
    textTransform: "none",
    margin: "1em 0 1em 0",
    padding: "0.25em 7.5em 0.25em 7.5em",
    fontWeight: "bold",
    fontFamily: ['"Manrope"', 'sans-serif'].join(','),
    border: `.25em solid black`,
    backgroundColor: "#6747ed",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      border: `.25em solid #6747ed`,
    }
  },
  grid: {
    padding: "2em 0.75em 2em 0.75em",
  },
  typography: {
    fontFamily: ['"Manrope"', 'sans-serif'].join(','),
    marginBottom: "0.25em",
  }
}

interface FormDataProps {
  EMAIL: string,
}


interface MCFormProps {
  status: string | null,
  message: string | Error | null,
  onValidated: ({EMAIL}: FormDataProps) => void,
}

const CustomForm = ({ status, message, onValidated}: MCFormProps) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onValidated({
      EMAIL: email,
    });
    setEmail("")
  }

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <>
      <TextField
        fullWidth
        required={true}
        margin="dense"
        size="small"
        id="email"
        label="Email"
        name="email"
        type="email"
        variant="standard"
        helperText="Give us your email to become an early tester!"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(e)}
      />
      <Button
        disableElevation={true}
        disableFocusRipple={true}
        disableRipple={true}
        size="small"
        variant="contained"
        type="submit"
        sx={styles.button}
      >
        Join us
      </Button>
      {status === "sending" && <Box color="error.main">sending...</Box>}
      {status === "error" && <Box color="error.main">There was an error...</Box>}
      {status === "success" && <Box color="error.main">Thanks for joining us!</Box>}
      </>
    </form>

  );
}

const MailchimpForm = () => {
  const postUrl = `${process.env.REACT_APP_MAILCHIMP_URL}?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`
  console.log(postUrl);
  
  return (
    <Box>
      <MailchimpSubscibe
        url={postUrl}
        render={({subscribe, status, message}: FormHooks<EmailFormFields>) => (
          <CustomForm 
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </Box>
  );
}

function App() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={styles.grid}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h2" align="left" sx={styles.typography}>
              A Search Engine for Web3 Projects
            </Typography>
            <Typography variant="h4" align="left" sx={styles.typography}>
              Tracking down information about new projects is time consuming
            </Typography>
            <Typography variant="h5" align="left" sx={styles.typography}>
              Our search tool makes curating faster and easier
            </Typography>
            <Box>
              <MailchimpForm />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
          <Avatar
            alt="header-image"
            src={headerImage}
            variant="square"
            sx={styles.avatar}
          >
          </Avatar>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;