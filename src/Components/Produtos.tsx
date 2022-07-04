import React, { useCallback } from "react";
import styles from "./Produtos.module.css";
import { Link } from "react-router-dom";
import Head from "./Head";

export interface IProduto {
  descricao: string;
  fotos: {
    src: string;
    titulo: string;
  }[];
  id: string;
  nome: string;
  preco: string;
  usuario_id: string;
  vendido: string;
}

const Produtos = () => {
  const [produtos, setProdutos] = React.useState<IProduto[] | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchProdutos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://ranekapi.origamid.dev/json/api/produto"
      );
      const json: IProduto[] = await response.json();

      setProdutos(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  if (produtos === null) return null;

  return (
    <section className={styles.produtos + " animeLeft"}>
      <Head title="Ranek | Produtos" description="Descrição do site Ranek" />
      {loading && <div className="loading"></div>}
      {!loading &&
        produtos &&
        produtos.map((produto) => (
          <Link to={`produto/${produto.id}`} key={produto.id}>
            <div style={{ height: "288px" }}>
              <img src={produto.fotos[0].src} alt={produto.fotos[0].titulo} />
            </div>
            <h1 className={styles.nome}>{produto.nome}</h1>
          </Link>
        ))}
    </section>
  );
};

export default Produtos;
