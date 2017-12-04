# Grafana SiriDB HTTP datasource
A SiriDB datasource plugin for Grafana.

## Requirements
SiriDB HTTP is required for this plugin. If you do not have a SiriDB HTTP instance running then
it might be a good choice to install SiriDB HTTP on your Grafana server.

[https://github.com/transceptor-technology/siridb-http](https://github.com/transceptor-technology/siridb-http#readme)

Make sure to configure SiriDB HTTP to allow Basic Authentication. Optionally you can also choose
to disable authentication.

>Note: at least SiriDB server version 2.0.14 is required since this plugin makes use of the
>limit aggregation function.


## Installation

Go to the Grafana plugins folder. (usually this is /var/lib/grafana/plugins/)

```
cd /var/lib/grafana/plugins/
```

Clone the git project into the plugins folder:
```
git clone https://github.com/transceptor-technology/grafana-siridb-http-datasource.git
```

Restart Grafana
```
sudo systemctl restart grafana-server.service
```

## Usage
See the following blog article on how to configure and use this plugin: https://github.com/transceptor-technology/grafana-siridb-http-example.
