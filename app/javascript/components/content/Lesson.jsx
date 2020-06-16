import React from "react";
import actioncable from "actioncable";
import axios from "axios";
import { getTime } from "../../misc/getTime";

export default ({ lesson, isTeacher, user }) => {
  const [queue, setQueue] = React.useState([]);
  const [inQueue, setInQueue] = React.useState(false);
  const [isNext, setIsNext] = React.useState(false);
  const [notificationSent, setNotificationSent] = React.useState(false);

  React.useEffect(() => {
    Notification.requestPermission();
    actioncable
      .createConsumer("ws://localhost:3000/cable")
      .subscriptions.create(
        { channel: "QueueChannel", id: lesson.id },
        {
          connected: () => {
            axios.post("/entry/load_queue", { id: lesson.id });
          },
          disconnected: () => {},
          received: (data) => {
            setQueue(data);
          },
        }
      );
  }, []);

  React.useEffect(() => {
    setInQueue(queue.find((entry) => entry.id === user.id));
    if (queue !== undefined) {
      if (queue[0]?.id === user.id && !notificationSent) {
        setNotificationSent(true);
        setIsNext(true);
        new Notification("Ваша очередь", { silent: false });
      }
    }
  }, [queue]);

  const enterQueue = () => {
    axios.post("/entry", { lesson_id: lesson.id });
  };
  const quitQueue = () => {
    axios.post("/entry/destroy_entry", { lesson_id: lesson.id });
  };
  const nextQueue = () => {
    axios.post("/entry/next_entry", { lesson_id: lesson.id });
  };

  return (
    <div className="lesson-wrapper">
      <div className="lesson-info">
        <h3>{lesson.name}</h3>
        <h4>{lesson.user.name}</h4>
        <hr />
        <div className="captions">
          <span>{getTime(lesson.time)}</span>
          <span>{lesson.classroom}</span>
        </div>
      </div>
      <div className="queue-wrapper">
        <div className="queue-header">
          <h3>Студенты</h3>
          <hr />
        </div>
        {queue.map((author, i) => {
          return (
            <div key={i} className="author-card">
              <img src={author.avatar} />
              <span>{author.name}</span>
            </div>
          );
        })}
      </div>
      <div className="lesson-actions">
        <div className="lesson-header">
          <h3>Действия</h3>
          <hr />
        </div>
        {(isNext || isTeacher) && (
          <div className="default-button" onClick={nextQueue}>
            Следующий
          </div>
        )}
        {!isNext && !isTeacher && (
          <>
            {inQueue ? (
              <div className="default-button inversed" onClick={quitQueue}>
                Выйти из очереди
              </div>
            ) : (
              <div className="default-button" onClick={enterQueue}>
                Записаться
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
