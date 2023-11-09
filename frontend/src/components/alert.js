import React from 'react';

// Hook for displaying alert messages
function Alert({ type = "danger", messages = []}) {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div>
      {messages.map(err => (
        <p className="mb-0 small" key={err}>{err}</p>
      ))};
    </div>
  );
};

export default Alert;