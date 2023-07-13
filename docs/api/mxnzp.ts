
export const getFestival = async (year: number) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.mxnzp.com/api/holiday/list/year/${year}/festival?app_id=xjrlpumueaxukyov&app_secret=Q2FoMFNub0FndmtJUGRUUElIWTRLQT09`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json()).then((res) => {
      const { code, data, msg } = res || {}
      if (code === 1) {
        resolve(data)
      } else {
        reject({ msg });
      }
    }).catch((err) => {
      getFestival(year).then((res) => {
        resolve(res)
      })
      reject({ err })
    })
  })
}