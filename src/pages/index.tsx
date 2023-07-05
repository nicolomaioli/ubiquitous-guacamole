import {
  createStyles,
  rem,
  Box,
  Container,
  Title,
  Text,
  Header,
  Group,
  Input,
  SimpleGrid,
  Card,
  Image,
  AspectRatio,
  Badge,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { api } from '~/utils/api';
import { useState, useEffect, type FormEventHandler } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },
  category: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(24),
    pointerEvents: 'none',
  },
  title: {
    fontWeight: 600,
  },
}));

const Home = () => {
  const { classes } = useStyles();
  const [posts, setPosts] = useState<
    {
      id: string;
      title: string;
      createdAt: Date;
      image: string;
      category: {
        name: string;
      };
    }[]
  >([]);

  const getPosts = api.blog.getAll.useQuery();
  const searchPosts = api.blog.search.useMutation({
    onSuccess(data) {
      setPosts(data);
    },
  });

  useEffect(() => {
    if (getPosts.data) {
      setPosts(getPosts.data);
    }
  }, [getPosts.data]);

  const search: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const input = e.currentTarget.value;
    void searchPosts.mutate(input);
  };

  return (
    <Box>
      <Header height={56} className={classes.header} mb={120}>
        <div className={classes.inner}>
          <Group>
            <Text component="p" fz="lg" fw={900}>
              Ubiquitous Guacamole
            </Text>
          </Group>

          <Group>
            <Input
              placeholder="Search"
              icon={<IconSearch size="1rem" stroke={1.5} />}
              onChange={search}
            />
          </Group>
        </div>
      </Header>
      <Container>
        <Title order={1} mb="xl">
          Articles
        </Title>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {posts
            .sort((a, b) => {
              return a.createdAt.valueOf() < b.createdAt.valueOf() ? 1 : -1;
            })
            .map((post) => (
              <Card
                key={post.id}
                p="md"
                radius="md"
                component="a"
                href="#"
                className={classes.card}
              >
                <AspectRatio ratio={1920 / 1080}>
                  <Image src={post.image} alt={post.title} />
                </AspectRatio>
                <Badge className={classes.category}>{post.category.name}</Badge>
                <Text
                  color="dimmed"
                  size="xs"
                  transform="uppercase"
                  weight={700}
                  mt="md"
                >
                  {post.createdAt.toDateString()}
                </Text>
                <Text className={classes.title} mt={5}>
                  {post.title}
                </Text>
              </Card>
            ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
