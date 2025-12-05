export const Toast = ({ message, visible }: { message: string; visible: boolean }) => (
  <div className={`toast ${visible ? 'visible' : ''}`}>
    <span>{message}</span>
  </div>
);
