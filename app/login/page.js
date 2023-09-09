'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../signup/signup.module.css';

export default function Login() {
    const token = process.env["token"];
    const url = process.env["url"];

    const [result, setResults] = useState(null);
    const [formKey, setFormKey] = useState(0);
    const router = useRouter();


    async function loginpHandler(event) {

        event.preventDefault();

        const postData = {};

        postData.Email = event.target.email.value;
        postData.Password = event.target.password.value;
        console.log(postData);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData),
        };
        try {
            const response = await fetch(`${url}api/users/login`, options);
            const result = await response.json();

            if (!response.ok) {
                window.alert("Something Went wrong");
            }
            if (result['id'] == false) {
                window.alert('Username and Password Incorrect');
                event.target.reset();
            }
            else {
                event.target.reset();
                window.sessionStorage.setItem("Identifier", result["id"]);
                router.push("/dashboard");
                // window.alert("Successfully logged In");
                console.log('Success');
            }
        } catch (error) {
            console.log(error)
            setError('Something went wrong. Please try again later');
        }
        setResults(null);
    }

    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.wrapperDiv}>
                    <div className={styles.authBtn}>
                        <Link href='/login'>LOG IN</Link>
                    </div>


                    <h2>Login With Your Trust QR Account</h2>
                    <div className={styles.Smain_container}>
                        <form action="#" method="post" onSubmit={loginpHandler} key={formKey} className={styles.form}>
                            <div className={styles.form_container}>
                                <div className={styles.email}>
                                    {/* <label htmlFor="email">Email : </label> */}
                                    <input type="email" name="email" id="email" placeholder='E-mail' required min={5} />
                                </div>
                                <div className={styles.password}>
                                    {/* <label htmlFor="password" required >Password : </label> */}
                                    <input type="password" name="password" id="password" required placeholder='Password' />
                                </div>
                                <div className={styles.forgot}>Forgot Password?</div>
                                <div className={styles.lsmbtn}>
                                    <input type="submit" value="Login" id='smbtn' className={styles.smbtn} />
                                </div>
                            </div>
                            <div>
                                <div className={styles.authDiv}>
                                    <div >Don't have an account? <Link href='/signup' className={styles.authLink}> SIGN UP</Link></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};



