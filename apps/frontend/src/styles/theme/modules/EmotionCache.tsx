import createCache from '@emotion/cache'

const customPlugin = () => {}

const emotionCache = createCache({
  key: 'invd',
  stylisPlugins: [
    customPlugin,
  ]
})

export default emotionCache