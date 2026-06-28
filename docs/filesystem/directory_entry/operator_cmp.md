# std::filesystem::directory_entry::operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;

```cpp
bool operator==( const directory_entry& rhs ) const noexcept;  // (1) (desde C++17)
bool operator!=( const directory_entry& rhs ) const noexcept;  // (2) (desde C++17)
(ate C++20)
bool operator<( const directory_entry& rhs ) const noexcept;  // (3) (desde C++17)
(ate C++20)
bool operator<=( const directory_entry& rhs ) const noexcept;  // (4) (desde C++17)
(ate C++20)
bool operator>( const directory_entry& rhs ) const noexcept;  // (5) (desde C++17)
(ate C++20)
bool operator>=( const directory_entry& rhs ) const noexcept;  // (6) (desde C++17)
(ate C++20)
std::strong_ordering operator<=>( const directory_entry& rhs ) const noexcept;  // (7) (desde C++20)
```

  
Compara o path com a directory_entry rhs.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator== respectivamente.  // (desde C++20)
```
  
### Parâmetros

rhs  |  \-  |  directory_entry para comparar   
  
### Valor de retorno

1) true se path() == rhs.path(), false caso contrário.

2) true se path() != rhs.path(), false caso contrário.

3) true se path() < rhs.path(), false caso contrário.

4) true se path() <= rhs.path(), false caso contrário.

5) true se path() > rhs.path(), false caso contrário.

6) true se path() >= rhs.path(), false caso contrário.

7) O resultado de path() <=> rhs.path().

### Veja também

[ pathoperator const path&](<#/doc/filesystem/directory_entry/path>) |  retorna o path ao qual a entrada se refere   
(função membro pública)  