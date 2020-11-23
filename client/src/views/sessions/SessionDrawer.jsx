import React from 'react';
import { Drawer, Typography } from 'antd';
import moment from 'moment';

export default function SessionDrawer({ isVisible, onClose, session }) {
  /**
   * Takes an array, and returns a proper string describing its contents based
   * upon either joining the words together with a commas if there are multiple,
   * returning the first element if there is only one element, and returning
   * the word "None" if there are none.
   */
  function getJoinedWords(words) {
    if (!(words && words.length)) {
      return 'None';
    }

    if (words.length === 1) {
      return words[0];
    }

    return words.join(", ");
  }

  return (
    <Drawer
      title={moment(session.date).format("MMMM DD")}
      placement="right"
      closable={true}
      visible={isVisible}
      onClose={onClose}
      width={400}
    >
      <Typography.Text>
        Length in minutes: <b>{session.lengthInMinutes}</b><br/>
        Type: <b>{session.isGuided ? 'Guided': 'Unguided'}</b><br/>
        Gratitudes: <b>{getJoinedWords(session.gratitudes)}</b><br/>
        Skills used: <b>{getJoinedWords(session.skillsUsed)}</b><br/>
        Reflection: <b>{session.reflection || 'None'}</b><br/>
        Mindful Action: <b>{session.mindfulAction || 'None'}</b><br/>
      </Typography.Text>
    </Drawer>
  );
}