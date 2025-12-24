![](https://cdn-images-1.medium.com/max/2000/1*tmEFJ0LreB8wabdi67XY-Q.jpeg)

**Prepared statement**s are a common thing sql world. It has many benefits like it can execute the same (or similar) SQL statements repeatedly with high efficiency. It can also prevent one of the biggest security vulnerabilities, **SQL injection**.

Compared to executing the query directly, there are primarily 3 advantages. Taking these points from w3schools,
1. Prepared statements reduce parsing time as the preparation on the query is done only once (although the statement is executed multiple times).

2. Bound parameters minimize bandwidth to the server as you need send only the parameters each time, and not the whole query. At a later time, the application binds the values to the parameters, and the database executes the statement. The application may execute the statement as many times as it wants with different values.

3. Prepared statements are very useful against SQL injections, because parameter values, which are transmitted later using a different protocol, need not be correctly escaped. If the original statement template is not derived from external input, SQL injection cannot occur.

### SQL Injections

During an SQL injection attack, the attacker tries to bind malicious sql code with the input parameter. In earlier days, we saw http queries like `user?id=1`, the id would be an input for the `id` of the users table. Behind the scene, the backend code is doing making some query using that input.

Imagine we want to just read the user data from database where the id is $id (from query param). Our sql query would translate to something like this

```rust
SELECT (coulmns…) FROM users WHERE id = 1;
```

But what if the the attacker used the following instead of the id

```rust
user?id=1;DROP TABLE users;
```

As HTTP requests are parsed as strings (primarily), though we want id to be numeric, without proper sanitization the query would be

```rust
SELECT (coulmns…) FROM users WHERE id = 1; DROP TABLE users;
```

And given that there is sufficient permissions, this query would execute and drop the users table; A permanent mutation.

### Prepared Statements

This can be prevented by using `prepared statement`s. The root cause of that problem was not separating the sql code and input data. And **the query and the data are sent to the database server separately**.

Using prepared statements, we’ll have something like

```rust
SELECT (columns…) FROM users where id=?"
```

and data would be `**1**`;

As our SQL query is **a valid program as of itself**, if we are directly making a query, we are dynamically building the query aka *program* in the runtime and sending it to the sql server, but using prepared statements, we first send the query `*SELECT (columns…) FROM users where id=?”*` first. And thats our program.

Now, this program needs 1 (*id=?*) parameter in this example. Now we send the second piece, our data is *$data=1*;

In this approach, our core SQL program (the query) can not be altered, the second request is only feeding the data itself.

### Command vs Data

Or *to execute or not to*. So what happens if we still use the same input `?id=1;DROP TABLE users;` ? Well, the input is not parsed, neither executed. Imagine having an executable but not executing it.

Lets take a look at the following code,

```rust
$data = "1; DROP TABLE users;"
$db->prepare("SELECT (columns…) FROM users WHERE id=?");
 
$db->execute($data);
```

Shouldn’t this also translate to the same query? Well, the answer is **no**. AS mentioned, the query is a command that is executed, the data is not. For our instance, the data `*1; DROP Table users*` would fail to find a valid result.

Here are some scenarios,

* **If we have proper constraints and imagine the `id` column is `numeric` (eg int)** the query should not return any results because `*1;DROP TABLE users;*` is not a numeric value and not compareable.

* **If we don’t have proper constraints and `id` is not `numeric` either. Say its a `text` field** well, its used as value and the query translate to something like `*SELECT (columns…) FROM users WHERE id=”1; DROP TABLE users”;*`. The `*1; DROP TABLE users”;*` portion is the data. In direct queries and sql injections, this would translate to `*1*` being the data and the later part would be a query, acting as data but also being executed, causing the injection.

* **If its a write query** in this scenario, given its numeric, it’ll cause an error because that payload is not a numeric value, and if it’s a text field, it will be inserted in the field. In summary, it will behave according to the constraints but **WILL NOT EXECUTE**.


But either way, whether we get the results or not (with invalid inputs), and maybe the input was not sanitized, but not getting any results are not an vulnerability.

Simple, yet amazing, is it not?

Feel free to point out any mistakes I’ve made.
