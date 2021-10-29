import { VFC } from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { Buffer } from 'buffer';
import FileUploadForm from './FileUploadForm';
import FileTable from './FileTable';

type Props = {
  files: any[];
  uploadFile: any;
  fileCount: number;
  explorerUrl: string;
  availableNetworks: string[];
};

export type File = { buffer: Buffer; type: string; name: string };

const Main: VFC<Props> = ({
  files,
  uploadFile,
  fileCount,
  explorerUrl,
  availableNetworks,
}) => (
  <Container className='flex flex-col flex-1'>
    <Typography sx={{ textAlign: 'center', mt: 2 }}>
      Available Networks :{' '}
      <span className='font-bold'>{availableNetworks.join(', ')}</span>
    </Typography>
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography sx={{ textAlign: 'center' }} gutterBottom variant='h5'>
          Share File
        </Typography>
        <FileUploadForm uploadFile={uploadFile} />
      </CardContent>
    </Card>
    <Typography sx={{ textAlign: 'center', mt: 4 }} gutterBottom variant='h6'>
      Total Files Uploaded : {fileCount}
    </Typography>
    <FileTable files={files} explorerUrl={explorerUrl} />
  </Container>
);

export default Main;
