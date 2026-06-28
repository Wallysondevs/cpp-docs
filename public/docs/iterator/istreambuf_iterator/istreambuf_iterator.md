# std::istreambuf_iterator&lt;CharT,Traits&gt;::istreambuf_iterator

```cpp
  // (1)
istreambuf_iterator() throw(); |  | (ate C++11)
constexpr istreambuf_iterator() noexcept;  // (desde C++11)
constexpr istreambuf_iterator( std::default_sentinel_t ) noexcept;  // (2) (desde C++20)
  // (3)
istreambuf_iterator( std::basic_istream<CharT,Traits>& is ) throw(); |  | (ate C++11)
istreambuf_iterator( std::basic_istream<CharT,Traits>& is ) noexcept;  // (desde C++11)
  // (4)
istreambuf_iterator( std::basic_streambuf<CharT,Traits>* s ) throw(); |  | (ate C++11)
istreambuf_iterator( std::basic_streambuf<CharT,Traits>* s ) noexcept;  // (desde C++11)
  // (5)
istreambuf_iterator( const /* proxy */& p ) throw(); |  | (ate C++11)
istreambuf_iterator( const /* proxy */& p ) noexcept;  // (desde C++11)
istreambuf_iterator( const istreambuf_iterator& ) noexcept = default;  // (6) (desde C++11)
```

  
1,2) Constrói um iterator de fim de stream.

3) Inicializa o iterator e armazena o valor de is.rdbuf() em um membro de dados. Se is.rdbuf() for nulo, então um iterator de fim de stream é construído. 

4) Inicializa o iterator e armazena o valor de s em um membro de dados. Se s for nulo, então um iterator de fim de stream é construído.

5) Efetivamente chama (3) com o ponteiro `streambuf_type*` que p contém.

6) O construtor de cópia é trivial e explicitamente padronizado.

O construtor de cópia é efetivamente declarado implicitamente e não é garantido ser trivial.  | (ate C++11)  
  
### Parâmetros

is  |  \-  |  stream para obter o stream buffer de   
---|---|---
s  |  \-  |  stream buffer para inicializar o iterator com   
p  |  \-  |  objeto do tipo proxy definido pela implementação 