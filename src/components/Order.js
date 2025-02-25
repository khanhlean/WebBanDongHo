import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import urlImg from '../services/urlImg';
import Header from './Header';
import Footer from './Footer';
import '../css/watchlist.css';
import '../css/order.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import '../css/cart.css';
import '../css/home.css';
import Swal from 'sweetalert';

const Order = () => {
    const navigate = useNavigate(); // initialize navigate

    const [customer, setCustomer] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const token = localStorage.getItem('token');
        const MaKH = localStorage.getItem('MaKH');
        if (token == null) {
            setCustomer(null);
            Swal({
                title: 'Please Login',
                text: '',
                icon: 'error',
                dangerMode: true,
            }).then(() => {
                window.location.href = '/signin';
            });
            return;
        }
        try {
            const response = await API.get(`/phieudat/get-phieudat-by-makh/${MaKH}`, {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });
            setOrders(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    const handleCancelOrder = async (orderId) => {
        const token = localStorage.getItem('token');
        if (token == null) {
            navigate('/signin');
        }
        try {
            const response = await API.delete(`/phieudat/xoa-phieudat-by-mapd/${orderId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const responseData = response.data;
            // Xử lý phản hồi từ API sau khi hủy đơn hàng thành công (nếu cần)
            // ...
            Swal({
                title: response.data.message,
                text: '',
                icon: 'success',
                dangerMode: false,
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            const errorMessage = error.response.data.message;
            Swal({
                title: errorMessage,
                text: '',
                icon: 'error',
                dangerMode: true,
            });
        }
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
    };

    const removeCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };
    const handleLogout = () => {
        // Xóa token trong cookie
        removeCookie('token');

        // Tải lại trang
        window.location.reload();
    };

    return (
        <div class="form_watchlist">
            <Header />
            <div id="user_container">
                <div class="container pIHdXn">
                    <div class="AmWkJQ">
                        <div class="kul4+s">
                            <div class="miwGmI">
                                {customer && <div class="mC1Llc">{customer.name}</div>}
                                <div>
                                    <Link to="/account/profile" class="_78QHr1">
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                                                fill="#9B9B9B"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                        Sửa hồ sơ
                                    </Link>
                                </div>
                            </div>

                            <div class="rhmIbk">
                                <div class="stardust-dropdown">
                                    <div class="stardust-dropdown__item-header">
                                        <Link to="/account/profile" class="+1U02e">
                                            <div class="bfikuD">
                                                <img src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" />
                                            </div>
                                            <div class="DlL0zX">
                                                <span class="adF7Xs">Tài Khoản</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="stardust-dropdown__item-body">
                                        <div class="Yu7gVR">
                                            <Link to="/account/profile" class="FEE-3D">
                                                <span class="qyt-aY">Hồ Sơ</span>
                                            </Link>

                                            <Link to="/order" class="FEE-3D" style={{ color: '#C09E57' }}>
                                                <span class="qyt-aY">Đơn hàng</span>
                                            </Link>
                                            <Link to="/account/verify" class="FEE-3D">
                                                <span class="qyt-aY">Đổi mật khẩu</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {orders.length > 0 ? (
                        <>
                            <div class="xMDeox">
                                {console.log(orders)}
                                {orders.map((order) => (
                                    <div key={orders.MaPD} class="--tO6n">
                                        <div class="hiXKxx">
                                            <div class="x0QT2k">
                                                <div class="V+w7Xs">
                                                    <div>{new Date(order.NgayDat).toISOString().split('T')[0]}</div>
                                                    <div>{order.TrangThai}</div>
                                                </div>

                                                <div class="_0OiaZ-">
                                                    <div class="FbLutl">
                                                        <div>
                                                            <span class="x7nENX">
                                                                <div></div>
                                                                <div class="aybVBK">
                                                                    <div class="rGP9Yd">
                                                                        <div class="shopee-image__wrapper">
                                                                            <div class="shopee-image__content">
                                                                                <img
                                                                                    src={urlImg + order.HinhAnh}
                                                                                    alt={order.TenDT}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="_7uZf6Q">
                                                                        <div class="iJlxsT">
                                                                            <span class="x5GTyN">{order.TenDT}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="_9UJGhr">
                                                                    <div class="_3F1-5M">x{order.SoLuong}</div>
                                                                    <span class="-x3Dqh OkfGBc">${order.Gia}</span>
                                                                </div>
                                                            </span>
                                                            <div class="Cde7Oe"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="O2KPzo">
                                                <div class="mn7INg xFSVYg" />
                                                <div class="mn7INg EfbgJE" />
                                            </div>
                                            <div class="kvXy0c">
                                                <div class="-78s2g">
                                                    <div class="_0NMXyN">Thành tiền:</div>
                                                    <div class="DeWpya">${order.DonGia}</div>
                                                </div>

                                                <div class="mn7INg EfbgJE"> </div>
                                            </div>
                                            <div class="AM4Cxf">
                                                <div class="EOjXew">
                                                    <button
                                                        class={`button button-dark js_make_appointment_btn js_ma_watch_button ${
                                                            order.TrangThai === 'Đang giao' ? 'disabled' : ''
                                                        }`}
                                                        onClick={() => handleCancelOrder(order.MaPD)}
                                                        disabled={order.TrangThai === 'Đang giao'}
                                                    >
                                                        Cancel
                                                    </button>
                                                    {/* <button class="cl-subcollections__button button">Contact us</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="sec bd-t-gry-1">
                            <div className="sec-inr pt-none">
                                <div className="cart-empty">
                                    <h1>Bạn không có đơn hàng nào</h1>
                                </div>
                                <div class="pd_hero__cta">
                                    <div class="pd_hero__make_appointment">
                                        <Link
                                            to={`/watchlist`}
                                            type="button"
                                            class="button button-dark js_make_appointment_btn js_ma_watch_button btn_samdienthoaingay"
                                        >
                                            SẮM ĐIỆN THOẠI NGAY
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Order;
