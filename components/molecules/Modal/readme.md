# Modal

## usage

```
"use client";

import {useState} from "react";

import Button from "@/components/atoms/Button";

import Modal from "../components/molecules/Modal";

export default function Index() {
	const [isShow, setIsShow] = useState<boolean>(false);

	return (
		<>
			<Button onClick={() => setIsShow(!isShow)}>Show modal</Button>

			<Modal isShow={isShow} onClickBackground={() => setIsShow(false)}>
				<Modal.Header dismissable handleClose={() => setIsShow(false)}>
					Modal Title
				</Modal.Header>
				<Modal.Body>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
					facere quod quia asperiores, aliquid aperiam animi quae quibusdam.
				</Modal.Body>
				<Modal.Footer>
					<Button>Close</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

```
