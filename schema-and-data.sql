CREATE DATABASE solicitudes_db;

\c solicitudes_db;

DROP TABLE IF EXISTS request_contacts CASCADE;
DROP TABLE IF EXISTS requests CASCADE;

CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  request_type VARCHAR(50) NOT NULL,
  submission_date DATE NOT NULL,
  primary_contact_name VARCHAR(100) NOT NULL,
  primary_contact_phone VARCHAR(20) NOT NULL
);

CREATE TABLE request_contacts (
  id SERIAL PRIMARY KEY,
  request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  contact_name VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL
);

INSERT INTO requests (brand, request_type, submission_date, primary_contact_name, primary_contact_phone) VALUES
('MarcaA', 'Soporte',       '2025-05-01', 'Juan Pérez',     '987654321'),
('MarcaB', 'Reclamación',   '2025-04-15', 'María García',   '987111222'),
('MarcaC', 'Consulta',      '2025-04-20', 'Carlos Sánchez', '988333444'),
('MarcaA', 'Mantenimiento', '2025-03-30', 'Ana López',      '987555666'),
('MarcaD', 'Instalación',   '2025-02-28', 'Luis Martínez',  '987777888'),
('MarcaE', 'Soporte',       '2025-01-10', 'Sofía Ramírez',  '988999000'),
('MarcaB', 'Consulta',      '2025-03-05', 'Diego Torres',   '987123456'),
('MarcaC', 'Reclamación',   '2025-04-01', 'Carla Ríos',     '987654000'),
('MarcaD', 'Mantenimiento', '2025-05-10', 'Pablo Vega',     '988111222'),
('MarcaE', 'Instalación',   '2025-05-15', 'Lucía Cruz',     '987222333');

INSERT INTO request_contacts (request_id, contact_name, contact_phone) VALUES
(1,  'Contacto A1', '999000111'),
(1,  'Contacto A2', '999000112'),
(2,  'Contacto B1', '999000222'),
(3,  'Contacto C1', '999000333'),
(4,  'Contacto D1', '999000444'),
(5,  'Contacto E1', '999000555'),
(6,  'Contacto F1', '999000666'),
(7,  'Contacto G1', '999000777'),
(8,  'Contacto H1', '999000888'),
(9,  'Contacto I1', '999000999'),
(10, 'Contacto J1', '999001000');
