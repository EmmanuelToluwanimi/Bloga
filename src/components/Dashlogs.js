import React from 'react';
import './dashlogs.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'react-bootstrap/Button';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'white',
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function Dashlogs() {
    const classes = useStyles();
    return (
        <>
            <section className="dd">
                <div className="top-widget">
                    <div className="following-holds ffs shadow">
                        <h4>Following</h4>
                        <div className="following-number">0</div>
                    </div>
                    <div className="following-holds ffs shadow">
                        <h4>Followers</h4>
                        <div className="following-number">0</div>
                    </div>
                    <div className="following-holds ffs shadow">
                        <h4>Readers</h4>
                        <div className="following-number">0</div>
                    </div>
                    <div className="following-holds ffs shadow">
                        <h4>Liked Posts</h4>
                        <div className="following-number">0</div>
                    </div>
                </div>

                <TableContainer component={Paper} className="my-5 shadow">
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Blog Title</StyledTableCell>
                                <StyledTableCell align="center">Published date</StyledTableCell>
                                <StyledTableCell align="center">Reads</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                    <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button variant="primary" className="w-100">{row.fat}</Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button variant="primary" className="w-100">{row.carbs}</Button>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </section>
        </>
    )
}
