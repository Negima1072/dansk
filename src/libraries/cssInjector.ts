const style = `
.MainContainer-playerPanel {
  display: flex;
  flex-direction: column;
}
.OwnerEditPanelContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
.OwnerEditPanel {
  display: flex;
  flex-direction: column;
}
.PlayerPanelContainer {
  position: unset!important;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.PlayerPanelContainer-content {
  position: unset!important;
  flex: 1;
}
.VideoListPanelContainer {
  position: unset!important;
  height: 100%;
}
.PlayerPanelContainer-tab {
  flex-shrink: 0;
}
div.grid-area_\\[player\\] > div.pos_relative > div > div > div > div.d_flex {
  z-index: 12;
}
#dansk\\:FooterElement {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
div.grid-area_\\[player\\] > div[tabindex='0'] > div > div.p_base {
  position: relative;
  z-index: 11;
}
section:has(> div.grid-area_\\[player\\]) {
  grid-template-areas:
    "d_header sidebar"
    "player sidebar"
    "d_footer sidebar"
    "meta sidebar"
    "bottom sidebar"
    ". sidebar";
}
`;

export const inject = () => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = style;
  document.body.append(styleElement);
};
