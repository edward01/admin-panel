import store from '../../../store'
import { computed, reactive } from '@vue/composition-api'
import { POSTS_ACTIONS, POSTS_MODULE_NAME, POSTS_STATE } from '../../../store/posts/consts'

function dispatch (action, payload) {
  return store.dispatch(POSTS_MODULE_NAME + '/' + action, payload)
}

function fromState (prop) {
  return store.state[POSTS_MODULE_NAME][prop]
}

function submittingRef () {
  return fromState(POSTS_STATE.SUBMITTING)
}

export function useCreatePost () {
  return {
    submitting: computed(submittingRef),
    save: (post) => dispatch(POSTS_ACTIONS.CREATE_POST, post)
  }
}

export function useEditPost (postId) {
  dispatch(POSTS_ACTIONS.FETCH_POST, postId)

  return {
    submitting: computed(submittingRef),
    post: computed(() => fromState(POSTS_STATE.CURRENT_POST)),
    save: (post) => dispatch(POSTS_ACTIONS.UPDATE_CURRENT_POST, post)
  }
}

export function useNewPost () {
  return {
    post: reactive({
      title: null,
      authors: null,
      thumbnail: null,
      short: null,
      contents: null,
      editorContentsStates: null,
      path: null,
      tags: null,
      category: null,
      isPublic: null,
    })
  }
}

export function usePostsList () {
  dispatch(POSTS_ACTIONS.FETCH_POSTS)

  return {
    posts: computed(() => fromState(POSTS_STATE.POSTS)),
    remove: (postId) => dispatch(POSTS_ACTIONS.REMOVE_POST, postId)
  }
}
