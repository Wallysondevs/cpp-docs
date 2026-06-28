# std::experimental::filesystem::file_status::type

file_type type() const; | (1) | (filesystem TS)
---|---|---
void type( file_type type ); | (2) | (filesystem TS)

Acessa as informações do tipo de arquivo.

1) Retorna as informações do tipo de arquivo.

2) Define o tipo de arquivo como `type`.

### Parâmetros

- **type** — tipo de arquivo a ser definido

### Valor de retorno

1) Informações do tipo de arquivo.

2) (nenhum)

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept