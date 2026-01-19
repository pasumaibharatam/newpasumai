import { useState } from "react";
import { dmkOrganization } from "../data/dmkOrganization";
import "./DmkOrganization.css";

const DmkOrganization = () => {
  const [activeTab, setActiveTab] = useState("leadership");

  const tabData = dmkOrganization.tabs.find((t) => t.id === activeTab);

  return (
    <div className="dmk-org-page">
      <h1 className="dmk-org-title">{dmkOrganization.title}</h1>

      <div className="dmk-tabs">
        {dmkOrganization.tabs.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTab ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="dmk-content">
        {tabData.members.map((mem, idx) => (
          <div key={idx} className="dmk-member-card">
            {mem.photo && (
              <img
                src={mem.photo}
                alt={mem.name}
                className="dmk-member-photo"
              />
            )}
            <div>
              {mem.district && <p className="dmk-district">{mem.district}</p>}
              <h3 className="dmk-member-name">{mem.name}</h3>
              <p className="dmk-member-role">{mem.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DmkOrganization;
