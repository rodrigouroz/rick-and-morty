import classes from '*.module.css';
import {
    Avatar,
    Dialog,
    DialogTitle,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Card,
    CardActionArea,
    Button,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { CharacterInterface } from '../lib/characters';

interface CharactersInfoProps {
    character: CharacterInterface;
}

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 300,
      width: 300
    },
  });

export default function CharacterInfo(props: CharactersInfoProps) {
    const [open, setOpen] = useState(false);

    const onClose = () => setOpen(false);

    const classes = useStyles();

    return (
        <>
            <Dialog
                onClose={onClose}
                aria-labelledby='simple-dialog-title'
                open={open}
            >
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={props.character.image}
                            title={props.character.name}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h5'
                                component='h2'
                            >
                                {props.character.name}
                            </Typography>
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                            >
                                <div>Status: {props.character.status}</div>
                                Species: {props.character.species}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={() => setOpen(false)} size='small' color='primary'>
                            Close
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>
            <ListItem
                style={{ cursor: 'pointer' }}
                onClick={() => setOpen(true)}
                key={props.character.id}
            >
                <ListItemAvatar>
                    <Avatar src={props.character.image} />
                </ListItemAvatar>
                <ListItemText primary={props.character.name} />
            </ListItem>
        </>
    );
}
