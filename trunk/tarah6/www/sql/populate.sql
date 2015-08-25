
insert into balance (_date, type, prev_id, next_id, amount, desc) values ('2008-01-01', 2, 0, 2, 10.00, 'aa');;
insert into balance (_date, type, prev_id, next_id, amount, desc) values ('2008-01-01', 2, 1, 3, 20.00, 'bb');;
insert into balance (_date, type, prev_id, next_id, amount, desc) values ('2008-01-01', 3, 2, 0, 30.00, 'cc');;

insert into balance (_date, type, prev_id, next_id, amount, desc) values ('2008-01-02', 4, 0, 5, 40.00, 'dd');;
insert into balance (_date, type, prev_id, next_id, amount, desc) values ('2008-01-02', 5, 4, 6, 50.00, 'ee');;
insert into balance (_date, type, prev_id, next_id, amount, desc) values ('2008-01-02', 6, 5, 7, 60.00, 'ff');;
insert into balance (_date, type, prev_id, next_id, amount, desc) values ('2008-01-02', 7, 6, 0, 70.00, 'gg');;


insert into type (parent_id, name) values (0, 'ROOT');;

insert into type (parent_id, name) values (1, '小额生活消费');;
insert into type (parent_id, name) values (1, '大额生活消费');;
insert into type (parent_id, name) values (1, '意外消费');;
insert into type (parent_id, name) values (1, '弹性消费');;

insert into type (parent_id, name) values (2, '蔬菜');;
insert into type (parent_id, name) values (2, '纸巾');;
insert into type (parent_id, name) values (2, '水果');;

insert into type (parent_id, name) values (3, '月票');;
insert into type (parent_id, name) values (3, '煤气');;
insert into type (parent_id, name) values (3, '大米');;

insert into type (parent_id, name) values (4, '礼金');;
insert into type (parent_id, name) values (4, '看医生');;

insert into type (parent_id, name) values (5, '外出就餐');;
insert into type (parent_id, name) values (5, '看电影');;

insert into type (parent_id, name) values (8, '苹果');;
insert into type (parent_id, name) values (8, '香蕉');;
insert into type (parent_id, name) values (8, '西瓜');;

