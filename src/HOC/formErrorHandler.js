import React from "react";

import axios from "axios";
import Modal from "../components/Modal/Modal";
import errorMessageChecker from "../components/utils/errorMessageChecker";
import ErrorModal from "../components/ErrorModal/ErrorModal";

const formErrorHandlerHOC = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: errorMessageChecker(err) });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.response.eject(this.resInterceptors);
    }

    render() {
      return (
        <React.Fragment>
          {this.state.error ? (
            <Modal>
              <ErrorModal
                message={this.state.error}
                buttonAction={() => {
                  this.setState({ error: null });
                }}
              />
            </Modal>
          ) : null}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default formErrorHandlerHOC;
