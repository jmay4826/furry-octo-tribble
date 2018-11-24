import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Link from "next/link";
import { User } from "./User";

interface IProps {
  onChange: (e: React.SyntheticEvent<HTMLSelectElement>) => void;
  value: string;
  style?: React.CSSProperties;
}

const SectionSelect = ({ onChange, value, style }: IProps) => (
  <User>
    {({ data, loading, error }) => {
      if (!data) return <p>Error</p>;
      return (
        <React.Fragment>
          <select
            style={{ flexGrow: 1, ...style }}
            value={value}
            onChange={onChange}
          >
            <option>Choose a Section</option>
            <option key="new" value="new">
              New Section
            </option>
            {data.me.user_sections.map(section => (
              <option key={section.section.id} value={section.section.id}>
                {section.section.id}
              </option>
            ))}
          </select>
          <style jsx>{`
            select {
              height: calc(1.2em + 20px);
              font-family: "Varela Round";
              font-size: 1.2em;
              font-weight: 300;
              border: 1px solid #e5e9f2;
              border-radius: 6px;
              background-color: rgba(255, 255, 255, 1);
              margin: 10px;
            }

            select.inline {
              font-size: 1em;
              height: calc(1em + 20px);
            }
          `}</style>
        </React.Fragment>
      );
    }}
  </User>
);

export { SectionSelect };
