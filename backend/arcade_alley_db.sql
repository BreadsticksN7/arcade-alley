\echo 'Delete and recreate arcade_alley db?'
\prompt 'Return for yes or control-c to cancel >' foo

DROP DATABASE arcade_alley;
CREATE DATABASE arcade_alley;
\connect arcade_alley

\i arcade_alley_schema.sql
\i arcade_alley_seed.sql


\echo 'Delete and create arcade_alley_test db?'
\prompt 'Return for yes or control-c to cancel >' foo

DROP DATABASE arcade_alley_test;
CREATE DATABASE arcade_alley_test;
\connect arcade_alley_test

\i arcade_alley_schema.sql
\i arcade_alley_seed.sql