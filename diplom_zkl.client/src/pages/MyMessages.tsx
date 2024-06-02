import HeaderTop from '../components/HeaderTop';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import { Avatar, Box, Button, FormControl, IconButton, Input, List, ListDivider, ListItem, ListItemButton, ListItemButtonProps, Stack, Textarea, Typography } from '@mui/joy';
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

export default function MyMessages() {
  const [selectedChat, setSelectedChat] = useState<ChatProps>(chats[0]);
  return (
    <>
    <HeaderTop Header='Мои сообщения' />
<Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        <ChatsPane
          chats={chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      <MessagesPane chat={selectedChat} />
    </Sheet>
    </>
  );
}

function MessagesPane(props: MessagesPaneProps) {
const { chat } = props;
const [chatMessages, setChatMessages] = React.useState(chat.messages);
const [textAreaValue, setTextAreaValue] = React.useState('');

React.useEffect(() => {
  setChatMessages(chat.messages);
}, [chat.messages]);

return (
  <Sheet
    sx={{
      height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'background.level1',
    }}
  >
    <MessagesPaneHeader sender={chat.sender} />
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        minHeight: 0,
        px: 2,
        py: 3,
        overflowY: 'scroll',
        flexDirection: 'column-reverse',
      }}
    >
      <Stack spacing={2} justifyContent="flex-end">
        {chatMessages.map((message: MessageProps, index: number) => {
          const isYou = message.sender === 'You';
          return (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              flexDirection={isYou ? 'row-reverse' : 'row'}
            >
              {message.sender !== 'You' }
              <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
            </Stack>
          );
        })}
      </Stack>
    </Box>
    <MessageInput
      textAreaValue={textAreaValue}
      setTextAreaValue={setTextAreaValue}
      onSubmit={() => {
        const newId = chatMessages.length + 1;
        const newIdString = newId.toString();
        setChatMessages([
          ...chatMessages,
          {
            id: newIdString,
            sender: 'You',
            content: textAreaValue,
            timestamp: 'Just now',
          },
        ]);
      }}
    />
  </Sheet>
);}

function MessageInput(props: MessageInputProps) {
  const { textAreaValue, setTextAreaValue, onSubmit } = props;
  const textAreaRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== '') {
      onSubmit();
      setTextAreaValue('');
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Напишите сообщение"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          minRows={3}
          maxRows={8}
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
              sx={{
                py: 1,
                pr: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Button
                size="sm"
                color="primary"
                sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
              >
                Отправить
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            '& textarea:first-of-type': {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}

function MessagesPaneHeader(props: MessagesPaneHeaderProps) {
  const { sender } = props;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.body',
      }}
      py={{ xs: 2, md: 2 }}
      px={{ xs: 1, md: 2 }}
    >
      <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
        <Avatar size="lg" src={sender.avatar} />
        <div>
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
          >
            {sender.name}
          </Typography>
          <Typography level="body-sm">{sender.username}</Typography>
        </div>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          Открыть задачу
        </Button>
        <IconButton size="sm" variant="plain" color="neutral">
        
        </IconButton>
      </Stack>
    </Stack>
  );
}

function openMessagesPane() {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--MessagesPane-slideIn', '1');
  }
}

function closeMessagesPane() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--MessagesPane-slideIn');
    document.body.style.removeProperty('overflow');
  }
}

function toggleMessagesPane() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--MessagesPane-slideIn');
    if (slideIn) {
      closeMessagesPane();
    } else {
      openMessagesPane();
    }
  }
}

function ChatsPane(props: ChatsPaneProps) {
  const { chats, setSelectedChat, selectedChatId } = props;
  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: 'calc(100dvh - var(--Header-height))',
        overflowY: 'auto',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        pb={1.5}
      >
       
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      <List
        sx={{
          py: 0,
          '--ListItem-paddingY': '0.75rem',
          '--ListItem-paddingX': '1rem',
        }}
      >
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
          />
        ))}
      </List>
    </Sheet>
  );
}

function ChatListItem(props: ChatListItemProps) {
  const { id, sender, messages, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ id, sender, messages });
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
           
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{sender.name}</Typography>
              <Typography level="body-sm">{sender.username}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              {messages[0].unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )}
              <Typography
                level="body-xs"
                display={{ xs: 'none', md: 'block' }}
                noWrap
              >
                5 mins ago
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {messages[0].content}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}


function ChatBubble(props: ChatBubbleProps) {
  const { content, variant, timestamp, attachment = undefined, sender } = props;
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);
  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">
          {sender === 'You' ? sender : sender.name}
        </Typography>
        <Typography level="body-xs">{timestamp}</Typography>
      </Stack>
      {attachment ? (
        <Sheet
          variant="outlined"
          sx={{
            px: 1.75,
            py: 1.25,
            borderRadius: 'lg',
            borderTopRightRadius: isSent ? 0 : 'lg',
            borderTopLeftRadius: isSent ? 'lg' : 0,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar color="primary" size="lg">
              <InsertDriveFileRoundedIcon />
            </Avatar>
            <div>
              <Typography fontSize="sm">{attachment.fileName}</Typography>
              <Typography level="body-sm">{attachment.size}</Typography>
            </div>
          </Stack>
        </Sheet>
      ) : (
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sheet
            color={isSent ? 'primary' : 'neutral'}
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              p: 1.25,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
              backgroundColor: isSent
                ? 'var(--joy-palette-primary-solidBg)'
                : 'background.body',
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: isSent
                  ? 'black'
                  : 'var(--joy-palette-text-primary)',
              }}
            >
              {content}
            </Typography>
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifyContent={isSent ? 'flex-end' : 'flex-start'}
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: '50%',
                p: 1.5,
                ...(isSent
                  ? {
                      left: 0,
                      transform: 'translate(-100%, -50%)',
                    }
                  : {
                      right: 0,
                      transform: 'translate(100%, -50%)',
                    }),
              }}
            >
              <IconButton
                variant={isLiked ? 'soft' : 'plain'}
                color={isLiked ? 'danger' : 'neutral'}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? '❤️' : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                variant={isCelebrated ? 'soft' : 'plain'}
                color={isCelebrated ? 'warning' : 'neutral'}
                size="sm"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? '🎉' : <CelebrationOutlinedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}


type MessagesPaneProps = {
  chat: ChatProps;
};

type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
};

type MessagesPaneHeaderProps = {
  sender: UserProps;
};

type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  sender: UserProps;
  messages: MessageProps[];
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

type ChatBubbleProps = MessageProps & {
  variant: 'sent' | 'received';
};

type UserProps = {
  name: string;
  username: string;
  avatar: string;
  online: boolean;
};

type MessageProps = {
  id: string;
  content: string;
  timestamp: string;
  unread?: boolean;
  sender: UserProps | 'You';
  attachment?: {
    fileName: string;
    type: string;
    size: string;
  };
};

type ChatProps = {
  id: string;
  sender: UserProps;
  messages: MessageProps[];
};

const users: UserProps[] = [
  {
    name: 'Задача 1',
    username: '@Георгий',
    avatar: '/static/images/avatar/2.jpg',
    online: true,
  },
  {
    name: 'Название новое',
    username: '@Гриша',
    avatar: '/static/images/avatar/3.jpg',
    online: false,
  },
  {
    name: 'Сделать диплом',
    username: '@Михаил',
    avatar: '/static/images/avatar/1.jpg',
    online: true,
  },
  {
    name: 'Предзащита',
    username: '@Чушпан',
    avatar: '/static/images/avatar/4.jpg',
    online: false,
  },
];

const chats: ChatProps[] = [
  {
    id: '1',
    sender: users[0],
    messages: [
      {
        id: '1',
        content: 'Пацаны, привет! Как задачу делать-то?',
        timestamp: 'Wednesday 9:00am',
        sender: users[0],
      },
      {
        id: '2',
        content: 'Я хз... Спроси и главного',
        timestamp: 'Wednesday 9:10am',
        sender: 'You',
      },
      {
        id: '3',
        timestamp: 'Wednesday 11:30am',
        sender: users[0],
        content: 'Главный сказал - Не знаю, делай как хочешь',
      },
      {
        id: '4',
        timestamp: 'Wednesday 2:00pm',
        sender: 'You',
        content: 'Уверен? Я сделаю - ему не понравится',
      },
      {
        id: '5',
        timestamp: 'Wednesday 4:30pm',
        sender: users[0],
        content: 'Сделай так , чтоб понравилось',
      },
      {
        id: '6',
        content:
          "Так, ну все , готово",
        timestamp: 'Thursday 10:16am',
        sender: 'You',
      },
      {
        id: '7',
        content:
          "Опс, мы забылил тебе требования для задачи отправить",
        timestamp: 'Thursday 11:40am',
        sender: users[0],
      },
      {
        id: '3',
        timestamp: 'Thursday 11:40am',
        sender: users[0],
        content: 'Требования.pdf',
        attachment: {
          fileName: 'Требования к диплому.pdf',
          type: 'pdf',
          size: '1.2 MB',
        },
      },
      {
        id: '8',
        timestamp: 'Thursday 11:41am',
        sender: 'You',
        content: "Отлично. Классно. Спасибо!",
      },
      {
        id: '9',
        timestamp: 'Thursday 11:44am',
        sender: users[0],
        content: "Обращайся!",
      },
      
    ],
  },
  {
    id: '2',
    sender: users[1],
    messages: [
      {
        id: '1',
        content: 'Привет! Знаешь как делать задачу?.',
        timestamp: 'Wednesday 9:00am',
        sender: users[1],
      },
      {
        id: '2',
        content:
          'Неа...',
        timestamp: 'Wednesday 9:05am',
        sender: 'You',
      },
      {
        id: '3',
        content: 'Ну ладно...',
        timestamp: 'Wednesday 9:30am',
        sender: users[1],
      },
     
    ],
  },
  {
    id: '3',
    sender: users[2],
    messages: [
      {
        id: '1',
        content: 'Привет! Я сделаль! ',
        timestamp: '5 mins ago',
        sender: users[2],
        unread: false,
      },
      {
        id: '2',
        content: 'Ну если это - "сделал", то не знаю...',
        timestamp: '1 mins ago',
        sender: 'You',
        unread: true,
      }
    ],
  },
  
];
