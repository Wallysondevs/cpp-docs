# std::ctype&lt;char&gt;::classic_table

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
static const mask* classic_table() throw();
static const mask* classic_table() noexcept;
```

Retorna a tabela de classificação que corresponde à classificação usada pela locale "C" mínima.

### Parâmetros

(nenhum)

### Valor de retorno

Um ponteiro para o primeiro elemento na tabela de classificação (que é um array do tamanho de `std::ctype<char>::table_size`).

### Observações

Facets [std::ctype](<#/doc/locale/ctype>)&lt;char&gt; construídos por padrão usam esta tabela para classificação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo