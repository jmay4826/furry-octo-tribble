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
      ...props
    } = this.props;

    return (
      <div
        className={`input-component-container ${className || ""}`}
        style={style}
      >
        <input
          ref={this.input}
          className={`input-component-input ${className || ""}`}
          style={inputStyle}
          {...field}
          {...props}
        />
        <label
          onClick={this.handleClick}
          className={`input-component-label ${!!this.input.current &&
            !this.input.current.value &&
            "placeholder"}`}
        >
          {label}
        </label>
      </div>
    );
  }
}
