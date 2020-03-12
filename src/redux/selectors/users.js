const getAllMembersWithNetworkState = state => {
  const trustMembers = state.usersReducer.trustMembers;
  const result = state.usersReducer.allUsers.map(user => {
    const filtered = trustMembers.find(
      trustMember =>
        trustMember.joiner === user._id || trustMember.owner === user._id, // owner's request to joiner
    );
    return {
      ...user,
      networkState: filtered ? filtered.status : -1,
      // -1: no relation, 0: pending, 1: approved
    };
  });
  return result;
};

export {getAllMembersWithNetworkState};
