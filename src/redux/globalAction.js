import ActionType from "./globalActionType";

export const globalAction = {
  getDetail
};

function getDetail(data) {
  return (dispatch) => {
    dispatch({
      type: ActionType.GET_DETAIL,
      payload: {
        data: data,
      },
    });
  };
}
