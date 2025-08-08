FROM codercom/code-server:4.96.4

USER root
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

USER coder
EXPOSE 8080

WORKDIR /app

RUN wget https://github.com/code100x/mobile-magic/raw/refs/heads/main/ext/bolty-listener-0.0.1.vsix
RUN code-server --install-extension bolty-listener-0.0.1.vsix
RUN rm bolty-listener-0.0.1.vsix

# Set default theme to dark
RUN mkdir -p /home/coder/.local/share/code-server/User
RUN echo '{"workbench.colorTheme": "Dark+", "workbench.preferredDarkColorTheme": "Dark+"}' > /home/coder/.local/share/code-server/User/settings.json

RUN mkdir ~/Project
RUN echo 'console.log("Namaste World")' > ~/Project/index.js

RUN mkdir -p ~/.local/share/code-server/User
RUN echo '{"workbench.colorTheme": "Dark+", "workbench.preferredDarkColorTheme": "Dark+"}' > ~/.local/share/code-server/User/settings.json

CMD ["code-server", "--auth", "none", "--bind-addr", "0.0.0.0:8080", "--disable-telemetry", "/home/coder/Project"]

