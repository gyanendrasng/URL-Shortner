import { supabase } from '/database/supabase';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [originalLink, setOriginalLink] = useState();
  const [alias, setAlias] = useState();

  function isURL(text) {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    return urlPattern.test(text);
  }

  function containsInvalidChars(text) {
    const invalidCharsPattern = /[^\w.-]/;
    return invalidCharsPattern.test(text);
  }

  return (
    <div className={styles.container}>
      <h1>URL Shortner</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!originalLink || !alias) {
            toast.error('Please fill all the fields');
            return;
          }
          if (!isURL(originalLink)) {
            toast.error('Please enter a valid URL for Original Link');
            return;
          }

          if (containsInvalidChars(alias)) {
            toast.error('Please enter a valid Alias');
            return;
          }

          const { data, error } = await supabase
            .from('aliases')
            .insert([{ original_link: originalLink, alias: alias }]);

          if (error) {
            if (error.code === '23505') {
              toast.error('Alias already exists');
              return;
            }
            toast.error('An error occured');
            return;
          }
          toast.success('URL Shortened');
          setAlias('');
          setOriginalLink('');
        }}
      >
        <div>
          <label>Orginal Link</label>
          <input
            type="text"
            placeholder="Original Link"
            onChange={(e) => {
              setOriginalLink(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Alias</label>
          <input
            type="text"
            placeholder="Alias"
            onChange={(e) => {
              setAlias(e.target.value);
            }}
          />
        </div>
        <button type="submit">Shorten URL</button>
      </form>
    </div>
  );
}
