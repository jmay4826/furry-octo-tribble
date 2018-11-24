import * as React from "react";
import { MainContentStyles } from "../styles/MainContentStyles";
import { SectionInfo } from "./SectionInfo";
import { NoConversationsOutliers } from "./NoConversationsOutliers";
import { NoMessagesOutliers } from "./NoMessagesOutliers";

export const SectionOverview = ({ section_id }: { section_id: string }) => {
  return (
    <React.Fragment>
      <div className="main-content-header">{section_id}</div>
      <div className="main-content">
        <SectionInfo section_id={section_id} />
        <NoConversationsOutliers section_id={section_id} />
        <NoMessagesOutliers section_id={section_id} />
      </div>

      <style jsx>{MainContentStyles}</style>
    </React.Fragment>
  );
};
