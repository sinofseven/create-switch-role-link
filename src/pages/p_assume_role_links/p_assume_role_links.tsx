import { parse } from "ini";

type PropsPAssumeRoleLinks = {
  config: string;
  setFlag: (flag: boolean) => void;
};

type Account = {
  aws_account_id?: string;
  source_profile?: string;
  role_arn?: string;
  region?: string;
  role_name?: string;
};

type LinkData = {
  text: string;
  link: string;
};

function convert(key: string, value: any): LinkData | null {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return null;
  }

  const data = value as Account;

  if (data.aws_account_id != null && data.role_name != null) {
    return {
      text: `[${data.aws_account_id}] ${key}`,
      link: `https://signin.aws.amazon.com/switchrole?account=${data.aws_account_id}&roleName=${data.role_name}&displayName=${encodeURI(key)}`,
    };
  } else if (data.role_arn != null) {
    const parts = data.role_arn.split(":");
    const index = parts[5].indexOf("/");
    return {
      text: `[${parts[4]}] ${key}`,
      link: `https://signin.aws.amazon.com/switchrole?account=${parts[4]}&roleName=${parts[5].substring(index + 1)}&displayName=${encodeURI(key)}`,
    };
  } else {
    return null;
  }
}

function parseConfig(config: string): Array<LinkData> {
  const result = parse(config);
  return Object.entries(result)
    .map(([k, v]) => convert(k, v))
    .filter((v) => v != null);
}

export function PAssumeRoleLinks({ setFlag, config }: PropsPAssumeRoleLinks) {
  const data = parseConfig(config);
  const items = data.map((v) => (
    <li>
      <a href={v.link} target="_blank" rel="noreferrer noopener">
        {v.text}
      </a>
    </li>
  ));
  return (
    <>
      <nav className="breadcrumb">
        <ul>
          <li>
            <a onClick={() => setFlag(false)}>Set Configuration</a>
          </li>
          <li className="is-active">
            <a>Assume Role Links</a>
          </li>
        </ul>
      </nav>
      <div className="content pb-6 mb-6">
        <ul>{items}</ul>
      </div>
    </>
  );
}
