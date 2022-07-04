import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import {Loading, Highlight} from "../components";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

const serverUrl = "https://gh0st-api-nodejs.herokuapp.com"
const booksUrl = "https://gh0st-books-api-nodejs.herokuapp.com"

export const ExternalApi = () => {
  const [message, setMessage] = useState("");


  const { getAccessTokenSilently } = useAuth0();

// -------------------
// Books API -----------------------------------------------------------------------

// Books API unprotected
const callBooksApi = async () => {
  try {
    const response = await fetch(`${booksUrl}/api/books`);

    const responseData = await response.json();

    setMessage(responseData);
  } catch (error) {
    setMessage(error.message);
  }
};

// Books API protected
const callBooksSecureApi = async () => {
  try {
    const token = await getAccessTokenSilently();

    const response = await fetch(
      `${booksUrl}/api/mybookss`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const responseData = await response.json();

    setMessage(responseData);
  } catch (error) {
    setMessage(error.message);
  }
};

    // Books API protected and requires read:courses scope
    const callBooksRoleApi = async () => {
      try {
        const token = await getAccessTokenSilently();
  
        const response = await fetch(
          `${booksUrl}/api/books/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const responseData = await response.json();
  
        setMessage(responseData);
      } catch (error) {
        setMessage(error.message);
      }
    };

    // Books API protected and requires read:courses and read:admin scope
    const callBooksAdminApi = async () => {
      try {
        const token = await getAccessTokenSilently();
  
        const response = await fetch(
          `${booksUrl}/api/books/details/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const responseData = await response.json();
  
        setMessage(responseData);
      } catch (error) {
        setMessage(error.message);
      }
    };

// -------------------
// Courses API -----------------------------------------------------------------------

// Courses API unprotected
  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/courses`);

      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

// Courses API protected
    const callSecureApi = async () => {
      try {
        const token = await getAccessTokenSilently();
  
        const response = await fetch(
          `${serverUrl}/api/mycourses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const responseData = await response.json();
  
        setMessage(responseData);
      } catch (error) {
        setMessage(error.message);
      }
    };

    // Courses API protected and requires read:courses scope
    const callRoleApi = async () => {
      try {
        const token = await getAccessTokenSilently();
  
        const response = await fetch(
          `${serverUrl}/api/courses/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const responseData = await response.json();
  
        setMessage(responseData);
      } catch (error) {
        setMessage(error.message);
      }
    };

    // Courses API protected and requires read:courses and read:admin scope
    const callAdminApi = async () => {
      try {
        const token = await getAccessTokenSilently();
  
        const response = await fetch(
          `${serverUrl}/api/courses/details/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        const responseData = await response.json();
  
        setMessage(responseData);
      } catch (error) {
        setMessage(error.message);
      }
    };

  return (
    <Container className="mb-5">
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token,
        and the API will validate it using the API's audience value.{" "}
        <strong>This route should be private</strong>.
      </p>
      <ButtonGroup>
        <Button onClick={callApi} color="primary" className="mt-5">
          Get List of Courses
        </Button>
        <Button onClick={callSecureApi} color="primary" className="mt-5">
          Get My Courses
        </Button>
        <Button onClick={callRoleApi} color="primary" className="mt-5">
          Get Detailed List of Courses
        </Button>
        <Button onClick={callAdminApi} color="primary" className="mt-5">
          Get Users Enrolled in Courses
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button onClick={callBooksApi} color="primary" className="mt-5">
          Get List of Books
        </Button>
        <Button onClick={callBooksSecureApi} color="primary" className="mt-5">
          Get My Books
        </Button>
        <Button onClick={callBooksRoleApi} color="primary" className="mt-5">
          Get Detailed List of Books
        </Button>
        <Button onClick={callBooksAdminApi} color="primary" className="mt-5">
          Get Users and Books
        </Button>
      </ButtonGroup>

      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <Highlight language="json">
            {JSON.stringify(message, null, 2)}
          </Highlight>
        </div>
      )}
    </Container>
  );
};

export default withAuthenticationRequired(ExternalApi, {
  onRedirecting: () => <Loading />,
});
