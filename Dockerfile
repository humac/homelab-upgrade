# Multi-stage build for optimized production image
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy application files
COPY index.html .
COPY css/ ./css/
COPY js/ ./js/
COPY data/ ./data/
COPY diagrams/ ./diagrams/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port 80
EXPOSE 80

# Add labels for metadata
LABEL maintainer="homelab-upgrade"
LABEL description="Interactive 10G Homelab Upgrade Guide"
LABEL version="1.0"

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
