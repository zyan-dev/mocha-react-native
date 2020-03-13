const getAllMembersWithNetworkState = state => {
  const trustMembers = state.usersReducer.trustMembers;
  const result = state.usersReducer.allUsers.map(user => {
    const filtered = trustMembers.find(
      trustMember =>
        trustMember.joiner === user._id || trustMember.owner === user._id, // joiner's request to owner
    );
    return {
      ...user,
      networkState: filtered ? filtered.status : -1,
      // -1: no relation, 0: pending, 1: approved
    };
  });
  return result;
};

const getAllPendingUsers = state => {
  const myUserId = state.profileReducer._id;
  const trustMembers = state.usersReducer.trustMembers;
  let result = [];
  trustMembers.map(trust => {
    if (trust.owner === myUserId && trust.status === 0) {
      const find = state.usersReducer.allUsers.find(
        user => user._id === trust.joiner,
      );
      result.push({
        ...find,
        requestId: trust._id,
      });
      console.log(trust._id);
    }
  });
  return result;
};

export {getAllMembersWithNetworkState, getAllPendingUsers};
