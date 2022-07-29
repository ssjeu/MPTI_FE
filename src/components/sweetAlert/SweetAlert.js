import React from 'react';
import Swal from 'sweetalert2';
import './sweetAlert.css';

const SweetAlert = (props) => {
  const { title, text, icon } = props;

  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#64be72',
    confirmButtonText: '확인',
  });
};

export default SweetAlert;

//? icons
// success
// error
// warning
// info
// question
