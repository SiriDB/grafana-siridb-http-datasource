# Grafana SiriDB HTTP datasource
A SiriDB datasource plugin for Grafana.

## Requirements
SiriDB HTTP is required for this plugin. If you do not have a SiriDB HTTP instance running then
it might be a good choice to install SiriDB HTTP on your Grafana server.

[https://github.com/SiriDB/siridb-http](https://github.com/SiriDB/siridb-http#readme)

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
git clone https://github.com/SiriDB/grafana-siridb-http-datasource.git
```

Restart Grafana
```
sudo systemctl restart grafana-server.service
```

## Usage
See the following blog article on how to configure and use this plugin: https://github.com/SiriDB/grafana-siridb-http-example.

>**Note**:
>
>Since SiriDB version 2.0.36 and Grafana-Sirdb-HTTP-datasource version 1.1.0 you can use the build-in HTTP API instead of the [SiriDB http connector](https://github.com/SiriDB/siridb-http).
>In this case you only need to provide URL: https://localhost:9020/query/dbname when you add a data source in Grafana.
>If you still wish to use the SiriDB HTTP connector you have to configure and start the SiriDB HTTP service and you need to enter the URL:https://localhost:5050/query when adding the data source to Grafana.
