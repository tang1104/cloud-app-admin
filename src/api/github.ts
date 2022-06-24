import axios from "axios";
import { BasicGetResult } from "#/resultType";

export type GithubCommitResultType = {
  commit: {
    author: {
      date: string;
    };
    message: string;
  };
};

/**
 *
 * @description 获取仓库commit信息
 */
export const fetchCommits = (user: string, repo: string, token: string) => {
  const url = `https://api.github.com/repos/${user}/${repo}/commits?access_token=${token}`;
  return new Promise<BasicGetResult<GithubCommitResultType[]>>(async (resolve, reject) => {
    try {
      const res = await axios.get<{}, BasicGetResult<GithubCommitResultType[]>>(url, {
        headers: {
          // token30天需要更换一次
          Authorization: "Bearer " + token
        }
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
