FROM mhart/alpine-node:11 AS builder

WORKDIR /client

COPY . ./

RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve

WORKDIR /client

COPY --from=builder /client/build .çp
CMD ["serve", "-s", "."]
