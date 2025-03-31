import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const DocumentSummary = ({ item }) => {
  const { executive_order_id, title, signing_date, president } = item;
  const titleWidth = '300px';
  const dateWidth = '150px';
  const presidentWidth = '300px';

  return (
    <Link to={`/document/${executive_order_id}`} className="block mb-2">
      <Button
        variant="outlined"
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          padding: '1rem',
          textAlign: 'left',
          borderColor: 'gray',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
      >
        <div style={{ width: titleWidth }} className="text-base font-semibold truncate-longer">
          {title}
        </div>
        <div style={{ width: dateWidth }} className="text-sm text-gray-600 text-center"> {/* Centered date */}
          {new Date(signing_date).toLocaleDateString()}
        </div>
        <div style={{ width: presidentWidth }} className="text-sm text-gray-600 flex items-center truncate">
          <PersonIcon sx={{ marginRight: '0.5rem', fontSize: '1rem' }} />
          {president}
        </div>
      </Button>
    </Link>
  );
};

export default DocumentSummary;