import {
    Avatar,
    Dialog,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Grid,
    makeStyles,
    createStyles,
    Theme,
    List,
    Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
    CharacterInterface,
    EpisodeInterface,
    getEpisodes,
} from '../lib/characters';

interface CharactersInfoProps {
    character: CharacterInterface;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: 10,
        },
        list: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    })
);

export default function CharacterInfo(props: CharactersInfoProps) {
    const [open, setOpen] = useState(false);

    const [episodes, setEpisodes] = useState<EpisodeInterface[]>([]);

    /**
     * TODO: This is inefficient. We're getting the same episode info multiple times, as we get it per
     * each character but there will be overlapping.
     * A best solution would be to create a service that caches previously requested episodes so that it
     * doesnt fetch it again from the API
     */
    useEffect(() => {
        async function fetchData() {
            const episodes: EpisodeInterface[] = await getEpisodes(
                props.character.episode
            );
            setEpisodes(episodes);
        }
        fetchData();
    }, [props.character.episode]);

    const onClose = () => setOpen(false);

    const classes = useStyles();

    return (
        <>
            <Dialog
                onClose={onClose}
                aria-labelledby='simple-dialog-title'
                open={open}
            >
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item sm={6}>
                            <img
                                alt={props.character.name}
                                src={props.character.image}
                            />
                        </Grid>
                        <Grid item sm={6} style={{ paddingLeft: 30 }}>
                            <Typography variant='h4'>
                                {props.character.name}
                            </Typography>
                            <Typography variant='subtitle1'>
                                Species: {props.character.species}
                            </Typography>
                            <Typography variant='subtitle1'>
                                Status: {props.character.status}
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='h6'>Episodes</Typography>
                            <div className={classes.list}>
                                <List>
                                    {episodes.map((episode) => (
                                        <ListItem key={episode.episode}>
                                            <ListItemText>
                                                ({episode.episode}) -{' '}
                                                {episode.name}
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </div>
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
