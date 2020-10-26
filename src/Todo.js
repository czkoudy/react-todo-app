import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItem,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState, useEffect } from "react";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    setTodo(props.item.todo);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.item.id).set(
      {
        todo: todo,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        item={props.item}
      >
        <div className={classes.paper}>
          <h1>This is Modal</h1>
          <Input
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ToDo" secondary={props.item.todo} />
        </ListItem>
        <button onClick={handleOpen}>Edit</button>
        <DeleteIcon
          onClick={(event) =>
            db.collection("todos").doc(props.item.id).delete()
          }
        />
      </List>
    </>
  );
}

export default Todo;
