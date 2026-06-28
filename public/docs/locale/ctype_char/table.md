# std::ctype&lt;char&gt;::table

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
const mask* table() const throw();
const mask* table() const noexcept;
```

Retorna a tabela de classificação que foi fornecida no construtor desta instância de [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;, ou retorna uma cópia de classic_table() se nenhuma foi fornecida.

### Parâmetros

(nenhum)

### Valor de retorno

Um ponteiro para o primeiro elemento na tabela de classificação (que é um array de tamanho `std::ctype<char>::table_size`).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo