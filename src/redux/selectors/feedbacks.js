const getMyFeedbacks = state => {
  const myUserId = state.profileReducer._id;
  const myFeedbacks = state.feedbackReducer.myFeedbacks;
  // sender: who sent the feedback request
  // receiver who received the feedback request
  const sent = myFeedbacks.filter(
    f => f.receiver._id === myUserId && !f.pending,
  );
  const requested = myFeedbacks.filter(
    f => f.sender._id === myUserId && f.pending,
  );
  const pending = myFeedbacks.filter(
    f => f.receiver._id === myUserId && f.pending,
  );
  const received = myFeedbacks.filter(
    f => f.sender._id === myUserId && !f.pending,
  );
  return {sent, requested, pending, received};
};

const getUserFeedbacks = state => {
  const userId = state.usersReducer.userProfile._id;
  const userFeedbacks = state.feedbackReducer.userFeedbacks;
  // sender: who sent the feedback request
  // receiver who received the feedback request
  const sent = userFeedbacks.filter(
    f => f.receiver._id === userId && !f.pending,
  );
  const requested = userFeedbacks.filter(
    f => f.sender._id === userId && f.pending,
  );
  const pending = userFeedbacks.filter(
    f => f.receiver._id === userId && f.pending,
  );
  const received = userFeedbacks.filter(
    f => f.sender._id === userId && !f.pending,
  );
  return {sent, requested, pending, received};
};

export {getMyFeedbacks, getUserFeedbacks};
