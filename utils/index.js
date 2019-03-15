const storage = weex.requireModule('storage')

class Util {
	static clearStorage(exclution) {
		let removeProcess = []
		storage.getAllKeys((e) => {
			if (e.result === "success") {
				let keys = e.data
				keys = keys.filter((v) => {
					return exclution.indexOf(v) === -1
				})
				keys.forEach((v, i) => {
					removeProcess.push(new Promise((r, j) => {
						storage.removeItem(v, (e) => {
							if (e.result === "success") {
								r(true)
							} else {
								j(false)
							}
						})
					}))
				})

			}
		})
		return Promise.all(removeProcess)
	}
}

export default Util