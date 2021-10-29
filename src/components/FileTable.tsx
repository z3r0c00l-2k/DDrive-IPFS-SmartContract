import { VFC } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';
import { convertBytes } from '../utils/helpers';
import moment from 'moment';

type Props = { files: any[] };

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'fileName', headerName: 'File Name' },
  { field: 'fileDescription', headerName: 'File Description' },
  {
    field: 'fileType',
    headerName: 'File Type',
  },
  {
    field: 'fileSize',
    headerName: 'File Size',
  },
  {
    field: 'uploadTime',
    headerName: 'Uploaded Date',
  },
  {
    field: 'uploader',
    headerName: 'Uploader',
  },
  {
    field: 'fileHash',
    headerName: 'File Link',
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const FileTable: VFC<Props> = ({ files }) => {
  return (
    <div className='flex flex-col flex-grow mt-5 mb-5' style={{ height: 0 }}>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.field}>
                  {column.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((fileItem) => (
              <StyledTableRow key={fileItem.fileId}>
                <StyledTableCell component='th' scope='row'>
                  {fileItem.fileId}
                </StyledTableCell>
                <StyledTableCell>{fileItem.fileName}</StyledTableCell>
                <StyledTableCell>{fileItem.fileDescription}</StyledTableCell>
                <StyledTableCell>{fileItem.fileType}</StyledTableCell>
                <StyledTableCell>
                  {convertBytes(fileItem.fileSize)}
                </StyledTableCell>
                <StyledTableCell>
                  {moment.unix(fileItem.uploadTime).format('D/M/Y h:mm:ss A')}
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    href={`https://etherscan.io/address/${fileItem.uploader}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {fileItem.uploader.substring(0, 10)}...
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    href={`https://ipfs.infura.io/ipfs/${fileItem.fileHash}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {fileItem.fileHash.substring(0, 10)}...
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {files.map((fileItem) => (
              <StyledTableRow key={fileItem.fileId}>
                <StyledTableCell component='th' scope='row'>
                  {fileItem.fileId}
                </StyledTableCell>
                <StyledTableCell>{fileItem.fileName}</StyledTableCell>
                <StyledTableCell>{fileItem.fileDescription}</StyledTableCell>
                <StyledTableCell>{fileItem.fileType}</StyledTableCell>
                <StyledTableCell>
                  {convertBytes(fileItem.fileSize)}
                </StyledTableCell>
                <StyledTableCell>
                  {moment.unix(fileItem.uploadTime).format('D/M/Y h:mm:ss A')}
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    href={`https://etherscan.io/address/${fileItem.uploader}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {fileItem.uploader.substring(0, 10)}...
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    href={`https://ipfs.infura.io/ipfs/${fileItem.fileHash}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {fileItem.fileHash.substring(0, 10)}...
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FileTable;
