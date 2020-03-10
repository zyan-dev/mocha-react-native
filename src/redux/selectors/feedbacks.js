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

export {getMyFeedbacks};
