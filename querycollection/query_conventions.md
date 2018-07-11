# Folders per category

Queries are grouped by category. 

* Scalar filters
* Relation filters
* Pagination 


# Naming convention

Query files are named like this:

Number_QueryName_Speed.graphql

Speed will determine the RPS range for the test and the warmup behavior and is categorized like this:

| Speed  | Expected RPS | Tested Range  | Data Points | Warmup RPS  | Warmup Duration |
| ------------- | ------------- |------------- | ------------- |------------- | ------------- |
| very-slow  | 100  |20 - 200  | 20, 40, 60, 80, 100, 120, 140, 160, 180, 200 |  20| 1000  |
| slow  | 250  |50 - 500  | 50, 100, 150, 200, 250, 300, 350, 400, 450, 500 |  50| 500  |
| medium  | 500  |100 - 1000  | 1000  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 |  100| 300  |
| fast  | 1250  |250 - 2500  | 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500 |  200| 200  |
| very-fast  | 2500  |500 - 5000  | 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 200 |  20| 200  |




