import { VFC } from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { Buffer } from 'buffer';
import FileUploadForm from './FileUploadForm';
import FileTable from './FileTable';

type Props = { files: any[]; uploadFile: any; fileCount: number };

export type File = { buffer: Buffer; type: string; name: string };

const Main: VFC<Props> = ({ files, uploadFile, fileCount }) => (
  <Container className='flex flex-col flex-1'>
    <Card sx={{ mt: 4 }}>
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
    <FileTable files={files} />
  </Container>
);

export default Main;
