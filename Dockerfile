# Etapa 1: Construcción
FROM node:20-alpine AS build

# Instalar Java y CURL (necesarios para la generación)
RUN apk add --no-cache openjdk17-jre-headless curl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Sobrescribimos el comando de generación para que funcione en Linux/Docker
# Cambiamos 'localhost' por 'host.docker.internal' y 'del' por 'rm'
RUN curl -k https://host.docker.internal:7193/swagger/v1/swagger.json -o swagger_temp.json \
    && npx @openapitools/openapi-generator-cli generate \
    -i swagger_temp.json \
    -g typescript-angular \
    -o src/app/core/api \
    --additional-properties=providedInRoot=true,useSingleRequestParameter=false \
    && rm swagger_temp.json

RUN npm run build -- --configuration=production

# Etapa 2: Nginx
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/Comitructor.Frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
