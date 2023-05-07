import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddQuestion from './Questions-add';

describe('AddQuestion', () => {
  it('renders the form correctly', () => {
    const { getByLabelText, getByText } = render(<AddQuestion />);

    expect(getByLabelText('Title')).toBeInTheDocument();
    expect(getByLabelText('Body')).toBeInTheDocument();
    expect(getByLabelText('Tags')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('updates the title input value on change', () => {
    const { getByLabelText } = render(<AddQuestion />);
    const titleInput = getByLabelText('Title');

    fireEvent.change(titleInput, { target: { value: 'How to test React components?' } });

    expect(titleInput.value).toBe('How to test React components?');
  });

  it('updates the body editor value on change', () => {
    const { getByLabelText } = render(<AddQuestion />);
    const bodyEditor = getByLabelText('Body').querySelector('.tox-textarea');

    fireEvent.change(bodyEditor, { target: { value: 'This is the question details.' } });

    expect(bodyEditor.value).toBe('This is the question details.');
  });

  it('updates the selected skills on change', () => {
    const { getByLabelText, getByText } = render(<AddQuestion />);
    const skillsSelect = getByLabelText('Tags');

    fireEvent.change(skillsSelect, {
      target: {
        value: [{ value: 'react', label: 'React' }, { value: 'javascript', label: 'JavaScript' }],
      },
    });

    expect(skillsSelect).toHaveValue(['react', 'javascript']);
    expect(getByText('React')).toBeInTheDocument();
    expect(getByText('JavaScript')).toBeInTheDocument();
  });

  it('submits the form and adds a question', () => {
    const { getByLabelText, getByText } = render(<AddQuestion />);
    const titleInput = getByLabelText('Title');
    const bodyEditor = getByLabelText('Body').querySelector('.tox-textarea');
    const skillsSelect = getByLabelText('Tags');
    const submitButton = getByText('Submit');

    fireEvent.change(titleInput, { target: { value: 'How to test React components?' } });
    fireEvent.change(bodyEditor, { target: { value: 'This is the question details.' } });
    fireEvent.change(skillsSelect, {
      target: {
        value: [{ value: 'react', label: 'React' }, { value: 'javascript', label: 'JavaScript' }],
      },
    });
    fireEvent.click(submitButton);

    expect(localStorage.getItem('questionList')).toBeTruthy();
    expect(getByText('Question added successfuly...')).toBeInTheDocument();
  });
});
