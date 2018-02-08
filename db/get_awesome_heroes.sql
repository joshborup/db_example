SELECT * FROM heroes
WHERE powers LIKE CONCAT('%', ${powers}, '%') AND age > ${age};

-- CONCAT('%', $1, '%')