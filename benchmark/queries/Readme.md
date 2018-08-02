# Query Conventions


# Folders per category

Queries are grouped by category. 

* Scalar filters
* Relation filters
* Pagination 
* Expanding Relations


# Naming convention

Query files are named like this:

Number_QueryName_Speed.graphql

Speed will determine the RPS range for the test and the warmup behavior and is categorized like this:

| Speed  | Expected RPS | Tested Range  | Data Points | Warmup RPS  | Warmup Duration |
| ------------- | ------------- |------------- | ------------- |------------- | ------------- |
| very-slow  | 100  |20 - 200  | 20, 40, 60, 80, 100, 120, 140, 160, 180, 200 |  20| 1000  |
| slow  | 250  |50 - 500  | 50, 100, 150, 200, 250, 300, 350, 400, 450, 500 |  50| 500  |
| medium  | 500  |100 - 1000  | 1000  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 |  100| 300  |
| fast  | 1250  |250 - 2500  | 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500 |  150| 200  |
| very-fast  | 2500  |500 - 5000  | 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000 |  150| 200  |


| Speed  | Expected RPS | Tested Range  | Data Points | Warmup RPS  | Warmup Duration |
| ------------- | ------------- |------------- | ------------- |------------- | ------------- |
| very-slow  | 125  |25 - 250  | 25, 50, 75, 100, 125, 150, 175, 200, 225, 250 |  25| 1000  |
| slow  | 250  |50 - 500  | 50, 100, 150, 200, 250, 300, 350, 400, 450, 500 |  50| 500  |
| medium  | 500  |100 - 1000  | 1000  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 |  100| 300  |
| fast  | 1000  |200 - 2000  | 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000 |  150| 200  |
| very-fast  | 2000  |400 - 4000  | 400, 800, 1200, 1600, 2000, 2400, 2800, 3200, 3600, 4000 |  150| 200  |



