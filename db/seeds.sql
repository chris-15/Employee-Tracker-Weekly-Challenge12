INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role(title, salary, department_id)
VALUES
    ('Software Engineer', 120000.00, 1),
    ('Engineering Manager', 150000.00, 1),
    ('Accountant', 120000.00, 2),
    ('Finance Manager', 150000.00, 2),
    ('Lawyer', 190000.00, 3),
    ('Legal Manager', 250000.00, 3),
    ('Salesperson', 80000.00, 4),
    ('Sales Manger', 100000.00, 4);
    