import styles from './InputField.module.css';

export const InputField = ({htmlFor, label, error, ...otherProps}) => {
	return (
		<div className={styles['register-form']}>
			<label htmlFor={htmlFor} className={styles.label}>{label}</label>
			<input className={styles.input}{...otherProps}/>
		</div>
	)
}
