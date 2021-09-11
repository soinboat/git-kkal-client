export const getBranchList = (repoData) => {
  const branchList = repoData.logList.map((log) => log.branchName2);
  return branchList.filter(
    (branch, index) => branchList.indexOf(branch) === index,
  );
};

export const filterGitExtension = (repoUrl) =>
  repoUrl.indexOf('.git') === -1 ? repoUrl : repoUrl.slice(0, -4);
