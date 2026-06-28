# std::experimental::filesystem::directory_entry::operator==,!=,<,<=,>,>=

bool operator==( const directory_entry& rhs ) const; | (1) | (filesystem TS)
---|---|---
bool operator!=( const directory_entry& rhs ) const; | (2) | (filesystem TS)
bool operator<( const directory_entry& rhs ) const; | (3) | (filesystem TS)
bool operator<=( const directory_entry& rhs ) const; | (4) | (filesystem TS)
bool operator>( const directory_entry& rhs ) const; | (5) | (filesystem TS)
bool operator>=( const directory_entry& rhs ) const; | (6) | (filesystem TS)

Compara o path com a entrada de diretório rhs.

### Parâmetros

- **rhs** — directory_entry para comparar

### Valor de retorno

1) true se path() == rhs.path(), false caso contrário.

2) true se path() != rhs.path(), false caso contrário.

3) true se path() < rhs.path(), false caso contrário.

4) true se path() <= rhs.path(), false caso contrário.

5) true se path() > rhs.path(), false caso contrário.

6) true se path() >= rhs.path(), false caso contrário.

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Veja também

[ pathoperator const path&](<#/doc/experimental/fs/directory_entry/path>) | retorna o path ao qual a entrada se refere
(função membro pública)