# An 8-Minute Query Optimization Attempt

A database index is a type of data structure that we can use to greatly improve data retrieval performance. Typically, if we need to search the whole dataset, especially in larger datasets, the query time can increase significantly because this algorithm's time complexity is O(n), where n = length of dataset.

But what if the dataset length was smaller? Then it would take less time just like before (under normal circumstances, for most common scenarios).

So, indexes can help us a lot in these cases, for our query planner and engine. Kind of like reducing the lookup dataset's length. And indexing is very common and considered the de facto database optimization by many.

At the same time, we need to ORDER our dataset. And sometimes we can satisfy the ORDER BY clause with an index. If the query needs to sort data on a column that has an index, the optimizer might choose that path. Remember, database software is a combination of many components. Our simple SELECT $columns FROM $somewhere is not so simple to the database engine. It goes through a lot of steps to get you the data you are looking for.

Anyways, the optimizer can sometimes use index (pre-satisfied) sorting rather than executing a separate sorting step (filesorting)!

Having said that, is indexing always beneficial? Well, not really. Recently, we had a table that runs JOIN queries with several other tables. Not the most complex query in our system. That query is quite common and is used in several places.

A few days ago, one of our engineers noticed that the query was getting quite slow for certain users. After running EXPLAIN, we found that data read per join was around 70 MB. So, you can imagine that per table access, our database engine was reading about 70 MB of data. Which is quite a lot.

As a solution, one proposal was to use NO_ORDER_INDEX, which tells the database query optimizer **not to use a specific index (or any index) for sorting rows** (i.e., for ORDER BY clauses).

This brought the **~8 minute query down to ~2 seconds**! That is pretty cool, no? In the database world, this table doesn't have that many rows. Only around **50 million**. However, a lot depends on the column types, the types of tables being JOINed, and how those joins are happening.

What's the tradeoff of this optimization? The tradeoff is that filesort uses both memory and disk, so now the chance of our db buffer pool getting exhausted increases significantly if we adopt this solution.

Btw, only about **10 rows were being fetched** from this overall database. There was no SELECT *. So it's not only about how much data is being fetched but also about which path is being taken to fetch it. It was about the journey, not the destination :D

Also, don't use functions on columns where you wish to utilize the index.
