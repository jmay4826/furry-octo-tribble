import Axios from "axios";
import * as pDebounce from "p-debounce";
import { parse } from "query-string";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Input } from "./Input";

const validateSection = pDebounce(async (id: string) => {
  const { data } = await Axios.get<boolean>(`/validation/section_id/${id}`);
  return data;
}, 250);

interface IState {
  section_id: string;
  success: boolean;
  touched: boolean;
  valid: boolean;
}

export class JoinSection extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    // const query = parse(this.props.location.search);
    // tslint:disable-next-line:variable-name
    // const section_id = Array.isArray(query.section_id)
    //   ? ""
    //   : query.section_id || "";
    this.state = {
      section_id: "",
      success: false,
      touched: false,
      valid: false
    };
  }

  public async componentDidMount() {
    //   if (this.state.section_id) {
    //     const valid = await validateSection(this.state.section_id);
    //     this.setState({ valid });
    //   }
  }
  public handleChange = async ({
    currentTarget: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ section_id: value });
    const valid = await validateSection(value);
    this.setState({ valid });
  };

  public handleSubmit = async () => {
    await Axios.post(
      "/api/users/sections",
      { section_id: this.state.section_id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    this.setState({ success: true });
  };

  public setTouched = () => this.setState({ touched: true });

  public render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Request to join a new section</h3>
        {/* <div style={{ display: "flex", alignItems: "center" }}> */}
        <Input
          name="section_id"
          label="Section ID"
          value={this.state.section_id}
          onChange={this.handleChange}
          error={
            this.state.touched && !this.state.valid ? "Section not found" : ""
          }
          onFocus={this.setTouched}
        />
        {/* </div> */}
        <button disabled={!this.state.valid} onClick={this.handleSubmit}>
          Submit
        </button>
        {this.state.success && "Added to section"}
      </div>
    );
  }
}
