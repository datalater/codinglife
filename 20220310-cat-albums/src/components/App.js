import Loading from './Loading.js';
import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import ImageViewer from './ImageViewer.js';

import { request } from '../services/api.js';
import { isEqualObject } from '../utils/diff.js';
import { validateState } from '../common/validator.js';
import {
  DATA_TYPE_ARRAY,
  DATA_TYPE_BOOLEAN,
  DATA_TYPE_NULL,
  DATA_TYPE_STRING,
  IMAGE_URL,
  NODE_TYPE_DIRECTORY,
  NODE_TYPE_FILE,
} from '../constants.js';

export default function App({ $target }) {
  const initialState = {
    isRoot: true,
    isLoading: false,
    selectedImageUrl: '',
    nodes: [],
    paths: [],
  };

  validateState(initialState, {
    isRoot: DATA_TYPE_BOOLEAN,
    isLoading: DATA_TYPE_BOOLEAN,
    selectedImageUrl: [DATA_TYPE_NULL, DATA_TYPE_STRING],
    nodes: DATA_TYPE_ARRAY,
    paths: DATA_TYPE_ARRAY,
  });

  this.state = initialState;

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const nodes = await request(id ? `/${id}` : '/');

    this.setState({
      ...this.state,
      nodes,
      isRoot: !id,
      isLoading: false,
    });
  };

  const goToPreviousDirectory = async () => {
    const nextPaths = [...this.state.paths];

    nextPaths.pop();

    this.setState({
      ...this.state,
      paths: nextPaths,
    });

    if (nextPaths.length === 0) {
      await fetchNodes();
      return;
    }

    const lastDirectoryId = nextPaths[nextPaths.length - 1].id;

    await fetchNodes(lastDirectoryId);
  };

  const loading = new Loading({
    $target,
    initialState: {
      isLoading: this.state.isLoading,
    },
  });

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: {
      paths: this.state.paths,
    },
    onClick: async (id) => {
      const nextPaths = [...this.state.paths];

      const pathIndex = nextPaths.findIndex((path) => path.id === id);

      this.setState({
        ...this.state,
        paths: nextPaths.slice(0, pathIndex + 1),
      });

      await fetchNodes(id);
    },
  });

  const nodesComponent = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      const {
        type,
        id,
        filePath,
        name,
      } = node;

      if (type === NODE_TYPE_DIRECTORY) {
        await fetchNodes(id);

        const nextPaths = [...this.state.paths, { id, name }];

        this.setState({
          ...this.state,
          paths: nextPaths,
        });
      }

      if (type === NODE_TYPE_FILE) {
        this.setState({
          ...this.state,
          selectedImageUrl: `${IMAGE_URL}${filePath}`,
        });
      }
    },
    onPrevClick: async () => {
      await goToPreviousDirectory();
    },
  });

  const imageViewer = new ImageViewer({
    $target,
    initialState: {
      selectedImageUrl: this.state.selectedImageUrl,
    },
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      });
    },
  });

  this.setState = (nextState) => {
    if (isEqualObject(this.state, nextState)) {
      return;
    }

    validateState(nextState, {
      isRoot: DATA_TYPE_BOOLEAN,
      isLoading: DATA_TYPE_BOOLEAN,
      selectedImageUrl: [DATA_TYPE_NULL, DATA_TYPE_STRING],
      nodes: DATA_TYPE_ARRAY,
      paths: DATA_TYPE_ARRAY,
    });

    this.state = nextState;

    const {
      isRoot,
      isLoading,
      selectedImageUrl,
      nodes,
      paths,
    } = this.state;

    loading.setState({ isLoading });
    breadcrumb.setState({ paths });
    nodesComponent.setState({ isRoot, nodes });
    imageViewer.setState({ selectedImageUrl });
  };

  const init = async () => {
    await fetchNodes();
  };

  init();

  window.addEventListener('keyup', async (e) => {
    const { isRoot, isLoading } = this.state;

    if (isRoot) {
      return;
    }

    if (isLoading) {
      return;
    }

    if (e.key === 'Backspace') {
      await goToPreviousDirectory();
    }
  });
}
