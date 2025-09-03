import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Swiper } from './swiper';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: '500px',
      maxWidth: 600,
      height: 200,
      overflow: 'hidden',
      border: '1px solid #eee',
      borderRadius: '8px',
    }}
  >
    {children}
  </div>
);

const Slide: React.FC<{ bg: string; text: string }> = ({ bg, text }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: bg,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 700,
    }}
  >
    {text}
  </div>
);

const meta: Meta<typeof Swiper> = {
  title: 'Components/Swiper',
  component: Swiper,
  args: {
    autoPlay: false,
    autoPlayInterval: 3000,
    slidesPerSecond: 0.5,
    pauseOnHover: true,
  },
  argTypes: {
    autoPlay: { control: 'boolean' },
    autoPlayInterval: { control: { type: 'number', min: 1000, step: 1000 } },
    slidesPerSecond: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
    },
    pauseOnHover: { control: 'boolean' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Swiper>;

export const Default: Story = {
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Swiper.Item>
      </Swiper>
    </Wrapper>
  ),
};

export const WithArrows: Story = {
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Swiper.Item>
        <Swiper.Arrow direction="left" />
        <Swiper.Arrow direction="right" />
      </Swiper>
    </Wrapper>
  ),
};

export const WithDots: Story = {
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Swiper.Item>
        <Swiper.Dots />
      </Swiper>
    </Wrapper>
  ),
};

export const FullFeatured: Story = {
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Swiper.Item>
        <Swiper.Arrow direction="left" />
        <Swiper.Arrow direction="right" />
        <Swiper.Dots />
      </Swiper>
    </Wrapper>
  ),
};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    slidesPerSecond: 0.3,
  },
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Auto 1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="Auto 2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="Auto 3" />
        </Swiper.Item>
        <Swiper.Dots />
      </Swiper>
    </Wrapper>
  ),
};

export const CustomArrows: Story = {
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Custom 1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="Custom 2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="Custom 3" />
        </Swiper.Item>
        <Swiper.Arrow direction="left">
          <span style={{ fontSize: '20px' }}>←</span>
        </Swiper.Arrow>
        <Swiper.Arrow direction="right">
          <span style={{ fontSize: '20px' }}>→</span>
        </Swiper.Arrow>
      </Swiper>
    </Wrapper>
  ),
};

export const NoLoopWithArrows: Story = {
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Slide A" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="Slide B" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="Slide C" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="Slide D" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF9671" text="Slide E" />
        </Swiper.Item>
        <Swiper.Arrow direction="left" />
        <Swiper.Arrow direction="right" />
      </Swiper>
    </Wrapper>
  ),
};

export const MultipleItemsPerView_2: Story = {
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="3" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="4" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF9671" text="5" />
        </Swiper.Item>
      </Swiper>
    </Wrapper>
  ),
};

export const MultipleItemsPerView_3: Story = {
  args: {
    autoPlay: true,
    autoPlayInterval: 1500,
  },
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="1" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="2" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="3" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="4" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF9671" text="5" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#2C73D2" text="6" />
        </Swiper.Item>
      </Swiper>
    </Wrapper>
  ),
};

export const HoverPause: Story = {
  args: {
    autoPlay: true,
    slidesPerSecond: 0.4,
    pauseOnHover: true,
  },
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Hover me!" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="I pause" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="on hover" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="Move away" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF9671" text="to resume" />
        </Swiper.Item>
      </Swiper>
    </Wrapper>
  ),
};

export const ContinuousAutoPlay: Story = {
  args: {
    autoPlay: true,
    slidesPerSecond: 0.6,
    pauseOnHover: false,
  },
  render: (args) => (
    <Wrapper>
      <Swiper {...args}>
        <Swiper.Item>
          <Slide bg="#3CD986" text="Never" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#FF6B6B" text="stops" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#4D96FF" text="even on" />
        </Swiper.Item>
        <Swiper.Item>
          <Slide bg="#845EC2" text="hover!" />
        </Swiper.Item>
      </Swiper>
    </Wrapper>
  ),
};
