import * as React from "react";
import { SectionSelect } from "./SectionSelect";
import { SidebarStyles } from "../styles/SidebarStyles";
import Router from "next/router";
import { SectionUsers } from "./SectionUsers";
import { CardStyles } from "../styles/CardStyles";
import { SectionOverview } from "./SectionOverview";
import { MainContentStyles } from "../styles/MainContentStyles";
import { UserOverview } from "./UserOverview";
import { NewSection } from "./NewSection";
// import { InstructorConversations } from "./InstructorConversations";

interface IProps {
  section_id?: string;
  user_id?: string;
}

export class Sections extends React.Component<IProps> {
  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    Router.push(`/sections?section_id=${e.currentTarget.value}`);
  };
  public render() {
    return (
      <React.Fragment>
        <div className="sidebar-container">
          <SectionSelect
            value={this.props.section_id || ""}
            onChange={this.handleChange}
          />

          {this.props.section_id && this.props.section_id !== "new" ? (
            <div className="sidebar-list">
              <SectionUsers
                user_id={this.props.user_id}
                section_id={this.props.section_id}
                role="student"
              />
              <SectionUsers
                user_id={this.props.user_id}
                section_id={this.props.section_id}
                role="instructor"
              />
            </div>
          ) : (
            <div className="sidebar-list">
              <div className="card">
                <div className="card-header">
                  Choose a section to view details ^
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="main-content-container">
          {this.props.section_id ? (
            this.props.section_id === "new" ? (
              <NewSection />
            ) : (
              !this.props.user_id && (
                <SectionOverview section_id={this.props.section_id} />
              )
            )
          ) : null}
          {this.props.user_id && <UserOverview user_id={this.props.user_id} />}
        </div>
        <style jsx>{CardStyles}</style>
        <style jsx>{SidebarStyles}</style>
        <style jsx>{MainContentStyles}</style>
      </React.Fragment>
    );
  }
}
