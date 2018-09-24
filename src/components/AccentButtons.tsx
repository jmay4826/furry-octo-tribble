import Button from "@material-ui/core/Button";
import * as React from "react";

const originalCaps: React.CSSProperties = { textTransform: "initial" };

const AccentButtons = ({
  handleClick
}: {
  handleClick: React.MouseEventHandler;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "80%"
    }}
  >
    <div>
      <Button style={originalCaps} onClick={handleClick} name="¡">
        ¡
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="¿">
        ¿
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="Á">
        Á
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="á">
        á
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="É">
        É
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="é">
        é
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="Í">
        Í
      </Button>
    </div>
    <div>
      <Button style={originalCaps} onClick={handleClick} name="í">
        í
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="Ó">
        Ó
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="ó">
        ó
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="Ú">
        Ú
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="ú">
        ú
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="Ñ">
        Ñ
      </Button>
      <Button style={originalCaps} onClick={handleClick} name="ñ">
        ñ
      </Button>
    </div>
  </div>
);

export { AccentButtons };
