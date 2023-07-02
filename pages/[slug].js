import { supabase } from '/database/supabase';

function ensureHTTPS(url) {
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
}

export default function RedirectPage() {
  return null;
}

export async function getServerSideProps(context) {
  const { res, query } = context;

  const { data, error } = await supabase
    .from('aliases')
    .select('*')
    .eq('alias', query.slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      res.writeHead(302, {
        Location: '/',
      });
      res.end();
      return {
        props: {},
      };
    }
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return {
      props: {},
    };
  }

  res.setHeader('Location', ensureHTTPS(data.original_link));
  res.statusCode = 302;
  res.end();

  return {
    props: {},
  };
}
