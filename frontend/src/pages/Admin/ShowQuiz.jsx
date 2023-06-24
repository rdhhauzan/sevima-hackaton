import apiCaller from "../../services/apiCaller";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import AdminNavbar from "../../Components/AdminNavbar";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import Swal from "sweetalert2";

function ShowQuiz() {
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
}

export default ShowQuiz;
