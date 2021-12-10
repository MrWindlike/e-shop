### Setup
```bash
# install packages
yarn
# init database
cd ./packages/backend
node ace migration:run
node ace db:seed
```

### Start 

```bash
# start node
npm run serve:node
# start frontend
npm run serve:web
# start admin
npm run serve:admin
```

## Build
```bash
npm run build
```
