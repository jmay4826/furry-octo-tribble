import {
  faComments,
  faGlobeAfrica,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as React from "react";
import { NavBarSignedOut } from "./NavBarSignedOut";

export const Home = () => (
  <>
    <NavBarSignedOut />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh"
      }}
    >
      <div
        //hero
        style={{
          alignItems: "center",
          backgroundColor: "#7641ad",
          color: "white",
          display: "flex",
          flexDirection: "column",
          flexGrow: 2,
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <h1 style={{ fontSize: "5em" }}>
          <FontAwesomeIcon icon={faGlobeAfrica} /> penpals
        </h1>
        <h2 style={{ flexGrow: 0 }}>Connect your classroom to the world.</h2>
        <button>Sign Up Now</button>
      </div>
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-around"
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#352646",
            display: "flex",
            flexDirection: "column",
            width: "30%"
          }}
          className="conversation-preview"
        >
          <FontAwesomeIcon icon={faComments} size="7x" />
          <h3>Communicate easily</h3>
          <p style={{ textAlign: "center", padding: "10px" }}>
            Access messages from any computer at any time. Students can
            communicate with each other in or outside of class. Instructors can
            check in on students' conversations at any time. Perfect for
            maximizing flexibility and accountability.
          </p>
        </div>
        <div
          style={{
            alignItems: "center",
            color: "#352646",
            display: "flex",
            flexDirection: "column",
            width: "30%"
          }}
          className="conversation-preview"
        >
          <FontAwesomeIcon icon={faGlobeAfrica} size="7x" />
          <h3>Share language and culture</h3>
          <p style={{ textAlign: "center", padding: "10px" }}>
            Connect your students with native speakers of their target language.
            Students engage in authentic target language communication while
            building cross-cultural awareness -- great for increased engagement
            and language acquisition.
          </p>
        </div>
        <div
          style={{
            alignItems: "center",
            color: "#352646",
            display: "flex",
            flexDirection: "column",
            flexGrow: 0,
            width: "30%"
          }}
          className="conversation-preview"
        >
          <FontAwesomeIcon icon={faUser} size="7x" />
          <h3>Maintain privacy</h3>
          <p style={{ textAlign: "center", padding: "10px" }}>
            Keep your students' contact information secure. Conversation
            partners only see each other's first names -- no email address or
            other personal information are ever displayed. Students engage in
            conversation without worrying about privacy.
          </p>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid gray",
          justifySelf: "flex-end",
          padding: "10px",
          textAlign: "center"
        }}
      >
        Copyright &copy; 2018.
        <Link href="/privacy">
          <a>Privacy Policy</a>
        </Link>
      </div>
    </div>
  </>
);
