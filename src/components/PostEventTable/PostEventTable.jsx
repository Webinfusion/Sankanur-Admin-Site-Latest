import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { TableDataPost } from '../../services/data-const';
import { useNavigate } from 'react-router-dom';
import { getAllPostEventsConst, getAllPreEventsConst } from '../../services/api-constants';
import { apiGet } from '../../services/api-service';
import Loader from '../../common-components/Loader/Loader';

// Sample structured data
const tableData = TableDataPost;

const PostEventTable = () => {
  // Initialize state for data
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      // Here you can replace with actual API call
      setData(tableData); // Set the example data (or use fetched data)
    };

    fetchEvents();
  }, []);

   const fetchEvents = async () => {
      setIsLoading(true)
      const response = await apiGet(getAllPostEventsConst)     
      setData(response.data)
      setIsLoading(false)
    };
  
  // Columns definition for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'title', // column accessor key (matches data field)
        header: 'Title',
      },
      {
        accessorKey: 'date',
        header: 'Date',
      },
      {
        accessorKey: 'time',
        header: 'Time',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'content',
        header: 'Content',
        Cell: ({ cell }) => <div dangerouslySetInnerHTML={{ __html: cell.getValue() }} />, // Render HTML content
      },
      {
        accessorKey: 'images',
        header: 'Images',
        Cell: ({ cell }) => {
          const images = cell.getValue();
          return (
            <div>
              {images.map((img, index) => {
                const imageUrl = img[`img${index + 1}`];

                if (imageUrl) {
                  // Modify URL to compress and resize using Cloudinary parameters
                  const cloudinaryOptimizedUrl = imageUrl.replace('/upload/', '/upload/w_100,h_100,q_auto,f_auto/');

                  return (
                    <img
                      key={index}
                      src={cloudinaryOptimizedUrl}
                      alt={`img-${index}`}
                      width="50"
                      height="50"
                      loading="lazy"
                      style={{
                        objectFit: 'cover',
                        marginRight: '5px',
                        borderRadius: '4px',
                      }}
                    />
                  );
                }

                return <span key={index}>{/* No Image */}</span>;
              })}
            </div>

          );
        },
      },
      {
        accessorKey: 'speaker1',
        header: 'Speaker 1',
      },
      {
        accessorKey: 'speaker2',
        header: 'Speaker 2',
      },
      {
        accessorKey: 'speaker3',
        header: 'Speaker 3',
      },
      {
        accessorKey: 'speaker4',
        header: 'Speaker 4',
      },
      {
        id: 'actions', // Actions column for buttons
        header: 'Actions',
        Cell: ({ row }) => (
          <Box display={'flex'} justifyContent={'space-around'} sx={{width: '100%'}}>
            <Edit 
              sx={{padding: '8px', cursor:'pointer'}}
              onClick={() => editAction(row.original)}
            />

            <Delete
              sx={{padding: '8px', cursor: 'pointer'}}
              onClick={() => deleteAction(row.original)}
            />
          </Box>          
        ),
      },
    ],
    []
  );

  const editAction = (updatingData)=> {
    navigate('/nursing/post-event-update', {state: {tableData: updatingData}})
  }

  const deleteAction = (index)=> {

  }


  // Check if data is loaded and available before rendering the table
  if (!data || data.length === 0) {
    return (
      <Stack>

      {isLoading && <Loader/>}

      <Box display={'flex'} justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={'bold'}>
          Post Event Table
        </Typography>
        <Button
          variant="contained"
          onClick={()=> navigate('/nursing/post-event-new')}
          sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold' }}
        >
          Add New Post Event
        </Button>
      </Box>
        <div>No data available</div>
      </Stack>);
  }

  // Table configuration
  return (
    <Stack>

      {isLoading && <Loader />}

      <Box display={'flex'} justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={'bold'}>
          Post Event Table
        </Typography>
        <Button
          variant="contained"
          onClick={()=> navigate('/nursing/post-event-new')}
          sx={{ background: 'var(--mainBg)', color: 'white', fontWeight: 'bold' }}
        >
          Add New Post Event
        </Button>
      </Box>

      <MaterialReactTable
        columns={columns} // Pass columns configuration
        data={data} // Pass data
        // enableColumnPinning={true} // Enable column pinning
        layoutMode="grid-no-grow" // Constant column widths
        initialState={{
          columnPinning: { left: ['title'], right: ['actions'] }, // Pinning actions column to the right
        }}
      />
    </Stack>
  );
};

export default PostEventTable;
