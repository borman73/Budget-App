import { useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useBudgets } from '../contexts/BugetsContext';

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {

  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  const handleSubmit = (event) => {
    event.preventDefault()
    addExpense(
      {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetIdRef: budgetIdRef.current.value
      }
    )
    handleClose()
  };

  return (
    <Modal show= {show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId='description' className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' required ref={descriptionRef} />
          </Form.Group>
          <Form.Group controlId='amount' className='mb-3'>
            <Form.Label>Amount</Form.Label>
            <Form.Control type='number' required min={0} step={0.01} ref={amountRef} />
          </Form.Group>
          <Form.Group controlId='budgetId' className='mb-3'>
            <Form.Label>Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetId}
              ref={budgetIdRef}>
            {budgets.map(budget => ( 
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
            </Form.Select>
          </Form.Group>
          <div className='d-flex justify-content-end '>
            <Button variant='primary'type='submit'>Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
};
