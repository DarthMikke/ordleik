FROM --platform=$BUILDPLATFORM node:22 AS build

RUN mkdir /app
WORKDIR /app
COPY . .

RUN npm i
RUN npm run build

FROM nginx:1.27.4-alpine
COPY --from=build /app/dist /usr/share/nginx/html
