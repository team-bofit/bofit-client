import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './carousel';

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

const SmallSlide: React.FC<{ bg: string; text: string }> = ({ bg, text }) => (
  <div
    style={{
      width: '100px',
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

const meta: Meta<typeof Carousel> = {
  title: 'common/Carousel',
  component: Carousel,
  args: {
    autoPlay: false,
    autoPlayInterval: 3000,
    slidesPerSecond: 0.5,
    slidesPerView: 1,
    pauseOnHover: true,
  },
  argTypes: {
    autoPlay: { control: 'boolean' },
    autoPlayInterval: { control: { type: 'number', min: 1000, step: 1000 } },
    slidesPerSecond: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
    },
    slidesPerView: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
    },
    pauseOnHover: { control: 'boolean' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => (
    <Wrapper>
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Carousel.Item>
      </Carousel>
    </Wrapper>
  ),
};

export const WithArrows: Story = {
  render: (args) => (
    <Wrapper>
      <Carousel {...args} modules={['Navigation']}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Carousel.Item>
      </Carousel>
    </Wrapper>
  ),
};

export const WithDots: Story = {
  render: (args) => (
    <Wrapper>
      <Carousel {...args} modules={['Pagination']}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Carousel.Item>
      </Carousel>
    </Wrapper>
  ),
};

export const FullFeatured: Story = {
  render: (args) => (
    <Wrapper>
      <Carousel {...args} modules={['Navigation', 'Pagination']}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Carousel.Item>
      </Carousel>
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
      <Carousel {...args} modules={['Pagination']}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Auto 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Auto 2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Auto 3" />
        </Carousel.Item>
      </Carousel>
    </Wrapper>
  ),
};

export const CustomArrows: Story = {
  render: (args) => (
    <Wrapper>
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Custom 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Custom 2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Custom 3" />
        </Carousel.Item>
        <Carousel.Arrow direction="left">
          <span style={{ fontSize: '20px' }}>←</span>
        </Carousel.Arrow>
        <Carousel.Arrow direction="right">
          <span style={{ fontSize: '20px' }}>→</span>
        </Carousel.Arrow>
      </Carousel>
    </Wrapper>
  ),
};

export const NoLoopWithArrows: Story = {
  render: (args) => (
    <Wrapper>
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Slide A" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Slide B" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Slide C" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="Slide D" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF9671" text="Slide E" />
        </Carousel.Item>
        <Carousel.Arrow direction="left" />
        <Carousel.Arrow direction="right" />
      </Carousel>
    </Wrapper>
  ),
};

export const MultipleItemsPerView_2: Story = {
  render: (args) => (
    <Wrapper>
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="3" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="4" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF9671" text="5" />
        </Carousel.Item>
      </Carousel>
    </Wrapper>
  ),
};

export const MultipleItemsPerView_3: Story = {
  args: {
    autoPlay: true,
    autoPlayInterval: 1500,
    slidesPerView: 5,
  },
  render: (args) => (
    <Wrapper>
      <Carousel {...args}>
        <Carousel.Item>
          <SmallSlide bg="#3CD986" text="1" />
        </Carousel.Item>
        <Carousel.Item>
          <SmallSlide bg="#FF6B6B" text="2" />
        </Carousel.Item>
        <Carousel.Item>
          <SmallSlide bg="#4D96FF" text="3" />
        </Carousel.Item>
        <Carousel.Item>
          <SmallSlide bg="#845EC2" text="4" />
        </Carousel.Item>
        <Carousel.Item>
          <SmallSlide bg="#FF9671" text="5" />
        </Carousel.Item>
        <Carousel.Item>
          <SmallSlide bg="#2C73D2" text="6" />
        </Carousel.Item>
      </Carousel>
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
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Hover me!" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="I pause" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="on hover" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="Move away" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF9671" text="to resume" />
        </Carousel.Item>
      </Carousel>
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
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Never" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="stops" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="even on" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="hover!" />
        </Carousel.Item>
      </Carousel>
    </Wrapper>
  ),
};

export const MultipleSlidesPerView: Story = {
  args: {
    autoPlay: true,
    slidesPerSecond: 0.3,
    slidesPerView: 3,
    pauseOnHover: true,
  },
  render: (args) => (
    <Wrapper>
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="Slide 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="Slide 2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="Slide 3" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="Slide 4" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF9671" text="Slide 5" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FFC75F" text="Slide 6" />
        </Carousel.Item>
        <Carousel.Arrow direction="left" />
        <Carousel.Arrow direction="right" />
        <Carousel.Dots />
      </Carousel>
    </Wrapper>
  ),
};

export const FourSlidesPerView: Story = {
  args: {
    autoPlay: true,
    slidesPerSecond: 0.2,
    slidesPerView: 4,
    pauseOnHover: true,
  },
  render: (args) => (
    <Wrapper>
      <Carousel {...args}>
        <Carousel.Item>
          <Slide bg="#3CD986" text="1" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF6B6B" text="2" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#4D96FF" text="3" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#845EC2" text="4" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FF9671" text="5" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#FFC75F" text="6" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#F9F871" text="7" />
        </Carousel.Item>
        <Carousel.Item>
          <Slide bg="#C34A36" text="8" />
        </Carousel.Item>
        <Carousel.Arrow direction="left" />
        <Carousel.Arrow direction="right" />
        <Carousel.Dots />
      </Carousel>
    </Wrapper>
  ),
};
