import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BodyRecoveryPassword() {
  return (
    <Form className="container mt-4">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="fs-6">Ingrese el email donde se enviará la nueva contraseña</Form.Label>
        <Form.Control className="mt-2" type="email" placeholder="Ingrese su email" />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Button variant="primary" type="submit" className="mt-3">
          Recuperar contraseña
        </Button>
      </Form.Group>
    </Form>
  );
}

export default BodyRecoveryPassword;
