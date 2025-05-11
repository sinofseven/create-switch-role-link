import type { ChangeEvent } from "react";

type PropsPSetConfigure = {
  config: string;
  setConfig: (config: string) => void;
  setFlag: (flag: boolean) => void;
};

export function PSetConfigure({
  config,
  setConfig,
  setFlag,
}: PropsPSetConfigure) {
  function changeTextarea(e: ChangeEvent<HTMLTextAreaElement>) {
    setConfig(e.target.value);
  }

  return (
    <>
      <nav className="breadcrumb">
        <ul>
          <li className="is-active">
            <a>Set Configuration</a>
          </li>
          <li>
            <a className="has-text-grey" style={{ cursor: "not-allowed" }}>
              Assume Role Links
            </a>
          </li>
        </ul>
      </nav>
      <textarea
        className="textarea mt-4"
        style={{ height: "300px" }}
        value={config}
        onChange={changeTextarea}
      />
      <p className="has-text-right mt-4">
        <button className="button is-primary" onClick={() => setFlag(true)}>
          SET
        </button>
      </p>
    </>
  );
}
