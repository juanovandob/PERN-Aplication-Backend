CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  property_type VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  creator_id INT NOT NULL REFERENCES users(id)
);

-- insert user
INSERT INTO users (name, email, avatar)
VALUES ('Juan Carlos Ovando', 'juanovandomaestro@gmail.com', 'https://lh3.googleusercontent.com/a/AAcHTtcJg3t9k8yTYpuUfOJhWChiw3zYAX3C_Fr9MrEHdjZPwQ=s96-c');



