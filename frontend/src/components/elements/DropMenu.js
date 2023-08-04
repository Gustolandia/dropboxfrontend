import Dropdown from 'react-bootstrap/Dropdown';

export const DropMenu = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic" style={{textDecoration:'none'}}>
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Open</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Manage</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
