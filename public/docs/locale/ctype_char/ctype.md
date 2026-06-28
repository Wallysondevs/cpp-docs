# std::ctype&lt;char&gt;::ctype

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit ctype( const mask* tbl = 0, bool del = false, std::size_t refs = 0);
```

Cria um facet [std::ctype](<#/doc/locale/ctype>)&lt;char&gt; e encaminha a contagem de referência inicial refs para o construtor da classe base, [`locale::facet::facet()`](<#/>).

Se tbl for nulo, classic_table() é usado por todas as funções membro de classificação. Caso contrário, tbl deve ser um ponteiro para o primeiro elemento de um array de máscaras, com pelo menos [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;::table_size em tamanho, e esse array é usado por todas as funções membro de classificação deste facet.

Se del for true, assume-se que o array foi alocado com new[], e o destrutor deste facet chamará delete[] tbl.

### Parâmetros

- **tbl** — tabela de classificação a ser usada ou um ponteiro nulo
- **del** — indicador se a tabela precisa ser deletada
- **refs** — contagem de referência inicial

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo