// React Components
import { useState, FC } from "react";

// Library Components
import {
  Drawer,
  Button,
  Placeholder,
  Message,
  useToaster,
  Modal,
} from "rsuite";
import {
  MdOutlineStopCircle,
  MdOutlineNotStarted,
  MdDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";

// Page Components
import { CronJobCRUD } from "./CronJobCRUD";

//
interface Props {}

export const CronJobPreview: FC<Props> = ({}) => {
  // React Hooks
  const toaster = useToaster();
  const [buttonIDValue, setButtonIDValue] = useState<string>("");
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(true);
  const [isAlertOpened, setIsAlertOpened] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [isExecutionSucceeded, setIsExecutionSucceeded] =
    useState<boolean>(true);

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

  const executionProcesses = isExecutionSucceeded ? (
    <Message
      duration={3000}
      type="success"
      showIcon
      header="Congratulations!"
      closable
    >
      cronJobName has been successfully {pastAction}
    </Message>
  ) : (
    <Message duration={3000} type="error" showIcon header="Sorry!" closable>
      cronJobName has been failed to be {pastAction}. Kindly reach out to the IT
      support for further assistance!
    </Message>
  );

  return (
    <>
      <Drawer
        size="sm"
        backdrop="static"
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(!isDrawerOpened)}
      >
        <DrawerHeader>
          <DrawerTitle>Preview</DrawerTitle>
          {isAuthorized && (
            <DrawerActions>
              {!isRunning && (
                <Button
                  id="delete"
                  onClick={(e) => (
                    setButtonIDValue(e.currentTarget.id),
                    setIsAlertOpened(!isAlertOpened)
                  )}
                  color="red"
                  size="md"
                  appearance="primary"
                  loading={isProcessing}
                >
                  <div className="flex items-center">
                    <MdDeleteOutline className="mr-1" /> Delete
                  </div>
                </Button>
              )}

              <Button
                id={isRunning ? "start" : "stop"}
                onClick={(e) => (
                  setButtonIDValue(e.currentTarget.id),
                  setIsAlertOpened(!isAlertOpened)
                )}
                color={isRunning ? "green" : "yellow"}
                size="md"
                appearance="primary"
              >
                {isRunning ? (
                  <div className="flex items-center">
                    <MdOutlineNotStarted className="mr-1" /> Start
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MdOutlineStopCircle className="mr-1" /> Stop
                  </div>
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
                <div className="flex items-center">
                  <MdOutlineModeEditOutline className="mr-1" /> Modify
                </div>
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
        onClose={() => setIsAlertOpened(isAlertOpened)}
      >
        <ModalTitle>
          <div className="flex items-center">
            <MdDeleteOutline className="mr-1" />
            Confirmation Dialog
          </div>
        </ModalTitle>
        <ModalBody>
          Once you clicked the <b>confirm</b> button, cronJobName will be{" "}
          {pastAction} ASAP. Are you sure to proceed?
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => (
              toaster.push(executionProcesses, {
                placement: "topEnd",
              }),
              setIsAlertOpened(!isAlertOpened),
              isExecutionSucceeded
                ? setIsDrawerOpened(false)
                : setIsDrawerOpened(true)
            )}
            appearance="primary"
          >
            Confirm
          </Button>
          <Button
            onClick={() => setIsAlertOpened(!isAlertOpened)}
            appearance="subtle"
          >
            Abort
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
