import styles from './App.module.scss';
import iconClip from './assets/icon_clip.svg';
import iconMailSp from './assets/icon_mail_sp.svg';

function App() {
	return (
		<main>
			<h1 className={styles.heading1}>Mail Archiver</h1>
			{/* input */}
			<div>calender</div>

			{/* result list */}
			<div>
				<h2 className={styles.heading2}>
					Results: <span className={styles.emp}>10</span>mail(s)
				</h2>
				{/* header */}
				<ul className={styles.flexRow}>
					<li>From</li>
					<li>To</li>
					<li>Subject</li>
					<li>Date</li>
				</ul>
				{/* result list */}
				<ul>
					<li>
						<div className={styles.flexRow}>
							<div className={`${styles.mailContent} ${styles.position}`}>
								<div className={styles.flexRow}>
									<img src={iconMailSp} alt="" className={styles.iconMailSp} />
									<div className={styles.mailContent}>
										<p>aaa@example.com</p>
										<p>zzz.zzz@example </p>
									</div>
								</div>
								<p className={styles.subject}>
									[HR-887] Notice of official announcement
								</p>
								<img src={iconClip} alt="" className={styles.iconClip} />
							</div>
							<p>0:20</p>
						</div>
					</li>
				</ul>
			</div>
		</main>
	);
}

export default App;
