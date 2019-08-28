export const defaults = {
  selectedBoardID: String(localStorage.getItem("BoardID"))
};

export const resolvers = {
  Mutation: {
    selectBoard: (_, { boardID }, { cache }) => {
      localStorage.setItem("BoardID", boardID);
      cache.writeData({
        data: {
          selectedBoardID: boardID
        }
      });
      return null;
    }
  }
};
