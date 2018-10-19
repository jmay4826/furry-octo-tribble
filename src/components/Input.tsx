import * as React from "react";
import "../inputComponent.css";

interface IProps
  extends React.InputHTMLAttributes<
      HTMLInputElement | HTMLDivElement | HTMLLabelElement
    > {
  label?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  field?: any;
  error?: string;
  additionalChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IState {
  focused: boolean;
}

export class Input extends React.Component<IProps, IState> {
  public input: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.input = React.createRef();
    this.state = { focused: false };
  }
  public handleFocus = () => {
    this.setState({ focused: true });
  };
  public handleBlur = () => {
    this.setState({ focused: false });
  };

  public handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (this.input.current) {
      this.input.current.focus();
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.field && this.props.field.onChange) {
      this.props.field.onChange(e);
    } else if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (this.props.additionalChange) {
      this.props.additionalChange(e);
    }
  };

  public render() {
    const {
      label,
      style,
      inputStyle,
      inputClassName,
      className,
      placeholder,
      field,
      form,
      children,
      error,
      additionalChange,
      onChange,
      ...props
    } = this.props;

    return (
      <div
        className={`input-component-container ${className || ""}`}
        style={style}
      >
        <input
          ref={this.input}
          className={`input-component-input ${inputClassName || ""}`}
          style={{ ...inputStyle, border: error ? "1px  solid red" : "" }}
          {...field}
          {...props}
          onChange={this.handleChange}
        />
        <label
          onClick={this.handleClick}
          className={`input-component-label ${!!this.input.current &&
            !this.input.current.value &&
            "placeholder"}`}
        >
          {label}
        </label>
        <div className={`input-component-error ${!error ? "hidden" : ""}`}>
          * {error}
        </div>
      </div>
    );
  }
}
