import { useState } from "react";
import { PSetConfigure } from "./pages/p_set_configure";
import { PAssumeRoleLinks } from "./pages/p_assume_role_links";

function App() {
  const [config, setConfig] = useState("");
  const [flag, setFlag] = useState(false);

  const page = flag ? (
    <PAssumeRoleLinks setFlag={setFlag} config={config} />
  ) : (
    <PSetConfigure config={config} setConfig={setConfig} setFlag={setFlag} />
  );

  return (
    <>
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <a className="navbar-item">
            <strong>
              Generate Switch Role Links by AWS Extend Switch Roles Config
            </strong>
          </a>
        </div>
      </nav>
      <div className="container pt-5">{page}</div>
    </>
  );
}

export default App;
