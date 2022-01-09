import { useState } from "react";

function useStatus() {
  const STATUS = {
    IDLE: "idle",
    PENDING: "pending",
    RESOLVED: "resolved",
    REJECTED: "rejected",
  };

  const [status, setStatus] = useState(STATUS.IDLE);

  return [status, setStatus, STATUS];
}

export default useStatus;
