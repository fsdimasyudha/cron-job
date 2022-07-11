// React Components
import { useState } from "react";

// Library Components
import {
  Drawer,
  Button,
  Placeholder,
  Message,
  useToaster,
  Modal,
} from "rsuite";

// Page Components
import { CronJobCRUD } from "./CronJobCRUD";

export const CronJobPreview = ({}) => {
  // React Hooks
  const toaster = useToaster();
  const [buttonIDValue, setButtonIDValue] = useState("");
  const [isDrawerOpened, setIsDrawerOpened] = useState(true);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isExecutionSucceeded, setIsExecutionSucceeded] = useState(false);

  // Library Component Hooks
  const {
    Title: DrawerTitle,
    Actions: DrawerActions,
    Header: DrawerHeader,
    Body: DrawerBody,
  } = Drawer;
  const { Title: ModalTitle, Body: ModalBody, Footer: ModalFooter } = Modal;
  const { Paragraph } = Placeholder;

  // Variables
  const pastAction =
    buttonIDValue === "stop" ? `${buttonIDValue}ped` : `${buttonIDValue}ed`;

  // Functions
  const executionProcesses = () => {
    if (isExecutionSucceeded) {
      return (
        <Message
          duration={3000}
          type="success"
          showIcon
          header="Congratulations!"
          closable
        >
          cronJobName has been successfully {pastAction}
        </Message>
      );
    } else {
      return (
        <Message duration={3000} type="error" showIcon header="Sorry!" closable>
          cronJobName has been failed to be {pastAction}.
        </Message>
      );
    }
  };

  return (
    <>
      <Drawer
        size="sm"
        backdrop="static"
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
      >
        <DrawerHeader>
          <DrawerTitle>Preview</DrawerTitle>
          {isAuthorized && (
            <DrawerActions>
              {!isRunning && (
                <Button
                  id="delete"
                  onClick={(e) => (
                    setButtonIDValue(e.currentTarget.id), setIsAlertOpened(true)
                  )}
                  color="red"
                  size="md"
                  appearance="primary"
                  loading={isProcessing}
                >
                  <div className="flex items-center">Delete</div>
                </Button>
              )}

              <Button
                id={isRunning ? "start" : "stop"}
                onClick={(e) => (
                  setButtonIDValue(e.currentTarget.id), setIsAlertOpened(true)
                )}
                color={isRunning ? "green" : "yellow"}
                size="md"
                appearance="primary"
              >
                {isRunning ? (
                  <div className="flex items-center">Start</div>
                ) : (
                  <div className="flex items-center">Stop</div>
                )}
              </Button>
              <Button
                id="modify"
                onClick={() => <CronJobCRUD />}
                color="blue"
                size="md"
                appearance="ghost"
                active
              >
                <div className="flex items-center">Modify</div>
              </Button>
            </DrawerActions>
          )}
        </DrawerHeader>
        <DrawerBody>
          {isProcessing && (
            <Paragraph rows={25} rowHeight={10} rowMargin={20} active />
          )}
        </DrawerBody>
      </Drawer>

      {/* Alert Modal */}
      <Modal
        backdrop="static"
        role="alertdialog"
        size="xs"
        open={isAlertOpened}
        onClose={() => setIsAlertOpened(false)}
      >
        <ModalTitle>
          <div className="flex items-center">Confirmation Dialog</div>
        </ModalTitle>
        <ModalBody>
          Once you clicked the <b>confirm</b> button, cronJobName will be{" "}
          {pastAction} ASAP. Are you sure to proceed?
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => (
              toaster.push(executionProcesses(), {
                placement: "topEnd",
              }),
              setIsAlertOpened(false)
            )}
            appearance="primary"
          >
            Confirm
          </Button>
          <Button onClick={() => setIsAlertOpened(false)} appearance="subtle">
            Abort
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
