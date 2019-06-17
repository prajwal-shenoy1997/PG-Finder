create table pg(
pgid int auto_increment primary key,
name varchar(40),
address varchar(255),
rating int,
cost int,
sharing int,
availability int,
lat decimal(15,10),
lng decimal(15,10)

);