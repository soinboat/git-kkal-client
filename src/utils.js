const getBranchList = (repoData) => {
  const branchList = repoData.branchList.map((log) => log.branchName2);
  return branchList.filter(
    (branch, index) => branchList.indexOf(branch) === index,
  );
};

export default getBranchList;
