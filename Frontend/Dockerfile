# Use a lightweight base image
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the HTML, CSS, and JavaScript files to the container
COPY index.html .
COPY style.css .
COPY script.js .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow incoming traffic
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
