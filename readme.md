NoNameYet
---------

An attempt at building an open source bill aggregator.

The idea is to be able to easily collect bill information from all providers.

Right now there are only a few providers:
 - Sprint.com
 - TimeWarnerCable.com

This assumes you have CasperJS.

Examples:
```
casperjs providers/com/sprint/login.js --user=YourUserName --pass=SuperSecretPassword
```

return:


```
{
    "prevTotal": "$100.71",
    "total": "$106.13",
    "account": "123456789",
    "billingCycle": "Jun 02-Jul 01"
}
```

```
casperjs providers/com/timewarnercable/login.js --user=YourUserName --pass=SuperSecretPassword
```

return:


```
{
    "prevTotal": "$49.99",
    "current": "$49.99",
    "total": "$55.98",
    "account": "1111111122222222",
    "billingCycle": "06/27/12"
}
```

To add a provider you just need to create a new directory in a reverse dns folder structure under the providers directory
(aka sprint.com => /providers/com/sprint/).

In that directory you can have a login.js.

I'm still not 100% sure on the format of these files, and I'm still thinking everything over.

All ideas welcome.