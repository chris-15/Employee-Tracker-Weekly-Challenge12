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
    

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 2, NULL),
    ('Mike', 'Jones', 1, 1),
    ('Jane', 'Thomas', 4, NULL),
    ('Tyler', 'Smith', 3, 3),
    ('Tom', 'Green', 6, NULL),
    ('Judy', 'Brown', 5, 5),
    ('Sarah', 'White', 8, NULL),
    ('Kevin', 'Thompson', 7, 7);