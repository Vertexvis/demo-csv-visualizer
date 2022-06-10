import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Metadata } from '../lib/metadata';
import { Viewer } from '../lib/viewer';
import { AnalyticsPanel } from './AnalyticsPanel';
import { RightDrawerWidth } from './Layout';
import { MetadataProperties } from './MetadataProperties';

interface Props {
  readonly metadata?: Metadata;
  readonly open: boolean;
  readonly viewer: Viewer;
}

interface TitleProps {
  readonly children: React.ReactNode | React.ReactNode[];
}

const Title = styled((props: TitleProps) => (
  <Typography variant="body2" {...props} />
))(() => ({ textTransform: 'uppercase' }));

export function RightDrawer({ metadata, open, viewer }: Props): JSX.Element {
  return (
    <Drawer
      anchor="right"
      open={open}
      sx={{
        display: { sm: 'block', xs: 'none' },
        flexShrink: 0,
        width: RightDrawerWidth,
        [`& .${drawerClasses.paper}`]: { width: RightDrawerWidth },
      }}
      variant="persistent"
    >
      <Accordion expanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Title>Analytics</Title>
        </AccordionSummary>
        <AnalyticsPanel viewer={viewer} />
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Title>Metadata Properties</Title>
        </AccordionSummary>
        <MetadataProperties metadata={metadata} />
      </Accordion>
    </Drawer>
  );
}
