import React, { memo } from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1)
  }
}));

type TodoType = {
  id: number;
  name: string;
  completed: boolean;
};

type TodoProp = {
  todo: TodoType;
  onDelete?: (id: number) => void;
  onCompleted?: (todo: TodoType) => void;
};

const Todo = memo(({ todo, onDelete, onCompleted }: TodoProp) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {todo.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color={todo.completed ? "primary" : "default"}
            onClick={() => {
              if (onCompleted) {
                onCompleted(todo);
              }
            }}
          >
            {todo.completed ? "Completed" : "Uncompleted"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
              if (onDelete) {
                onDelete(todo.id);
              }
            }}
          >
            Delete
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
});

export default Todo;
