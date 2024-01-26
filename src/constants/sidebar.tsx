import {
  ArrowSquareOut,
  ChartBar,
  Cube,
  Kanban,
  UsersThree,
} from 'phosphor-react';

export const TABS_SIDEBAR = [
  {
    title: 'Estoque',
    route: '/inventory',
    icon: (isActive) => (
      <Kanban size={20} color={isActive ? '#b80105' : '#000'} />
    ),
  },
  {
    title: 'Produtos',
    route: '/products',
    icon: (isActive) => (
      <Cube size={20} color={isActive ? '#b80105' : '#000'} />
    ),
  },
  {
    title: 'Membros',
    route: '/members',
    icon: (isActive) => (
      <UsersThree size={20} color={isActive ? '#b80105' : '#000'} />
    ),
  },
  {
    title: 'Baixa de estoque',
    route: '/action-inventory',
    icon: (isActive) => (
      <ArrowSquareOut size={20} color={isActive ? '#b80105' : '#000'} />
    ),
  },
  {
    title: 'Histórico',
    route: '/history',
    icon: (isActive) => (
      <ChartBar size={20} color={isActive ? '#b80105' : '#000'} />
    ),
  },
];
