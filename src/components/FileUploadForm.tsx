import { useState, VFC } from 'react';
import { Close } from '@mui/icons-material';
import {
  Button,
  FormGroup,
  IconButton,
  Input,
  Typography,
} from '@mui/material';

export type File = { buffer: Buffer; type: string; name: string };

type Props = { uploadFile: any };

const FileUploadForm: VFC<Props> = ({ uploadFile }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');

  const uploadCallback = (isSuccess: boolean) => {
    setIsLoading(false);

    if (isSuccess) {
      setFile(null);
      setDescription('');
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!description) {
      return alert('Please Input The File Description');
    }
    if (!file) {
      return alert('Please Select The File First');
    }

    uploadFile(description, file, uploadCallback);
    setIsLoading(true);
  };

  const captureFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new window.FileReader();

      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        setFile({
          buffer: Buffer.from(reader.result as ArrayBuffer),
          type: file.type,
          name: file.name,
        });
        // console.log('buffer', this.state.buffer);
      };
    } else {
      alert('No Files Selected!!');
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormGroup sx={{ mb: 3 }}>
        <Input
          id='fileDescription'
          type='text'
          className='form-control text-monospace'
          placeholder='Description...'
          required
          disabled={isLoading}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup sx={{ mb: 3 }}>
        {file ? (
          <div className='flex items-center'>
            <Typography>Selected File: {file.name}</Typography>
            <IconButton
              color='primary'
              onClick={() => setFile(null)}
              sx={{ ml: 2 }}
            >
              <Close />
            </IconButton>
          </div>
        ) : (
          <input
            type='file'
            onChange={captureFile}
            className='text-white text-monospace'
            placeholder='Select Your File'
            disabled={isLoading}
          />
        )}
      </FormGroup>
      <FormGroup>
        <Button type='submit' variant='contained' disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload!'}
        </Button>
      </FormGroup>
    </form>
  );
};

export default FileUploadForm;
