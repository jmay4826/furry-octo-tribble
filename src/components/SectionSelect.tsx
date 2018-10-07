import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  handleSelect: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
  sections: ISection[];
  value: string;
}

const SectionSelect = ({ handleSelect, sections, value }: IProps) => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      margin: "10px"
    }}
  >
    <select style={{ flexGrow: 1 }} value={value} onChange={handleSelect}>
      <option key="new" value="new">
        New Section
      </option>
      {sections.map(section => (
        <option key={section.section_id} value={section.section_id}>
          {section.name}
        </option>
      ))}
    </select>

    <Link to="/sections/new">
      <FontAwesomeIcon
        icon={faPlusSquare}
        size="lg"
        style={{ marginLeft: "10px" }}
      />
    </Link>
  </div>
);

export { SectionSelect };
