
create table user (
  id integer primary key autoincrement,
  username varchar(255) unique,
  password varchar(255)
);;

create table balance (
  id integer primary key autoincrement,
  prev_id integer not null,
  next_id integer not null,
  _date date not null,
  type integer,
  amount integer,
  desc varchar(255)
);;

create table type (
  id integer primary key autoincrement,
  parent_id integer not null,
  name varchar(255) not null
);;
