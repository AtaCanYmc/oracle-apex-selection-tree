CREATE TABLE SELECTION_TREE -- Create Table
(
    "ID"             NUMBER not null primary key,
    "PARENT_ID"      NUMBER,
    "NAME"           VARCHAR2(50),
    "IS_SELECTED"    NUMBER
)