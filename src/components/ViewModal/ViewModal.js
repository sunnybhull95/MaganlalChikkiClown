import { Button, Modal } from "react-bootstrap";
import style from "./ViewModal.module.css";
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";

function ViewModal({ Cdata, product, ...props }) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={style.modalTitle}>
          {Cdata.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* You can show the main product title or any info if needed */}
        {/* {product && (
          <div className={style.mainProductInfo}>
            <p style={{ fontSize: "13px", color: "#555" }}>
              <strong>Main Product:</strong> {product.title}
            </p>
          </div>
        )} */}

        <div className={style.mDiv}>
          <div className={style.imgDiv}>
            <img src={Cdata.images} alt={Cdata.title} />
          </div>
          <div className={style.textDiv}>
            <h5>{Cdata.title}</h5>
            <p>{Cdata.full_description}</p>

            <div className={style.icons}>
              <FaFacebookF className={style.icon1} />
              <FaTwitter className={style.icon2} />
              <FaGooglePlusG className={style.icon3} />
            </div>

            <h5 className={style.ruppe}>₹{Cdata.price}.00</h5>
            <p style={{ color: "#ed3237", fontSize: "11.5px" }}>
              {Cdata.small_description}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          className={style.close}
          style={{
            backgroundColor: "#ed3237",
            color: "white",
            border: "2px solid #ed3237",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;
