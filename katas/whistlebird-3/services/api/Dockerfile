FROM node:18
WORKDIR /app
COPY ./app /app
RUN npm install -g nodemon
RUN npm install
ENV POSTGRES_URL=postgresql://whistlebird:Whistlebird1337@postgres:5432/postgres
EXPOSE 3000
CMD ["nodemon", "api/server.js"]
