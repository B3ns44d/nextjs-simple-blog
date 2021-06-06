import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.scss';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';

const name = 'b3ns44d';
export const siteTitle = 'Next.js Sample Website';

type LayoutProps = {
	home?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({ children, home }) => {
	return (
		<div className={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<title>NextJS blog</title>
			</Head>
			<header className={styles.header}>
				{home ? (
					<>
						<Image
							priority
							src="/images/profile.jpg"
							className={utilStyles.borderCircle}
							height={144}
							width={144}
							alt={name}
						/>
						<h1 className={utilStyles.heading2Xl}>{name}</h1>
					</>
				) : (
					<>
						<Link href="/">
							<a>
								<Image
									priority
									src="/images/profile.jpg"
									className={utilStyles.borderCircle}
									height={108}
									width={108}
									alt={name}
								/>
							</a>
						</Link>
						<h2 className={utilStyles.headingLg}>
							<Link href="/">
								<a className={utilStyles.colorInherit}>{name}</a>
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className={styles.backToHome}>
					<Link href="/">
						<a>← Back to home</a>
					</Link>
				</div>
			)}
		</div>
	);
};
