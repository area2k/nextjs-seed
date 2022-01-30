export const BUILD_ID = process.env.BUILD_ID ?? 'vX.X.X-develop'
export const BUILD_ENV = process.env.BUILD_ENV
export const BUILD_NAME = `${BUILD_ID} (${BUILD_ENV})`
