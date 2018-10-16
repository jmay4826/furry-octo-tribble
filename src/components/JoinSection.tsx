import * as React from "react";
import { parse } from "query-string";
import { RouteComponentProps } from "react-router";
import * as pDebounce from "p-debounce";
import Axios from "axios";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const validateSection = pDebounce(async (section_id: string) => {
  const { data } = await Axios.get<boolean>(
    `/validation/section_id/${section_id}`
  );
  return data;
}, 250);

interface IState {
  section_id: string;
  valid: boolean;
}

export class JoinSection extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    const query = parse(this.props.location.search);
    const section_id = Array.isArray(query.section_id)
      ? ""
      : query.section_id || "";
    this.state = {
      section_id,
      valid: false
    };
  }

  public async componentDidMount() {
    if (this.state.section_id) {
      const valid = await validateSection(this.state.section_id);
      this.setState({ valid });
    }
  }
  public handleChange = async ({
    currentTarget: { value }
  }: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ section_id: value });
    const valid = await validateSection(value);
    this.setState({ valid });
  };
  public render() {
    return (
      <div>
        <h2>Request to join a new section</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            name="section_id"
            value={this.state.section_id}
            onChange={this.handleChange}
            style={{ marginBottom: "10px", flexGrow: 0 }}
          />
          <FontAwesomeIcon icon={this.state.valid ? faCheck : faExclamation} />
        </div>
        <button disabled={!this.state.valid} type="submit">
          Submit
        </button>
      </div>
    );
  }
}
