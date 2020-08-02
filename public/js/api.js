const api = {
   host: "http://192.168.0.246:3000/api",
  isShowLog: true,
  fetchCount: 0,
  loadingBeginAction: null,
  loadingEndAction: null,

  showLoading: function () {
    if (this.loadingBeginAction !== null) this.loadingBeginAction();
  },

  hideLoading: function () {
    if (this.fetchCount <= 0)
      if (this.loadingEndAction !== null) this.loadingEndAction();
  },

  fetch: function (param) {
    this.fetchCount++;
    let fetchData = {
      method: param.method ? param.method : "GET",
      headers: { "Content-Type": "application/json" },
    };

    if (
      param.method === "POST" ||
      param.method === "PATCH" ||
      param.method === "DELETE"
    ) {
      fetchData.body = JSON.stringify(param.body);
    }

    if (this.isShowLog)
      console.log(`[API] fetch(${fetchData.method}): ${param.path}`);

    this.showLoading();

    fetch(this.host + param.path, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          this.fetchCount--;
          this.hideLoading();
          if (typeof param.success != "undefined") param.success(result);
        },
        (error) => {
          this.fetchCount--;
          this.hideLoading();
          if (typeof param.error != "undefined") param.error(error);
        }
      );
  },
};
