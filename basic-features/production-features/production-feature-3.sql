DELETE FROM User
WHERE uid=1;

UPDATE User
SET role = 'admin'
WHERE uid = 2;

INSERT INTO User (
    uid, name, username, location, role, password_hash, email, gender, account_creation_date, date_of_birth, profile_picture_url, bio
) VALUES (
    1, 
    'John Doe', 
    'johndoe', 
    'New York', 
    'regular', 
    'hashedpassword123', 
    'john.doe@example.com', 
    'Male', 
    NOW(), 
    '1990-01-01', 
    'https://example.com/profiles/johndoe.jpg', 
    'Avid reader and writer.'
);
