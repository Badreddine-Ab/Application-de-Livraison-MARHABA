#here we're specifying the version of node
#we can use the :latest tag as well.
FROM node:18

#here we're defining the working directory
WORKDIR /user/src/app

#copying our dependencies to the container
COPY ./package.json ./
COPY ./package-lock.json ./

#installing all the dependencies that we copied 
RUN npm install


#copying all the files inside the container
COPY . .

#exposing the port so we can access it further
EXPOSE 8080

#starting the server
CMD ["node", "server.js"]