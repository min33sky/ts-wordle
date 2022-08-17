import ReactDOM from 'react-dom';

export function Portal({
  children,
  selector = '#portal',
}: {
  children: React.ReactNode;
  selector?: string;
}) {
  const element =
    typeof window !== 'undefined' && document.querySelector(selector);
  return element && children ? ReactDOM.createPortal(children, element) : null;
}
