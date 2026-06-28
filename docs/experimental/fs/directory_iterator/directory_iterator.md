# std::experimental::filesystem::directory_iterator::directory_iterator

directory_iterator(); | (1) | (filesystem TS)
---|---|---
explicit directory_iterator( const path& p ); | (2) | (filesystem TS)
directory_iterator( const path& p, error_code& ec ); | (3) | (filesystem TS)
directory_iterator( const directory_iterator& ) = default; | (4) | (filesystem TS)
directory_iterator( directory_iterator&& ) = default; | (5) | (filesystem TS)

Constrói um novo iterator de diretório.

1) Constrói o iterator de fim.

2) Constrói um iterator de diretório que se refere à primeira entrada de diretório de um diretório identificado por p. Se p se refere a um arquivo não existente ou não é um diretório, retorna o iterator de fim.

### Parâmetros

| Esta seção está incompleta

### Exceções

1)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

2) filesystem_error se ocorrer um erro. O objeto de exceção é construído com p como argumento.

3)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Observações

Para iterar sobre o diretório atual, construa o iterator como directory_iterator(".") em vez de directory_iterator("").