import { Alert } from "react-bootstrap";

export default function PreviewAlert() {
  return (
    <Alert variant="secondary">
      This is the preview mode!{" "}
      {/* This will lead me to API route that will remove previw cookies*/}
      <Alert.Link href="/api/exit-preview">Leave preview mode</Alert.Link>
    </Alert>
  );
}
