import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


// UI

import {Card, Button, Box, Stack, Typography, Paper, Popper } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';

// Components

import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import TableIcons from '../components/TableIcons';

// Utils

import { PATH_DASHBOARD, PATH_ADMIN } from '../routes/paths';
import { getPlants, deletePlantById } from '../services/plantsService';

// Customed styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      lineHeight: '24px',
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      '& .cellValue': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  }),
);

// Customed messages for filters
const tableLanguageOptions = {
  columnMenuUnsort: "Esta columna no se puede orderar",
  columnMenuSortAsc: "Clasificar en orden ascendente",
  columnMenuSortDesc: "Classificar en orden descendente",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuShowColumns: "Mostrar columnas"
};

// Centers columns' content
const centerColumns = (cellValues: any) => {
  return (
    <Box
      style={{
        fontSize: 16,
        width: "100%",
        textAlign: "center"
      }}
    >
      {cellValues.value}
    </Box>
  );
}

// Define row type
type Row = {
  id: string,
  destiny: string,
  driver: string;
  gasoline: boolean;
  availableSeats: number;
}

// Define expand column type
type GridCellExpandProps = {
  value: string;
  width: number;
}

const isOverflown = (element: Element): boolean => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const customNoRowsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Por el momento no hay rutas disponibles
    </Stack>
  )
}

export default function PlantList() {
  const [plants, setPlants] = useState<Row[]>([])
  const navigate = useNavigate();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  // functions
  const deletePlantByIdFunc = async (id:number, set:any) => {
    set(true);
    try {
      const response:any = await deletePlantById(id);
      enqueueSnackbar('La planta fue eliminada correctamente', {
        variant: 'success'
      });
      // setOpen(false);

      const res:any = await getPlants();
      setPlants(res);
    } catch (err) {
      enqueueSnackbar('La planta no fue eliminada correctamente', {
        variant: 'warning'
      });
      console.log(err);
    };
    set(false);
  }

  const GridCellExpand = React.memo(function GridCellExpand(props: GridCellExpandProps) {
    const { width, value } = props;
    const wrapper = useRef<HTMLDivElement | null>(null);
    const cellDiv = useRef(null);
    const cellValue = useRef(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current!);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      const handleKeyDown = (nativeEvent: KeyboardEvent) => {
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <Box
        ref={wrapper}
        className={classes.root}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          ref={cellDiv}
          style={{
            height: 1,
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box ref={cellValue} className="cellValue">
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, zIndex: 10 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });

  const renderCellExpand = (params: GridRenderCellParams) => {
    return (
      <GridCellExpand
        value={params.value ? params.value.toString() : ''}
        width={params.colDef.computedWidth}
      />
    );
  }

  const columns: GridColDef[] = [
    { field: 'commonName',
      headerName: 'Nombre comun',
      flex: 1,
      headerAlign: 'center',
      renderCell: renderCellExpand,
    },
    {
      field: 'scientificName',
      headerName: 'Nombre científico',
      flex: 1,
      editable: false,
      sortable: false,
      headerAlign: 'center',
      renderCell: (cellValues) => centerColumns(cellValues)
    },
    {
      field: 'flowers',
      headerName: 'Flores',
      type: 'boolean',
      flex: 1,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'seeds',
      headerName: 'Semillas',
      type: 'boolean',
      flex: 1,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      renderCell: (cellValues) => <TableIcons data={cellValues} setPlants= {setPlants} deleteById={deletePlantByIdFunc}/>
    },
  ];

  // On load component, grab all available routes from db
  useEffect(() => {
    const getAllPlants = async () => {
      try {
        const response:any = await getPlants();
        setPlants(response);
        console.log(response);
      } catch(err){
        console.log(err);
      }
    };
    getAllPlants();
  }, []);

  return (
    <Stack justifyContent='center' sx={{ height: '100vh', width:'100%', position: 'relative', zIndex:1}}>
      <HeaderBreadcrumbs
        heading="Plantas Disponibles"
        links={[]}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 4, alignSelf: 'flex-end'}}
        onClick={() => navigate(PATH_ADMIN.general.plants + '/create')}
      >
        Agregar planta
      </Button>
      <Card style={{ height: '60%', width: '100%', padding:'32px 24px 12px' }}>
        <Box sx={{ height: '100%'}}>
          <DataGrid
            rows={plants}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
            localeText={tableLanguageOptions}
            components={{ NoRowsOverlay: customNoRowsOverlay }}
          />
        </Box>
      </Card>
    </Stack>
  );
}