import styles from './styles.module.css';

type DefaultInputProps = {
  id: string;
  labeltext: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({
  id,
  type,
  labeltext,
  ...rest
}: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{labeltext}</label>

      <input type={type} id={id} {...rest} className={styles.input} placeholder="Digite algo aqui" />
    </>
  );
}
