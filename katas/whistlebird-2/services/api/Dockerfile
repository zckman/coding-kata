FROM node:20-alpine

ARG USER_UID
ENV USER_UID ${USER_UID}

ARG USER_GID
ENV USER_GID ${USER_GID}

USER root

WORKDIR /app
COPY package.json /app
COPY index.js /app

RUN set -eux ; \
    apk  update ; \
    apk  add shadow ; \
    # Check if group exists, on mac this might be the case as they use
    # system groups as default gid for users
    if ! getent group "${USER_GID}" ; then groupadd -g ${USER_GID} nodeuser; fi ; \
    if ! getent passwd "${USER_UID}" ; then useradd -m -u ${USER_UID} -g ${USER_GID} nodeuser; fi ; \
    usermod -g ${USER_GID} -s /bin/sh $(getent passwd "${USER_UID}" | cut -d: -f1) ; \
    apk del shadow ; \
    npm install ; \
    npm cache clean --force ; \
    rm -rf /tmp/* /var/tmp/* /var/cache/*;

USER ${USER_UID}:${USER_GID}

CMD ["node", "index.js"]
