import * as React from "react";

interface IProps
  extends React.InputHTMLAttributes<
      HTMLInputElement | HTMLDivElement | HTMLLabelElement
    > {
  label?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  field?: any;
  error?: string;
  preserveSpace?: boolean;
  copyOnClick?: boolean;
}

interface IState {
  touched: boolean;
  copied: boolean;
}

export class Input extends React.Component<IProps, IState> {
  public input: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.input = React.createRef();
    this.state = { touched: false, copied: false };
  }
  public handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState({ touched: true });
  };

  public handleClick = (
    e: React.MouseEvent<HTMLLabelElement | HTMLInputElement>
  ) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (this.input.current) {
      this.input.current.focus();
      if (this.props.copyOnClick) {
        this.input.current.select();
        document.execCommand("copy");
        this.setState({ copied: true }, () =>
          setTimeout(() => this.setState({ copied: false }), 3000)
        );
      }
    }
  };

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.field && this.props.field.onChange) {
      this.props.field.onChange(e);
    }
    if (this.props.onChange) {
      this.props.onChange(e);
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
      onChange,
      preserveSpace = true,
      copyOnClick,
      ...props
    } = this.props;

    return (
      <div
        className={`input-component-container ${className || ""}`}
        style={style}
      >
        {field ? (
          <input
            ref={this.input}
            className={`input-component-input ${inputClassName || ""}`}
            style={{
              ...inputStyle,
              border: this.state.touched && error ? "1px  solid red" : ""
            }}
            {...field}
            {...props}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
        ) : (
          <input
            ref={this.input}
            className={`input-component-input ${inputClassName || ""}`}
            style={{
              ...inputStyle,
              border: this.state.touched && error ? "1px  solid red" : ""
            }}
            {...props}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onClick={copyOnClick ? this.handleClick : undefined}
          />
        )}
        <label
          onClick={this.handleClick}
          className={`input-component-label ${!!this.input.current &&
            !this.input.current.value &&
            "placeholder"}`}
        >
          {label} {this.state.copied && " -- copied!"}
        </label>
        <div
          className={`input-component-error ${
            this.state.touched && error ? "" : "hidden"
          }`}
          style={preserveSpace ? {} : { display: "none" }}
        >
          * {error}
        </div>
        <style jsx={true}>{`
          .input-component-container {
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 0;
            margin: 10px;
          }

          .input-component-label {
            font-family: "Varela Round";
            transition: all 250ms;
            padding: 5px;
            position: absolute;
            color: gray;
            font-size: 0.95em;
          }

          .input-component-input:focus + .input-component-label {
            padding: 5px;
            padding-top: 5px;
            font-size: 0.95em;
          }

          .input-component-label.placeholder {
            font-size: 1.2em;
            padding: 11px;
            padding-top: 1em;
          }

          .input-component-input {
            font-family: "Varela Round";
            font-size: 1.2em;
            padding: 10px;
            margin: 10px;
            border: 1px solid #e5e9f2;
            border-radius: 6px;
            background-color: rgba(255, 255, 255, 1);
            padding-top: 1.5em;
            margin: 0;
            flex-grow: 1;
          }

          .full-width {
            width: 100%;
          }

          .input-component-error {
            margin: 5px 5px;
            transition: opacity 250ms;
            text-align: initial;
          }

          .input-component-error.hidden {
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }
}
