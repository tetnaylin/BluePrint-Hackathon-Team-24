import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Avatar, Typography, Autocomplete, Chip, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import TopMenu from '../components/top-menu/TopMenu';
import UploadImage from '../components/manage-event/UploadImage'


const ManageEventContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0),
  },
}));

const suggestions = ["Pokesoc", "DevSoc", "Animal Crossing Society", "AnimeUNSW"]
const CustomPaper = styled(Paper)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 8,
  overflowY: 'auto',
  maxHeight: 200,
}));

export default function ManageEvent() {

  const handleSubmit = (event) => {
    if (nameError || emailError || zIdError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      zId: data.get('zId'),
    });
  };

  const [selectedChips, setSelectedChips] = useState([]);

  const handleChipChange = (event, newValue) => {
    setSelectedChips(newValue);
  };


  return (
      <>
      <TopMenu/>
      <CssBaseline enableColorScheme /><ManageEventContainer direction="column" justifyContent="space-between">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Typography
          variant="h1"
          sx={{ 
            padding:3,
            fontStyle: 'italic'
          }}>
            Create Event
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel
              htmlFor="banner"
              sx={{ display: 'flex', alignSelf: 'center', color: "primary.main", mb: 0.5}}
            >Upload Banner</FormLabel>
            <UploadImage/>
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              id="eventName"
              name="eventName"
              color='secondary'
              label="Event Name"
              placeholder="Your event's name"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: "primary.main",
                  },
                }
                }}/>
          </FormControl>
          <FormControl sx={{mt:3}}>
            <TextField
              multiline
              label="Description"
              rows={4}
              fullWidth
              variant="outlined"
              id="description"
              name="description"
              color='secondary'
              placeholder="Event Description"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: "primary.main",
                  },
                }
                }}/>
          </FormControl>

          <Box sx={{display: 'inline', mb: 1, mt: 3}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              defaultValue={dayjs(Date.now())} 
              label={"Start Date"}
              sx={{
                mr:2,
              }}
              />
          <TimePicker 
            defaultValue={dayjs(Date.now())} 
            label={"Start Time"}
            sx={{ml:2}}
          />
          </LocalizationProvider>
          </Box>

          <Box sx={{display: 'inline', mt: 1}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              defaultValue={dayjs(Date.now())} 
              label={"End Date"}
              sx={{mr:2}}
              />

          <TimePicker 
            defaultValue={dayjs(Date.now())} 
            label={"End Time"}
            sx={{ml:2}}
          />
          </LocalizationProvider>
          </Box>

          <Autocomplete
            sx={{
              mt:3,
            }}
            autoHighlight
            PaperComponent={CustomPaper}
            multiple
            id="collaborators"
            options={suggestions} // List of suggestions
            value={selectedChips} // Current selected chips
            onChange={handleChipChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={index}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add Collaborators"
                name="collaborators"
                fullWidth
                id="collaborators"
                placeholder="Society Name"
              />
            )}
            filterSelectedOptions // Prevents showing already selected items in suggestions
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pb='15%'
          >
            <FormControlLabel
              control={<Checkbox value="arcMember" color="secondary"/>}
              label="Recurring Event?"
              sx={{ mr: 0.5, color: "primary.main" }}/>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
            >
              Create
            </Button>
            <Button
              type="cancel"
              variant="contained"
              onClick={handleSubmit}
              color="primary"
            >
              Cancel
            </Button>
          </Box>
        </Box>
    </ManageEventContainer></>
  );
}
