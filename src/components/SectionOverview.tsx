import * as React from "react";
import { RouteComponentProps } from "react-router";

interface IParams {
  section_id: string;
}
class SectionOverview extends React.Component<
  RouteComponentProps<IParams>,
  any
> {
  constructor(props: RouteComponentProps<IParams>) {
    super(props);
  }

  public componentDidMount() {
    console.log("mounted");
  }
  public render() {
    return (
      <React.Fragment>
        <p>Students without conversations:</p>
        <p>Conversations without messages:</p>
        <p>Conversations with no activity 7 days+</p>
        <p>Sections paired with</p>
        <button>Randomly pair students with section X</button>
      </React.Fragment>
    );
  }
}

export { SectionOverview };
