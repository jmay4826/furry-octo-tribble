import Axios from "axios";
import * as React from "react";
import { withRouter, WithRouterProps } from "next/router";
import { ApolloConsumer } from "react-apollo";
import { SectionInputBase } from "./SectionInputBase";

interface IState {
  section_id: string;
  success: boolean;
  touched: boolean;
  valid: boolean;
}

interface IProps extends IInputProps, WithRouterProps<{ section_id: string }> {}

interface IInputProps {
  field?: any;
  form?: any;
  error?: string;
  onChange?: (x: React.ChangeEvent<HTMLInputElement>) => void;
}

class SectionInputComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      section_id: "",
      success: false,
      touched: false,
      valid: false
    };
  }

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
      <ApolloConsumer>
        {client => (
          <SectionInputBase
            field={this.props.field}
            error={this.props.error}
            client={client}
            section_id={
              (this.props.router.query && this.props.router.query.section_id) ||
              ""
            }
            onChange={this.props.onChange}
          />
        )}
      </ApolloConsumer>
    );
  }
}

export const SectionInput = withRouter(
  SectionInputComponent
) as React.ComponentType<IInputProps>;
