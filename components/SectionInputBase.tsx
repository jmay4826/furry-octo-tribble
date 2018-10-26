import * as React from "react";
import { Input } from "./Input";
import { ApolloClient } from "apollo-boost";
import * as pDebounce from "p-debounce";
import gql from "graphql-tag";

interface IProps {
  section_id: string;
  client: ApolloClient<any>;
  onChange?: (x: React.ChangeEvent<HTMLInputElement>) => void;
  field?: any;
  error?: string;
}

const VALIDATE_SECTION = gql`
  query VALIDATE_SECTION($section_id: String!) {
    validateSection(section_id: $section_id) {
      id
    }
  }
`;

export class SectionInputBase extends React.Component<IProps, any> {
  state = {
    section_id: this.props.section_id,
    valid: false,
    touched: false,
    success: false,
    validating: false
  };
  debounced = pDebounce((value: string) => {
    return this.props.client.query<{ validateSection?: { id: String } }>({
      query: VALIDATE_SECTION,
      variables: { section_id: value }
    });
  }, 250);

  handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value }
    } = e;

    this.setState({ [name]: value, validating: true });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    const section = await this.debounced(value);
    this.setState({ valid: !!section.data.validateSection, validating: false });
  };

  handleFocus = async () => {
    this.setState({ validating: true });
    const section = await this.debounced(this.state.section_id);
    this.setState({
      touched: true,
      valid: !!section.data.validateSection,
      validating: false
    });
  };

  public render() {
    return this.props.field ? (
      <Input
        name="section_id"
        label="Section ID"
        value={this.state.section_id}
        onChange={this.handleChange}
        field={this.props.field}
        onFocus={this.handleFocus}
        error={
          this.state.touched && !this.state.valid && this.state.section_id
            ? this.state.validating
              ? "Looking for section..."
              : "Section not found"
            : this.props.error || ""
        }
      />
    ) : (
      <Input
        name="section_id"
        label="Section ID"
        value={this.state.section_id}
        onChange={this.handleChange}
        error={
          this.state.touched && !this.state.valid && this.state.section_id
            ? this.state.validating
              ? "Looking for section..."
              : "Section not found"
            : this.props.error || ""
        }
        onFocus={this.handleFocus}
      />
    );
  }
}
