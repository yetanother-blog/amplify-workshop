import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@material-ui/core';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { createRecipe } from '../../graphql/mutations';

export const CreateRecipeForm = () => {  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await API.graphql({ 
      query: createRecipe, 
      variables: { 
        input: {
          title,
          content,
        },
      },
    });
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField 
        id="title" 
        label="Title" 
        fullWidth 
        required 
        margin="normal" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField 
        id="content" 
        label="Content" 
        fullWidth 
        required 
        multiline 
        rows={10}
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box 
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingTop={2}
      >
        {isLoading && (
          <Box marginRight={1}>
            <CircularProgress size={20} />
          </Box>
        )}
        <Button 
          type="submit" 
          color="primary" 
          variant="contained"
          disabled={isLoading}
        >
          Create
        </Button>
      </Box>
    </form>
  );
};