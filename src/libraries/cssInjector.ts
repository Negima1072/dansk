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
}
.PlayerPanelContainer-content {
  position: unset!important;
  flex: 1;
}
`;

const inject = () => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = style;
  document.body.append(styleElement);
};
export default inject;
