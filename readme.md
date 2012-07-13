NoNameYet
---------

An attempt at building an open source bill aggregator.

The idea is to be able to easily collect bill information from all providers.

Right now there is only one "supporter" provider (sprint). Only because I have and account with them.

This assumes you have CasperJS.

Example:
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
````

To add a provider you just need to create a new directory in a reverse dns folder structure under the providers directory
(aka sprint.com => /providers/com/sprint/).

In that directory you can have a login.js.

I'm still not 100% sure on the format of these files, and I'm still thinking everything over.

All ideas welcome.