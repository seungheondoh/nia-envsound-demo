# Requirement

- node --version v18.12.1
- npm --version 8.19.2

# Install
```
npm install
npm run build
docker build -t nginx-react:0.1 .
docker run -d --name my-react-app -p 61002:80 nginx-react:0.1
```

# Customize Your server 

Change [DataManger.js](https://github.com/SeungHeonDoh/nia-envsound-demo/blob/main/frontend/src/hook/DataManger.js)
- YourServer: Your server IP
- BackendPort: Your backend port (plz check backend folder)

```javascript
const getServerData = async(query) => {
	setPreviewRender(false);
	setLoading(true);
	resetPlay();
	try{
		const serverData = await axios(`{YourServer}:{BackendPort}/?query=${query}`)
		const displayTag = getDisplayTag(serverData.data.sim_tag);
		setTagdata(displayTag);
		setSongdata(serverData.data.sim_track);
		setSelectSong(serverData.data.sim_track[0]);
		setLoading(false);
	} catch (e) {
		if (e) {
			console.log(e.message, "Sorry Error!")
		}
	}
}

```
